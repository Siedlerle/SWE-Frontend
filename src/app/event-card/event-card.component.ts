import { Component, EventEmitter, Output } from '@angular/core';
import {DataService} from "../management/CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {User} from "../../DataTransferObjects/User";

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
  eventData: CustomEvent;

  constructor(private dataService: DataService) {
    this.eventData = this.dataService.getCardData();
  }

  isEditing = false;
  cardTitle: string;
  cardDescription: string;
  attendees: User[];



   editCard() {
    this.isEditing = true;
    this.cardTitle = this.eventData.name;
    this.cardDescription = this.eventData.description;



  }
  addUser(){

  }
  removeUser(){

  }

  onSave() {
    // save edited data and exit editing mode
    this.eventData.name = this.cardTitle;
    this.eventData.description = this.cardDescription;
    this.isEditing = false;
  }

  onCancel() {
    // discard changes and exit editing mode
    this.isEditing = false;
  }
  showAddUsertoEvent = false;
  openAddUsertoEvent(){
     this.showAddUsertoEvent = true
  }

}
