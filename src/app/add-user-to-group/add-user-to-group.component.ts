import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {UiAdminService} from "../../services/ui-admin.service";
import {GroupCardDataService} from "../group-card/GroupCardDataService";
import {Group} from "../../DataTransferObjects/Group";

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.css']
})
export class AddUserToGroupComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  usersOfOrgaDataSource = new MatTableDataSource<User>();
  usersOfOrgaDisplayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  group: Group;
  usersInOrga: User[];

  constructor(private groupCardDataService : GroupCardDataService, private uiAdminService: UiAdminService) {
    this.group = Object.assign({},this.groupCardDataService.getCardData());
  }

  ngOnInit() {
    const orgaId = sessionStorage.getItem('orgaId');
    if (this.group.id != null && orgaId != null) {
      this.uiAdminService.getUsersOfOrgaNotInGroup(this.group.id, orgaId).subscribe(response => {
        this.usersInOrga = response;
        this.usersOfOrgaDataSource.data = this.usersInOrga;
      })
    }
  }

  closeAddUserToGroup() {
    this.onClose.emit();
  }


  addUserToGroup(user: User) {
    
  }
}
