import {Component, EventEmitter, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";

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


  showAddUserToGroup = false;
  openAddUserToGroup() {
    this.showAddUserToGroup = true;
  }
  closeAddUserToGroup() {
    this.showAddUserToGroup = false;
  }
}
