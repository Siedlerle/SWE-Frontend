import {Component, EventEmitter, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.css']
})
export class AddUserToGroupComponent {
  @Output() onClose = new EventEmitter<void>();

  closeAddUserToGroup() {
    this.onClose.emit();
  }

  usersOfOrgaDataSource = new MatTableDataSource<User>();
  usersOfOrgaDisplayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
}
