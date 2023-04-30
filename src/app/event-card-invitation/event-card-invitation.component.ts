import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiUserService} from "../../services/ui-user.service";
import {URLs} from "../../assets/SystemVariables/URLs";

@Component({
  selector: 'app-event-card-invitation',
  templateUrl: './event-card-invitation.component.html',
  styleUrls: ['./event-card-invitation.component.css']
})
export class EventCardInvitationComponent {

  @Output() onClose = new EventEmitter<void>();

  closeInvitationCard() {
    this.onClose.emit();
  }

  eventIsCancelled: boolean;
  eventData: CustomEvent;
  attendees: User[];

  eventName: string ="";
  eventDescription: string = "";
  eventType: string = "";
  eventStartTime: string = "";
  eventEndTime: string = "";
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();
  eventLocation: string = "";
  eventStatus: string = "";
  imageSource: string = "";
  backendURL: string = "";

  constructor(private dataService: DataService, private uiUserService:UiUserService) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    this.backendURL = URLs.backend;
  }

  ngOnInit() {
  }

  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  acceptInvite() {
    let id = this.eventData.id
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null && id !=null){
      this.uiUserService.acceptEventInvitation(id, emailAddress).subscribe(response =>{
        this.closeInvitationCard();
        location.reload();
      });
    }
  }

  declineInvite() {
    let id = this.eventData.id
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null && id !=null){
      this.uiUserService.declineEventInvitation(id, emailAddress).subscribe(response =>{
        this.closeInvitationCard();
        location.reload();
      })
    }
  }
}
