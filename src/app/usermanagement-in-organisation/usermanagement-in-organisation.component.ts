import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {listData} from "./user-list";

@Component({
  selector: 'app-usermanagement-in-organisation',
  templateUrl: './usermanagement-in-organisation.component.html',
  styleUrls: ['./usermanagement-in-organisation.component.css']
})
export class UsermanagementInOrganisationComponent {
  @Output() onClose = new EventEmitter<void>();

  userList= listData;

  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';

  filterUsers() {
    if (!this.searchText) {
      return this.userList;
    }
    return this.userList.filter(user => {
      return user.userEmail.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  closeCard() {
    this.onClose.emit();
  }
}
