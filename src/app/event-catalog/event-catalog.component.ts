import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";
import {DataService} from "../management/CardService";
import {URLs} from "../../assets/SystemVariables/URLs";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";

@Component({
  selector: 'app-event-catalog',
  templateUrl: './event-catalog.component.html',
  styleUrls: ['./event-catalog.component.css']
})
export class EventCatalogComponent implements OnInit {

  availableEvents: CustomEvent[];
  @ViewChild('searchbar') searchbar: ElementRef;
  eventSearchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  backendURL: string = "";
  toggleSearch: boolean = false;

  constructor(private dataService: DataService,private uiUserService: UiUserService) {
    this.backendURL = URLs.backend;
  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    if (emailAddress != null && orgaId != null && orgaId!=='') {
      this.uiUserService.getAllVisibleNoRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.availableEvents = response;
        this.updateStatusOfEvents(this.availableEvents);
      });
    }else if(emailAddress != null && orgaId != null && orgaId===''){
      this.uiUserService.getAllEvents(emailAddress).subscribe(response =>{
        this.availableEvents = response;
        this.updateStatusOfEvents(this.availableEvents);
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

  filterEvents() {
    if (!this.eventSearchText) {
      return this.availableEvents;
    }
    //console.log(this.eventSearchText)
    return this.availableEvents.filter(event => event.name.toLowerCase().includes(this.eventSearchText.toLowerCase()));
  }

  showInvitationCard = false;
  openCard(item: CustomEvent){

    this.updateStatusOfEvents(this.availableEvents);


    this.showInvitationCard = true;
    this.dataService.setCardData(item);
  }
  closeCard(){
    this.showInvitationCard = false;
  }
}

