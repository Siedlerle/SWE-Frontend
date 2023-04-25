import {Component, EventEmitter, Output} from '@angular/core';
import {listData} from "../event-catalog/event-list";
import {NgForm} from "@angular/forms";
import {BreakpointObserver,Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {D} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  @Output() onClose = new EventEmitter<void>();
  eventList = listData

  customEvent:CustomEvent = {
    name : "",
    description: "",
    location: "",
  };

  constructor( private breakpointObserver: BreakpointObserver, private uiOrganizerService: UiOrganizerService) {}

  closePopup() {
    this.onClose.emit();
  }


    eventTitle: string ="";
    eventDescription: string = "";
    eventType: string = "";
    eventStart: string = "";
    eventEnd: string = "";
    eventStartDate: Date = new Date();
    eventEndDate: Date = new Date();
    eventLocation: string = "";

    onSubmit(form: NgForm)
    {
      const emailAdress = sessionStorage.getItem('emailAdress');
      if(emailAdress != null){
        this.uiOrganizerService.addEvent(this.customEvent, emailAdress).subscribe(response =>{
          console.log(response);
          }
        );
      }

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


