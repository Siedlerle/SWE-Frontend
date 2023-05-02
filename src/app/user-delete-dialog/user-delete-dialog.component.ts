import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {UiUserService} from "../../services/ui-user.service";
@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent {
    constructor(public dialogRef: MatDialogRef<UserDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private uiUserService:UiUserService) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  //Wenn im Löschen Dialog Löschen gewählt wird, wird dieser Eintrag aus der Datenbank entfernt
  onYesClick(): void {
    this.uiUserService.deleteUser(this.data.emailAdress).subscribe(response => {
      sessionStorage.setItem('authenticated', JSON.stringify(false));
      this.dialogRef.close(true);
      location.reload();
    });
  }
}
