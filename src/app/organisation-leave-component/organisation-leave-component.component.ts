import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {UiUserService} from "../../services/ui-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-organisation-leave-component',
  templateUrl: './organisation-leave-component.component.html',
  styleUrls: ['./organisation-leave-component.component.css']
})
export class OrganisationLeaveComponentComponent {
  constructor(public dialogRef: MatDialogRef<OrganisationLeaveComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private uiUserService:UiUserService, private router:Router) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  //Wenn im Löschen Dialog Löschen gewählt wird, wird dieser Eintrag aus der Datenbank entfernt
  onYesClick(id: number): void {

    const emailAddress = sessionStorage.getItem('emailAdress');

    if(emailAddress != null && id !=null){
      this.uiUserService.leaveOrganisation(id,emailAddress).subscribe(response => {
        this.dialogRef.close(true);
          this.router.navigate(['']);
      },
 (error) => {
          console.error(error);
        }
      );
    }
  }
}
