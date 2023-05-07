import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Organisation} from "../../DataTransferObjects/Organisation";
import {UiUserService} from "../../services/ui-user.service";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";
import {URLs} from "../../assets/SystemVariables/URLs";

@Component({
  selector: 'app-organisation-card-invitation',
  templateUrl: './organisation-card-invitation.component.html',
  styleUrls: ['./organisation-card-invitation.component.css']
})
export class OrganisationCardInvitationComponent implements OnInit {
  orgaData:Organisation;

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService) {
    this.orgaData = this.organisationCardService.getCardData();
  }
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }

  backendURL: string = URLs.backend;
  imageSource: string = "";
  ngOnInit() {
    if (this.orgaData.image === null || this.orgaData.image === "") {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.backendURL+this.orgaData.image;
    }
  }

  acceptInvitation() {
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && this.orgaData.id !=null){
      this.uiUserService.acceptOrganisationInvitation(this.orgaData.id, emailAddress).subscribe(response =>{
        this.closeCard();
        location.reload();
      });
    }
  }

  declineInvitation() {
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && this.orgaData.id !=null){
      this.uiUserService.declineOrganisationInvitation(this.orgaData.id, emailAddress).subscribe( respones =>{
        this.closeCard();
        location.reload();
      });
    }
  }
}
