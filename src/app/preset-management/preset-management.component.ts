import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {FormControl, NgForm} from "@angular/forms";
import {Preset} from "../../DataTransferObjects/Preset";
import {MatSelectChange} from "@angular/material/select";
import {ThemePalette} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-preset-management',
  templateUrl: './preset-management.component.html',
  styleUrls: ['./preset-management.component.css']
})
export class PresetManagementComponent implements OnInit{
  @Output() onClose = new EventEmitter<void>();

  preset: Preset = {
    name : "",
    type : "",
    description : "",
    location : "",
    startDate : new Date(),
    startTime : "",
    endDate : new Date(),
    endTime : ""
  }

  presets: Preset[] = [];
  isEditing: boolean;
  fileControl: FormControl;
  file!: File;
  accept: string;
  color: ThemePalette = 'primary';
  fileTooBig: boolean;

  constructor(private uiOrganizerService: UiOrganizerService, private snackBar: MatSnackBar) {
    this.fileControl = new FormControl(this.file)
  }

  ngOnInit() {
    this.fileControl.valueChanges.subscribe((file: any) => {
      this.fileTooBig = false;
      this.file = file;
      if (this.file.size > 1048576) {
        this.fileTooBig = true;
        this.snackBar.open("Image-Größe maximal 1MB", 'Close', { duration: 5000 });
      }
    });

    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiOrganizerService.getPresetsFromOrganisation(orgaId).subscribe(response => {
        this.presets = response;
      })
    }

  }

  selectPreset(event: MatSelectChange) {
    let selectedPresetName = event.value;

    if (selectedPresetName === "create_new_preset") {
      this.preset = {
        name : "",
        type : "",
        description : "",
        location : "",
        startDate : new Date(),
        startTime : "",
        endDate : new Date(),
        endTime : ""
      }
      this.isEditing = false;
    } else {
      this.presets.forEach(value => {
        if (value.name === selectedPresetName) {
          this.preset = value;
          this.isEditing = true;
        }
      })
    }
  }

  onCreatePreset(form: NgForm) {
    const orgaId = sessionStorage.getItem('orgaId');
    if(orgaId != null){
      this.uiOrganizerService.addPreset(this.preset, orgaId, this.file).subscribe(response =>{

        }
      );
    }
    this.closePopup();
  }

  deletePreset() {
    if(this.preset.id != null){
      this.uiOrganizerService.deletePreset(this.preset.id).subscribe();
      this.closePopup();
    }
  }

  changePreset() {
    const orgaId = sessionStorage.getItem('orgaId');
    if(orgaId != null){
      this.uiOrganizerService.changePreset(this.preset, this.file).subscribe(response => {
        const text = response.message;
        if (text === "Preset changed successfully") {
          this.snackBar.open("Event erfolgreich geändert", 'Close', { duration: 10000 });
        } else {
          this.snackBar.open("Änderung des Events fehlgeschlagen", 'Close', { duration: 10000 });
        }
      });
      this.closePopup();
    }
  }

  closePopup() {
    this.onClose.emit();
  }
}
