import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {BreakpointObserver,Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {D} from "@angular/cdk/keycodes";
import {TimeInterval} from "rxjs/internal/operators/timeInterval";
import {EventSeries} from "../../DataTransferObjects/EventSeries";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  event : CustomEvent = {
    name : "",
    description: "",
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    type: "",
    startTime: "",
    endTime: "",
    isPublic: false
  };

  eventSeries: EventSeries = {
    amount : undefined,
    daysBetweenEvents : undefined
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

  constructor( private breakpointObserver: BreakpointObserver, private uiOrganizerService: UiOrganizerService) {
    this.fileControl = new FormControl(this.file)
  }


  ngOnInit() {
    this.fileControl.valueChanges.subscribe((file: File) => {

    });
  }


  closePopup() {
    this.onClose.emit();
  }


    wantEventSeries: boolean = false;
    eventSeriesAmount : number;
    eventSeriesInterval : number;

    eventName: string ="";
    eventDescription: string = "";
    eventType: string = "";
    eventStartTime: string = "";
    eventEndTime: string = "";
    eventStartDate: Date = new Date();
    eventEndDate: Date = new Date();
    eventLocation: string = "";
    eventImage: File;

    onSubmit(form: NgForm)
    {
      const emailAddress = sessionStorage.getItem('emailAdress');
      const orgaId = sessionStorage.getItem('orgaId');
      if(emailAddress != null && orgaId != null){
        if(!this.wantEventSeries) {
          this.uiOrganizerService.addEvent(this.event, emailAddress, orgaId).subscribe(response =>{
              console.log(response);
            }
          );
        } else {
          this.uiOrganizerService.addEventSeries(this.event, this.eventSeries, emailAddress, orgaId).subscribe(response => {
            console.log(response);
          });
        }

      }
      this.closePopup();
      location.reload();

    /*
    const newEvent = {
        eventTitle: this.eventTitle,
        eventDescription: this.eventDescription,
        eventDate: this.eventDate.toDateString(),
        eventOrganizer: this.eventOrganizer
      };
      listData.fill(newEvent);
      form.reset();
      this.closePopup();
      location.reload();*/
  }


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Basic Configuration', cols: 1, rows: 4 }
        ];
      }

      return [
        { title: 'Basic Configuration', cols: 1, rows: 4 }
      ];
    })
  );
}


