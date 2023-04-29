import {Component, EventEmitter, Output} from '@angular/core';
import {Organisation} from "../../DataTransferObjects/Organisation";
import {UiUserService} from "../../services/ui-user.service";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";

@Component({
  selector: 'app-organisation-card-invitation',
  templateUrl: './organisation-card-invitation.component.html',
  styleUrls: ['./organisation-card-invitation.component.css']
})
export class OrganisationCardInvitationComponent {
  orgaData:Organisation;

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService) {
    this.orgaData = this.organisationCardService.getCardData();
  }
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }

  acceptInvitation() {
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && this.orgaData.id !=null){
      this.uiUserService.requestJoin(this.orgaData.id,emailAddress).subscribe();
    }
  }

  declineInvitation() {

  }
}
