import {Component, EventEmitter, Output} from '@angular/core';
import {UiUserService} from "../../services/ui-user.service";
import {OrganisationCardService} from "./OrganisationCardService";
import {Organisation} from "../../DataTransferObjects/Organisation";

@Component({
  selector: 'app-organisation-card',
  templateUrl: './organisation-card.component.html',
  styleUrls: ['./organisation-card.component.css']
})
export class OrganisationCardComponent {

  orgaData:Organisation;

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService) {
    this.orgaData = this.organisationCardService.getCardData();
  }
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }

  registerInOrganisation() {
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && this.orgaData.id !=null){
      this.uiUserService.requestJoin(this.orgaData.id,emailAddress).subscribe(response =>{
        this.closeCard();
        location.reload();
      });
    }
  }

  declineInvitation() {

  }
}
