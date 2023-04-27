import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-user-to-organisation',
  templateUrl: './add-user-to-organisation.component.html',
  styleUrls: ['./add-user-to-organisation.component.css']
})
export class AddUserToOrganisationComponent {
  @Output() onClose = new EventEmitter<void>();

  closeAddGroup() {
    this.onClose.emit();
  }
}
