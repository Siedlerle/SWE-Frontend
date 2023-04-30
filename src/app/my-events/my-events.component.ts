import {AfterViewInit, Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";
import {DataService} from "../management/CardService";
import {URLs} from "../../assets/SystemVariables/URLs";

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
        this.registeredEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });
    } else if(emailAddress != null){
      this.uiUserService.getAllRegisteredEvents(emailAddress).subscribe(response =>{
        this.registeredEvents = response;
        this.registeredEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });
    }
  }


  showInvitationCard = false;
  openCard(item: CustomEvent){
    this.showInvitationCard = true;
    this.dataService.setCardData(item);
  }
  closeCard(){
    this.showInvitationCard = false;
  }

  filterEvents() {
    if (!this.searchText) {
      return this.registeredEvents;
    }
    console.log(this.searchText)
    return this.registeredEvents.filter(event => event.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}


