import {Component, EventEmitter, Output} from '@angular/core';
import {Organisation} from "../../DataTransferObjects/Organisation";
import {UiUserService} from "../../services/ui-user.service";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";
import {Router} from "@angular/router";
import {URLs} from "../../assets/SystemVariables/URLs";

@Component({
  selector: 'app-organisation-card-registered',
  templateUrl: './organisation-card-registered.component.html',
  styleUrls: ['./organisation-card-registered.component.css']
})
export class OrganisationCardRegisteredComponent {
  orgaData:Organisation;

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService, private router:Router) {
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

  leaveOrganisation() {
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && this.orgaData.id !=null){
      this.uiUserService.leaveOrganisation(this.orgaData.id,emailAddress).subscribe(response => {
        this.closeCard();
        location.reload();
      });
    }
  }

  selectOrganisation(organisation: Organisation) {
    sessionStorage.setItem('orgaId', JSON.stringify(organisation.id));

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null && organisation.id != null){
      this.uiUserService.getRoleForUserInOrga(organisation.id, emailAdress).subscribe(response =>{
        sessionStorage.setItem('orgaRole',response.role);
      });
    }

    const orgaId = sessionStorage.getItem('orgaId');
    const orgaRole = sessionStorage.getItem('orgaRole');
    if(orgaId != null && orgaId !== '' && orgaRole != null && orgaRole !== 'USER' && orgaRole !==''){
      sessionStorage.setItem('activeManagement', JSON.stringify(true));
    }else{
      sessionStorage.setItem('activeManagement', JSON.stringify(false));
    }

    this.router.navigate(['']);
  }
}
