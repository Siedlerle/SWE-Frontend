import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
  }

  ngOnInit() {
  }

  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  acceptInvite() {

  }

  declineInvite() {

  }
}
