import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {BreakpointObserver,Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {D} from "@angular/cdk/keycodes";
import {TimeInterval} from "rxjs/internal/operators/timeInterval";
import {EventSeries} from "../../DataTransferObjects/EventSeries";
import {ThemePalette} from "@angular/material/core";
import {Preset} from "../../DataTransferObjects/Preset";
import {MatSelectChange} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  event: CustomEvent = {
    name: "",
    description: "",
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    type: "",
    startTime: "",
    endTime: "",
    isPublic: false
  };

  presets: Preset[] = [];

  eventSeries: EventSeries = {
    amount: undefined,
    daysBetweenEvents: undefined
  };

  fileControl: FormControl;
  accept: string;
  color: ThemePalette = 'primary';
  public listAccepts = [
    null,
    ".png",
    "image/*"
  ];
  file!: File;

  constructor(private breakpointObserver: BreakpointObserver, private uiOrganizerService: UiOrganizerService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {
    this.fileControl = new FormControl(this.file)
  }


  ngOnInit() {

    this.fileControl.valueChanges.subscribe((file: any) => {
      if (file != undefined || file != null) {
        if (file.size > 1048576) {
          this.snackBar.open("Image-Größe maximal 1MB. Bild ist nicht hochgeladen worden.", 'Schließen', {duration: 5000});
          this.fileControl.reset();
        } else {
          this.file = file;
        }
      }
    });

    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiOrganizerService.getPresetsFromOrganisation(orgaId).subscribe(response => {
        this.presets = response;
      })
    }
  }


  closePopup() {
    this.onClose.emit();
  }

  selectPreset(event: MatSelectChange) {
    let selectedPresetName = event.value;

    if (selectedPresetName === "create_new_event") {
      this.event = {
        name: "",
        type: "",
        description: "",
        location: "",
        startDate: new Date(),
        startTime: "",
        endDate: new Date(),
        endTime: "",
        isPublic: false
      }
    } else {
      this.presets.forEach(value => {
        if (value.name === selectedPresetName) {
          this.event.name = value.name;
          this.event.description = value.description;
          this.event.startDate = value.startDate;
          this.event.startTime = value.startTime;
          this.event.endDate = value.endDate;
          this.event.endTime = value.endTime;
          this.event.location = value.location;
          this.event.type = value.type;
          this.event.image = value.image;
        }
      })
    }
  }

  wantEventSeries: boolean = false;
  eventSeriesAmount: number;
  eventSeriesInterval: number;

  eventName: string = "";
  eventDescription: string = "";
  eventType: string = "";
  eventStartTime: string = "";
  eventEndTime: string = "";
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();
  eventLocation: string = "";
  eventImage: String;


  onSubmit(form: NgForm) {
    const dayTime = new Date();
    const startTime = this.getDate(this.event.startDate, this.event.startTime);
    const endTime = this.getDate(this.event.endDate, this.event.endTime);
    if (startTime > endTime) {
      this.snackBar.open("Startzeitpunkt liegt nach Endzeitpunkt. Event wird nicht erstellt.", 'Schließen', { duration: 5000 });
      return;
    } else if (startTime < dayTime) {
      this.snackBar.open("Startzeitpunkt liegt vor jetzigem Zeitpunkt. Event wird nicht erstellt.", 'Schließen', { duration: 5000 });
      return;
    }

    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    if (emailAddress != null && orgaId != null) {
      if (!this.wantEventSeries) {
        this.uiOrganizerService.addEvent(this.event, emailAddress, orgaId, this.file).subscribe(response => {
            //console.log(response);
            this.closePopup();
            location.reload();
          }
        );
      } else {
        this.uiOrganizerService.addEventSeries(this.event, this.eventSeries, emailAddress, orgaId, this.file).subscribe(response => {
          //console.log(response);
          this.closePopup();
          location.reload();
        });
      }
    }
  }

  getDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0);
    return newDate;
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Basic Configuration', cols: 1, rows: 4}
        ];
      }

      return [
        {title: 'Basic Configuration', cols: 1, rows: 4}
      ];
    })
  );


}


