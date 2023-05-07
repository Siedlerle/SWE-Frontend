import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UiUserService} from "../../services/ui-user.service";

@Component({
  selector: 'app-event-leave-dialog',
  templateUrl: './event-leave-dialog.component.html',
  styleUrls: ['./event-leave-dialog.component.css']
})
export class EventLeaveDialogComponent {

  feedback:string = "";
  constructor(public dialogRef: MatDialogRef<EventLeaveDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private uiUserService:UiUserService) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  //Wenn im Löschen Dialog Löschen gewählt wird, wird dieser Eintrag aus der Datenbank entfernt
  onYesClick(id: number): void {
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null && id != null){
      this.uiUserService.unregisterFromEvent(id, emailAddress, this.feedback).subscribe(response =>{
        location.reload();
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
      }
      );

    }
  }
}
