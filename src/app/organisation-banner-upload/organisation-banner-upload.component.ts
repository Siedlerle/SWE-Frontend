import {Component, EventEmitter, Output} from '@angular/core';
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-organisation-banner-upload',
  templateUrl: './organisation-banner-upload.component.html',
  styleUrls: ['./organisation-banner-upload.component.css']
})
export class OrganisationBannerUploadComponent {
  constructor(private uiOrganizerService: UiOrganizerService) {
  }

  accept!: string;
  fileControl = new FormControl();
  file!: File;

  @Output() onClose = new EventEmitter<void>();
  closeOrganisationBannerUpload() {
    this.onClose.emit();
  }
}
