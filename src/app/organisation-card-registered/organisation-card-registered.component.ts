import {Component, EventEmitter, Output} from '@angular/core';
import {Organisation} from "../../DataTransferObjects/Organisation";
import {UiUserService} from "../../services/ui-user.service";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";
import {Router} from "@angular/router";
import {URLs} from "../../assets/SystemVariables/URLs";
import {EventDeleteDialogComponent} from "../event-delete-dialog/event-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  OrganisationLeaveComponentComponent
} from "../organisation-leave-component/organisation-leave-component.component";

@Component({
  selector: 'app-organisation-card-registered',
  templateUrl: './organisation-card-registered.component.html',
  styleUrls: ['./organisation-card-registered.component.css']
})
export class OrganisationCardRegisteredComponent {
  orgaData:Organisation;

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService, private router:Router, private dialog: MatDialog) {
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

    const dialogRef = this.dialog.open(OrganisationLeaveComponentComponent, {
      width: '250px',
      data: {orgaId: this.orgaData.id, orgaName: this.orgaData.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      }
    });
  }

  selectOrganisation(organisation: Organisation) {
    sessionStorage.setItem('orgaId', JSON.stringify(organisation.id));

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null && organisation.id != null){
      this.uiUserService.getRoleForUserInOrga(organisation.id, emailAdress).subscribe(response =>{
        sessionStorage.setItem('orgaRole',response.role);
        const orgaId = sessionStorage.getItem('orgaId');
        const orgaRole = sessionStorage.getItem('orgaRole');
        if(orgaId != null && orgaId !== '' && orgaRole != null && orgaRole !== 'USER' && orgaRole !==''){
          sessionStorage.setItem('activeManagement', JSON.stringify(true));
        }else{
          sessionStorage.setItem('activeManagement', JSON.stringify(false));
        }

        location.reload()

      });
    }
    this.router.navigate(['']);
  }
}
