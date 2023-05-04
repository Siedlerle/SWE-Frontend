import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiAdminService} from "../../services/ui-admin.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";

@Component({
  selector: 'app-change-organizer-of-event',
  templateUrl: './change-organizer-of-event.component.html',
  styleUrls: ['./change-organizer-of-event.component.css']
})
export class ChangeOrganizerOfEventComponent implements OnInit {
  @Output() onCloseChangeOrganizerOfEvent = new EventEmitter<void>();
  organizersOfOrgaDisplayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  organizersOfOrgaDataSource = new MatTableDataSource<User>;
  organizers: User[] = [];
  currentOrganizer: User = {
    firstname: "",
    lastname: "",
    emailAdress: "",
    password: ""
  };
  event: CustomEvent;
  constructor(private dataService: DataService, private uiAdminService: UiAdminService, private uiUserService: UiUserService) {
    this.event = Object.assign({},this.dataService.getCardData());
  }

  ngOnInit() {
    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiAdminService.getAllOrganizersOfOrganisation(orgaId).subscribe(response => {
        this.organizers = response;
        this.organizersOfOrgaDataSource.data = this.organizers;
      });
    }
    if(this.event.id != null) {
      this.uiUserService.getOrganizerOfEvent(this.event.id).subscribe(response => {
        this.currentOrganizer = response;
      })
    }
  }

  addOrganizerToEvent(user: User) {
    if (this.event.id != null && user.emailAdress != null) {
      this.uiAdminService.changeOrganizerOfEvent(this.event.id, user.emailAdress).subscribe()
      new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
        this.ngOnInit();
      });
    }
  }


  closeChangeOrganizerOfEvent() {
    this.onCloseChangeOrganizerOfEvent.emit();
  }


}
