import {Component, OnInit} from '@angular/core';
import {UiUserService} from "../../services/ui-user.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {DataService} from "../management/CardService";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";
import {URLs} from "../../assets/SystemVariables/URLs";

//import { listData } from './event-list';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})



export class HomepageComponent implements OnInit {
  backendURL: string = "";
  constructor(private uiUserService : UiUserService, private dataService: DataService, private orgaDataService: OrganisationCardService) {
    this.backendURL = URLs.backend;
  }

  public onCardClick(evt: MouseEvent){
    console.log(evt);
  }

  registeredEvents: CustomEvent[] = [];
  invitedEvents: CustomEvent[] = [];
  invitedOrganisations: Organisation[] = [];

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    if (emailAddress !== null && orgaId !== null && orgaId !=='') {

      //Alle Events in denen man teilnimmt in einer Organisation
      this.uiUserService.getRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.registeredEvents = response;
        this.registeredEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });


    }else if( emailAddress !==null && orgaId ===''){
      //Alle registrierten Events

      //Alle Event-Einladungen
      this.uiUserService.getAllEventInvitations(emailAddress).subscribe(response => {
        this.invitedEvents = response;
        this.invitedEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });

      //Alle Organisationseinladungen
      this.uiUserService.getOrganisationInvitations(emailAddress).subscribe(response => {
        this.invitedOrganisations = response;
      })
    }
  }
  showEventInvite = false;
  openEventInvite(item: CustomEvent){
    this.showEventInvite = true;
    this.dataService.setCardData(item);
  }
  closeEventInvite(){
    this.showEventInvite = false;
  }

  showOrganisationInvite = false;
  openOrganisationInvite(item: Organisation){
    this.showOrganisationInvite = true;
    this.orgaDataService.setCardData(item);

  }
  closeOrganisationInvite(){
    this.showOrganisationInvite = false;
  }


}
