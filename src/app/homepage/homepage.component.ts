import {Component, OnInit} from '@angular/core';
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {UiUserService} from "../../services/ui-user.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {DataService} from "../management/CardService";

//import { listData } from './event-list';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})



export class HomepageComponent implements OnInit {
  constructor(private uiUserService : UiUserService, private dataService: DataService) {
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
        this.registeredEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });
      this.uiUserService.getEventInvitations(emailAddress, orgaId).subscribe(response => {
        this.invitedEvents = response;
        this.invitedEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });
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
  openOrganisationInvite(){
    this.showOrganisationInvite = true;
  }
  closeOrganisationInvite(){
    this.showOrganisationInvite = false;
  }


}
