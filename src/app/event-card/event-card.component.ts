import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }
  isEditing = true;
  cardTitle: string;
  cardSubtitle: string;
  cardContent: string;

   onCardClick() {
    this.isEditing = true;
    // populate form with existing data
    this.cardTitle = 'Card Title';
    this.cardSubtitle = 'Card Subtitle';
    this.cardContent = 'Card content';
  }

  onSave() {
    // save edited data and exit editing mode
    this.isEditing = false;
  }

  onCancel() {
    // discard changes and exit editing mode
    this.isEditing = false;
  }

}
