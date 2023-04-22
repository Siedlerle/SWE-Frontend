import {Component, EventEmitter, Output} from '@angular/core';
import {listData} from "../event-catalog/event-list";
import {NgForm} from "@angular/forms";
import {BreakpointObserver,Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import{Router} from "@angular/router";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  @Output() onClose = new EventEmitter<void>();
  eventList = listData
  constructor( private breakpointObserver: BreakpointObserver) {}

  closePopup() {
    this.onClose.emit();
  }


    eventTitle: string ="";
    eventDescription: string = "";
    eventStart: string = "";
    eventEnd: string = "";
    eventDate: Date = new Date();
    eventLocation: string = "";
    eventOrganizer: string = "";

    onSubmit(form: NgForm)
    {
    const newEvent = {
        eventTitle: this.eventTitle,
        eventDescription: this.eventDescription,
        eventDate: this.eventDate.toDateString(),
        eventOrganizer: this.eventOrganizer
      };
      listData.fill(newEvent);
      form.reset();
      this.closePopup();
      location.reload();
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


