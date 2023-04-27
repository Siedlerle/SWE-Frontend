import {Component, OnInit} from '@angular/core';
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {UiUserService} from "../../services/ui-user.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {Organisation} from "../../DataTransferObjects/Organisation";

//import { listData } from './event-list';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})



export class HomepageComponent implements OnInit {
  constructor(private uiUserService : UiUserService) {
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
      this.uiUserService.getRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.registeredEvents = response;
      });
      this.uiUserService.getEventInvitations(emailAddress, orgaId).subscribe(response => {
        this.invitedEvents = response;
      });
      this.uiUserService.getOrganisationInvitations(emailAddress).subscribe(response => {
        this.invitedOrganisations = response;
      })
    }
    this.registeredEvents.forEach(function (event) {
      if (event.imageSource == null) {
        event.imageSource = "../../assets/images/OrgaBanner.png";
      }
    });
    this.invitedEvents.forEach(function (event) {
      if (event.imageSource == null) {
        event.imageSource = "../../assets/images/OrgaBanner.png";
      }
    });
  }

  showCard = false;
  openCard(){
    this.showCard = true;
  }
  closeCard(){
    this.showCard = false;
  }
}
