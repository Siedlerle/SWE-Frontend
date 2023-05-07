import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiUserService} from "../../services/ui-user.service";
import {OrganisationCardService} from "./OrganisationCardService";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {URLs} from "../../assets/SystemVariables/URLs";

@Component({
  selector: 'app-organisation-card',
  templateUrl: './organisation-card.component.html',
  styleUrls: ['./organisation-card.component.css']
})
export class OrganisationCardComponent implements OnInit {

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

  registerInOrganisation() {
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && this.orgaData.id !=null){
      this.uiUserService.requestJoin(this.orgaData.id,emailAddress).subscribe(response =>{
        location.reload();
      });
    }
  }

  declineInvitation() {

  }
}
