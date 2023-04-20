import { Component, EventEmitter, Output } from '@angular/core';
import {DataService} from "../management/CardService";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.isEditing = false;
    this.onClose.emit();
  }
  cardData: any;

  constructor(private dataService: DataService) {
    this.cardData = this.dataService.getCardData();
  }

  isEditing = false;
  cardTitle: string;
  cardDescription: string;
  cardContent: string;

   editCard() {
     console.log("Ich funktioniere");
   this.isEditing = true;
    // populate form with existing data
    this.cardTitle = this.cardData.eventTitle;
    this.cardDescription = this.cardData.eventDescription;
  }

  onSave() {
    // save edited data and exit editing mode
    this.cardData.eventTitle = this.cardTitle;
    this.cardData.eventDescription = this.cardDescription;
    this.isEditing = false;
  }

  onCancel() {
    // discard changes and exit editing mode
    this.isEditing = false;
  }

}
