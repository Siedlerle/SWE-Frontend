import {Component, EventEmitter, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {UiAdminService} from "../../services/ui-admin.service";
import {Group} from "../../DataTransferObjects/Group";

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent {

  @Output() onClose = new EventEmitter<void>();

  closeGroupCard(){
    this.onClose.emit();
  }

  dataSource = new MatTableDataSource<User>();
  groupUser: User[];
  attendeeRoleMap: {[key:number]:boolean} = {};
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];

  group: Group = {
    name : ""
  }


  showAddUserToGroup = false;
  openAddUserToGroup() {
    this.showAddUserToGroup = true;
  }
  closeAddUserToGroup() {
    this.showAddUserToGroup = false;
  }

  constructor(private uiAdminService: UiAdminService) {

  }

  saveGroup() {
  }



}
