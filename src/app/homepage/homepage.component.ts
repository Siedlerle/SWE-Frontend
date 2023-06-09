import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UiUserService} from "../../services/ui-user.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {DataService} from "../management/CardService";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";
import {URLs} from "../../assets/SystemVariables/URLs";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";
import {EnumEventRole} from "../../DataTransferObjects/EnumEventRole";
import {Subscription} from "rxjs";

//import { listData } from './event-list';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})



export class HomepageComponent implements OnInit, OnDestroy {
  backendURL: string = "";
  constructor(private uiUserService : UiUserService, private dataService: DataService, private orgaDataService: OrganisationCardService) {
    this.backendURL = URLs.backend;
  }

  public onCardClick(evt: MouseEvent){
    //console.log(evt);
  }

  registeredEvents: CustomEvent[] = [];
  activeRegisteredEvents: CustomEvent[] = [];
  invitedEvents: CustomEvent[] = [];
  invitedOrganisations: Organisation[] = [];

  primary = 'primary';

  hideOrgaInvite = true;

  orgaEventInviteSubscription!: Subscription;

  allEventInviteSubscription!: Subscription;
  orgaInviteSubscription!: Subscription;

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');

    if (emailAddress !== null && orgaId !== null && orgaId !=='') {

      this.hideOrgaInvite = false;

      //Alle Events in denen man teilnimmt in einer Organisation
      this.uiUserService.getRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.registeredEvents = response;
        this.updateStatusOfEvents(this.registeredEvents);
        this.splitEventsByStatus(this.registeredEvents);
      });

      //Alle Events in denen man in einer Orga eingeladen ist
      this.orgaEventInviteSubscription = this.uiUserService.getAllEventInvitationsForUserInOrga(orgaId, emailAddress).subscribe(response => {
        this.invitedEvents = response;
        this.updateStatusOfEvents(this.invitedEvents);
      });

    }else if( emailAddress !==null && orgaId ===''){
      //Alle registrierten Events
      this.uiUserService.getAllRegisteredEvents(emailAddress).subscribe(response => {
        this.registeredEvents = response;
        this.updateStatusOfEvents(this.registeredEvents);
        this.splitEventsByStatus(this.registeredEvents);
      });

      //Alle Event-Einladungen
      this.allEventInviteSubscription = this.uiUserService.getAllEventInvitations(emailAddress).subscribe(response => {
        this.invitedEvents = response;
        this.updateStatusOfEvents(this.invitedEvents);
      });

      //Alle Organisationseinladungen
      this.orgaInviteSubscription = this.uiUserService.getOrganisationInvitations(emailAddress).subscribe(response => {
        this.invitedOrganisations = response;
      })
    }
  }

  ngOnDestroy() {
    if(this.orgaEventInviteSubscription &&  this.orgaInviteSubscription && this.allEventInviteSubscription ){
      this.orgaEventInviteSubscription.unsubscribe();
      this.orgaInviteSubscription.unsubscribe();
      this.allEventInviteSubscription.unsubscribe();
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

  splitEventsByStatus(events: CustomEvent[]) {
    events.forEach(event => {
      if (event.status === EnumEventStatus.CANCELLED.toString() || event.status === EnumEventStatus.ACCOMPLISHED.toString()) {

      } else {
        this.activeRegisteredEvents.push(event);
      }
    })
  }

  showOrganisationInvite = false;
  openOrganisationInvite(item: Organisation){
    this.showOrganisationInvite = true;
    this.orgaDataService.setCardData(item);

  }
  closeOrganisationInvite(){
    this.showOrganisationInvite = false;
  }

  showEventUnregistry = false;
  showTutorCard = false;
  openEventUnregistry(item: CustomEvent){
    const id = item.id;
    const emailAdress = sessionStorage.getItem('emailAdress');
    if(id != null && emailAdress != null){
      this.uiUserService.getRoleInEvent(id,emailAdress).subscribe(response =>{

        if(response.role === EnumEventRole.TUTOR){
          this.showTutorCard = true;
        }else{
          this.showEventUnregistry = true;
        }
      });
    }
    this.dataService.setCardData(item);
  }
  closeEventUnregitry(){
    this.showEventUnregistry = false;
    this.showTutorCard = false;
  }


}
