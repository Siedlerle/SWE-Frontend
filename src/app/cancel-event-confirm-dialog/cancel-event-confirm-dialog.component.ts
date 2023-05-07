import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {UiOrganizerService} from "../../services/ui-organizer.service";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";
import {EventCardComponent} from "../event-card/event-card.component";

@Component({
  selector: 'app-cancel-event-confirm-dialog',
  templateUrl: './cancel-event-confirm-dialog.component.html',
  styleUrls: ['./cancel-event-confirm-dialog.component.css']
})
export class CancelEventConfirmDialogComponent {
  feedback = "";
  constructor(public dialogRef: MatDialogRef<CancelEventConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private uiOrganizerService:UiOrganizerService) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  //Wenn im Löschen Dialog Löschen gewählt wird, wird dieser Eintrag aus der Datenbank entfernt
  onYesClick(id: number): void {
      if (id != null) {
        if(this.feedback == ""){
          this.feedback = "Komplikation mit der Eventplanung";
        }
        this.uiOrganizerService.cancelEvent(id, this.feedback).subscribe(response => {
          this.data.status = EnumEventStatus.CANCELLED;
          this.dialogRef.close(false);
        });
      }
  }
}
