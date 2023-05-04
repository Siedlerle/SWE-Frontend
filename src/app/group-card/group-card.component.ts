import {Component, EventEmitter, Output} from '@angular/core';

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

}
