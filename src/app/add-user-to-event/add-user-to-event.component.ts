import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";

@Component({
  selector: 'app-add-user-to-event',
  templateUrl: './add-user-to-event.component.html',
  styleUrls: ['./add-user-to-event.component.css']
})
export class AddUserToEventComponent {
  @Output() onCloseAddUser = new EventEmitter<void>();
  closeAddUserToEventCard() {
    this.onCloseAddUser.emit();

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
}
