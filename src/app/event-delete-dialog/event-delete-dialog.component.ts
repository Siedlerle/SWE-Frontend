import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UiOrganizerService} from "../../services/ui-organizer.service";

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './event-delete-dialog.component.html',
  styleUrls: ['./event-delete-dialog.component.css']
})
export class EventDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<EventDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private uiOrganizerService:UiOrganizerService) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  //Wenn im Löschen Dialog Löschen gewählt wird, wird dieser Eintrag aus der Datenbank entfernt
  onYesClick(id: number): void {
    //console.log(id)
    this.uiOrganizerService.deleteEvent(id).subscribe(
      () => {
        location.reload();
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
