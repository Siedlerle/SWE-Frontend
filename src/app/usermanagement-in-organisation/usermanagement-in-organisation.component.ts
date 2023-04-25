import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-usermanagement-in-organisation',
  templateUrl: './usermanagement-in-organisation.component.html',
  styleUrls: ['./usermanagement-in-organisation.component.css']
})
export class UsermanagementInOrganisationComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }
}
