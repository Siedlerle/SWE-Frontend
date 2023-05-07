import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatTableDataSource} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
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

  isTutor:boolean[] = [];
  isExternTutor: boolean;

  externEmail: string;

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

      this.uiOrganizerService.getUnafiliatedGroupsForEvent(this.eventData).subscribe(response => {
        this.groupsOfOrga = response;
        this.groupsOfOrgaDataSource.data = this.groupsOfOrga;
      });
    }
  }

  inviteUser(user: User, index: number){
    let id = this.eventData.id;
    if(id!=null){
      if(!this.isTutor[index]){
        this.uiOrganizerService.inviteUserToEvent(id , user.emailAdress).subscribe(response =>{
          this.uiOrganizerService.getUnafiliatedUsersForEvent(this.eventData).subscribe(response => {
            this.userOfOrga = response;
            this.usersOfOrgaDataSource.data = this.userOfOrga;
            this.isTutor = [];
          });
        });
      } else if(this.isTutor[index]){
        this.uiOrganizerService.inviteTutorToEvent(id , user.emailAdress).subscribe(response =>{
          this.uiOrganizerService.getUnafiliatedUsersForEvent(this.eventData).subscribe(response => {
            this.userOfOrga = response;
            this.usersOfOrgaDataSource.data = this.userOfOrga;
            this.isTutor = [];
          });
        });
      }
    }
  }

  inviteGroup(group: Group){
    let eventId = this.eventData.id;
    let groupId = group.id;
    if(eventId!=null && groupId!=null){
      this.uiOrganizerService.inviteGroupToEvent(eventId,groupId).subscribe();
    }
  }

  inviteExtern(){
    let eventId = this.eventData.id;
    if(eventId!=null && this.externEmail != null){
      this.uiOrganizerService.inviteExternToEvent(eventId,this.externEmail).subscribe();
    }
  }
}
