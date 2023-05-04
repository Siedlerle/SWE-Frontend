import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {UiAdminService} from "../../services/ui-admin.service";
import {Group} from "../../DataTransferObjects/Group";
import {GroupCardDataService} from "./GroupCardDataService";
import {UiOrganizerService} from "../../services/ui-organizer.service";

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();
    dataSource = new MatTableDataSource<User>();
  groupUser: User[];
  attendeeRoleMap: {[key:number]:boolean} = {};
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];

  group: Group = {
    name : ""
  }

  constructor(private groupCardDataService : GroupCardDataService, private uiAdminService: UiAdminService, private uiOrganizerService: UiOrganizerService) {
    this.group = Object.assign({},this.groupCardDataService.getCardData());
  }

  ngOnInit() {
    if (this.group.id != null) {
      this.uiOrganizerService.getUsersOfGroup(this.group.id).subscribe(response => {
        this.groupUser = response;
        this.dataSource.data = this.groupUser;
      })
    }
  }


  saveName() {

  }

  removeUserFromGroup(user: User) {
    if (this.group.id != null) {
      this.uiAdminService.removeUserFromGroup(this.group.id, user.emailAdress).subscribe();
      new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
        this.ngOnInit();
      });
    }
  }

  showAddUserToGroup = false;
  openAddUserToGroup() {
    this.showAddUserToGroup = true;
    this.groupCardDataService.setCardData(this.group);
  }
  closeAddUserToGroup() {
    this.showAddUserToGroup = false;
  }
  closeGroupCard(){
    this.onClose.emit();
  }
}
