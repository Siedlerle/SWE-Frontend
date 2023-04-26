import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-user-to-event',
  templateUrl: './add-user-to-event.component.html',
  styleUrls: ['./add-user-to-event.component.css']
})
export class AddUserToEventComponent {
  @Output() onCloseAddUser = new EventEmitter<void>();
  closeCard() {
    this.onCloseAddUser.emit();
  }
}
