import {Component, EventEmitter, Output} from '@angular/core';
import {Group} from "../../DataTransferObjects/Group";
import {UiAdminService} from "../../services/ui-admin.service";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  @Output() onCloseAddGroup = new EventEmitter<void>();

  group: Group = {
    name : ""
  }

  constructor(private uiAdminService: UiAdminService) {

  }

  createGroup() {
    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null && this.group.name != "") {
      this.uiAdminService.createGroup(orgaId, this.group).subscribe();
      this.closeAddGroup();
    }
  }

  closeAddGroup() {
    this.onCloseAddGroup.emit();
  }
}
