import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-organisation-card',
  templateUrl: './organisation-card.component.html',
  styleUrls: ['./organisation-card.component.css']
})
export class OrganisationCardComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }

  acceptInvitation() {

  }

  declineInvitation() {

  }
}
