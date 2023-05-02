import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-event-card-tutor',
  templateUrl: './event-card-tutor.component.html',
  styleUrls: ['./event-card-tutor.component.css']
})
export class EventCardTutorComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }

  eventIsCancelled: boolean;
  eventData: CustomEvent;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  attendees: User[];

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private snackBar: MatSnackBar,private dialog: MatDialog) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    //this.getReadableStatus();
  }

  ngOnInit() {
    let id = this.eventData.id;
    if (id != null) {
      this.uiOrganizerService.getAttendeesForEvent(id).subscribe(response => {
        this.attendees = response;
        this.dataSource.data = this.attendees;
      });
    }
  }

  isEditing = false;
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

  removeUser(user: User){
    let eventId = this.eventData.id;
    if ( eventId != null ){
      this.uiOrganizerService.removeUserFromEvent(eventId,user.emailAdress).subscribe(response => {
        this.ngOnInit();
      });

    }
  }


  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  showAddUsertoEvent = false;
  openAddUsertoEvent(){
    this.showAddUsertoEvent = true
  }

  closeAddUsertoEvent(){
    this.showAddUsertoEvent = false
  }
  removeTutor(user: User){

  }
}
