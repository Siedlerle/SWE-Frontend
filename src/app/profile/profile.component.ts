import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }
}
