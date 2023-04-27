import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../management/CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {User} from "../../DataTransferObjects/User";
import {MatTableDataSource} from "@angular/material/table";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {NgForm} from "@angular/forms";
import {DataSource} from "@angular/cdk/collections";

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
  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService) {
    this.eventData = this.dataService.getCardData();
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

  removeUser(user: User){
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
    });
  }

  fileDataSource = new MatTableDataSource();
  uploadFile(){

  }

  protected readonly DataSource = DataSource;
}
