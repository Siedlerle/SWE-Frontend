import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {FormControl} from "@angular/forms";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {UiAdminService} from "../../services/ui-admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-organisation-banner-upload',
  templateUrl: './organisation-banner-upload.component.html',
  styleUrls: ['./organisation-banner-upload.component.css']
})
export class OrganisationBannerUploadComponent {
  constructor(private uiOrganizerService: UiOrganizerService, private uiUserService: UiUserService, private uiAdminService: UiAdminService, private snackBar: MatSnackBar) {
    this.fileControl = new FormControl(this.file)
  }

  ngOnInit(){
    const orgaId = sessionStorage.getItem('orgaId');

    this.fileControl.valueChanges.subscribe((file: any) => {
      this.file = file;
      if (this.file.size > 1048576) {
        this.snackBar.open("Image-Größe maximal 1MB", 'Close', { duration: 5000 });
      } else {
        this.uiAdminService.changeOrganisation(this.orga, this.file).subscribe();
        this.closeOrganisationBannerUpload();
      }

    });

  if(orgaId != null) {
    this.uiUserService.getOrganisation(orgaId).subscribe(data => {
      this.orga = data;
      console.log(data);
    });
  }
  }

  accept!: string;
  fileControl = new FormControl();
  file!: File;
  orga: Organisation;



  @Output() onClose = new EventEmitter<void>();
  closeOrganisationBannerUpload() {
    this.onClose.emit();
  }
}
