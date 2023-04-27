import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  @Output() onCloseAddGroup = new EventEmitter<void>();

  closeAddGroup() {
    this.onCloseAddGroup.emit();
  }
}
