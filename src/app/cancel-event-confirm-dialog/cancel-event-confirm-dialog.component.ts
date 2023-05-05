import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {UiOrganizerService} from "../../services/ui-organizer.service";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";

@Component({
  selector: 'app-cancel-event-confirm-dialog',
  templateUrl: './cancel-event-confirm-dialog.component.html',
  styleUrls: ['./cancel-event-confirm-dialog.component.css']
})
export class CancelEventConfirmDialogComponent {
  feedback:string = "";
  constructor(public dialogRef: MatDialogRef<CancelEventConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private uiOrganizerService:UiOrganizerService) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  //Wenn im Löschen Dialog Löschen gewählt wird, wird dieser Eintrag aus der Datenbank entfernt
  onYesClick(id: number): void {
      if (id != null) {
        this.uiOrganizerService.cancelEvent(id, this.feedback).subscribe(response => {
          this.dialogRef.close(false);
        });
      }
  }
}
