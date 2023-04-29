import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {Group} from "../../DataTransferObjects/Group";

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
  usersOfOrgaDataSource = new MatTableDataSource<User>();
  groupsOfOrgaDataSource = new MatTableDataSource<Group>();
  usersOfOrgaDisplayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  groupsOfOrgaDisplayedColumns: string[] = ['Name', 'actions']
  userOfOrga: User[];
  groupsOfOrga: Group[];
  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService) {
    this.eventData = this.dataService.getCardData();
  }
  ngOnInit() {
    let id = this.eventData.id;
    if (id != null) {
      this.uiOrganizerService.getUnafiliatedUsersForEvent(this.eventData).subscribe(response => {
        this.userOfOrga = response;
        this.usersOfOrgaDataSource.data = this.userOfOrga;
      });
    }
  }

  inviteUser(user: User){
    let id = this.eventData.id;
    if(id!=null){
      this.uiOrganizerService.inviteUserToEvent(id , user.emailAdress).subscribe(response =>{
        this.uiOrganizerService.getUnafiliatedUsersForEvent(this.eventData).subscribe(response => {
          this.userOfOrga = response;
          this.usersOfOrgaDataSource.data = this.userOfOrga;
        });
      });
    }
  }
}
