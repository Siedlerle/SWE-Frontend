import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";
import {DataService} from "../management/CardService";
import {URLs} from "../../assets/SystemVariables/URLs";
import {EnumEventRole} from "../../DataTransferObjects/EnumEventRole";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //toggleSearch: boolean = false;
  registeredEvents: CustomEvent[] = [];
  searchText = '';
  backendURL: string = "";

  constructor(private dataService: DataService, private uiUserService : UiUserService) {
    this.backendURL = URLs.backend;
  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');

    if (emailAddress != null && orgaId != null && orgaId !== '') {
      this.uiUserService.getRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.registeredEvents = response;
        this.updateStatusOfEvents(this.registeredEvents);
      });
    } else if(emailAddress != null){
      this.uiUserService.getAllRegisteredEvents(emailAddress).subscribe(response =>{
        this.registeredEvents = response;
        this.updateStatusOfEvents(this.registeredEvents);
      });
    }
  }

  updateStatusOfEvents(events: CustomEvent[]) {
    const now = new Date();
    events.forEach(event => {
      const startTime = this.getDate(event.startDate, event.startTime);
      const endTime = this.getDate(event.endDate, event.endTime);

      if (event.status != EnumEventStatus.CANCELLED) {
        if (startTime > now) {
          event.status = EnumEventStatus.SCHEDULED;
        } else if (startTime < now && endTime > now) {
          event.status = EnumEventStatus.RUNNING;
        } else if (endTime < now) {
          event.status = EnumEventStatus.ACCOMPLISHED;
        }
      }
    });
  }

  getDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0);
    return newDate;
  }

  showInvitationCard = false;
  showTutorCard = false;
  openCard(item: CustomEvent){
    const id = item.id;
    const emailAdress = sessionStorage.getItem('emailAdress');
    if(id != null && emailAdress != null){
      this.uiUserService.getRoleInEvent(id,emailAdress).subscribe(response =>{

          if(response.role === EnumEventRole.TUTOR){
            this.showTutorCard = true;
          }else{
            this.showInvitationCard = true;

          }
      });
    }
    this.dataService.setCardData(item);
  }
  closeCard(){
    this.showInvitationCard = false;
    this.showTutorCard = false;

  }

  filterEvents() {
    if (!this.searchText) {
      return this.registeredEvents;
    }
    console.log(this.searchText)
    return this.registeredEvents.filter(event => event.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}


