import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../management/CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {User} from "../../DataTransferObjects/User";
import {MatTableDataSource} from "@angular/material/table";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {NgForm} from "@angular/forms";
import {DataSource} from "@angular/cdk/collections";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.isEditing = false;
    this.onClose.emit();
  }

  eventData: CustomEvent;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  attendees: User[];
  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private snackBar: MatSnackBar) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.imageSource == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.imageSource;
    }
    this.getReadableStatus();
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
  }


  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  onSave() {
    // save edited data and exit editing mode
    this.eventData.name = this.eventName;
    this.eventData.description = this.eventDescription;
    this.isEditing = false;
  }
  onCancel() {
    // discard changes and exit editing mode
    this.isEditing = false;
  }

  showAddUsertoEvent = false;
  openAddUsertoEvent(){
     this.showAddUsertoEvent = true
  }

  closeAddUsertoEvent(){
    this.showAddUsertoEvent = false
  }

  onChangeEvent(form: NgForm) {
    this.uiOrganizerService.changeEvent(this.eventData).subscribe(response => {
      console.log(response);
      const text = response.message;
      if (text === "Event changed successfully") {
        this.snackBar.open("Event erfolgreich geändert", 'Close', { duration: 10000 });
      } else {
        this.snackBar.open("Änderung des Events fehlgeschlagen", 'Close', { duration: 10000 });
      }
    });

  }

  fileDataSource = new MatTableDataSource();
  uploadFile(){

  }

  cancelEvent() {
    if (this.eventData.id != null) {
      let reason = 'abgesagt';
      this.uiOrganizerService.cancelEvent(this.eventData.id, reason).subscribe(response => {
        console.log(response);
        this.eventData.status = EnumEventStatus.CANCELLED;
        this.getReadableStatus();
      });
    }
  }

  getReadableStatus() {
    switch (this.eventData.status) {
      case EnumEventStatus.INPREPARATION:
        this.eventStatus = 'In Vorbereitung';
        break;
      case EnumEventStatus.SCHEDULED:
        this.eventStatus = 'Geplant';
        break;
      case EnumEventStatus.RUNNING:
        this.eventStatus = 'In Durchführung';
        break;
      case EnumEventStatus.ACCOMPLISHED:
        this.eventStatus = 'Vergangen';
        break;
      case EnumEventStatus.CANCELLED:
        this.eventStatus = 'abgesagt';
        break;
    }
  }

  protected readonly DataSource = DataSource;
}
