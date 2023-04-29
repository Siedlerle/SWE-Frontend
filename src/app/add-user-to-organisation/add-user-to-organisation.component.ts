import {Component, EventEmitter, Output} from '@angular/core';
import {UiOrganizerService} from "../../services/ui-organizer.service";

@Component({
  selector: 'app-add-user-to-organisation',
  templateUrl: './add-user-to-organisation.component.html',
  styleUrls: ['./add-user-to-organisation.component.css']
})
export class AddUserToOrganisationComponent {

  emailAddress: string

  constructor(private uiOrganizerService: UiOrganizerService) {
  }

  @Output() onClose = new EventEmitter<void>();
  inviteUserToOrga(){
    const orgaId = sessionStorage.getItem('orgaId');
    if(orgaId !=null){
      this.uiOrganizerService.inviteUserToOrganisation(orgaId, this.emailAddress).subscribe(response =>{
        this.closeAddUser();
      });
    }
  }
  closeAddUser() {
    this.onClose.emit();
  }
}
