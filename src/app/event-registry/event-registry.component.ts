import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {DataService} from "../management/CardService";
import {UiUserService} from "../../services/ui-user.service";
import {URLs} from "../../assets/SystemVariables/URLs";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";

@Component({
  selector: 'app-event-registry',
  templateUrl: './event-registry.component.html',
  styleUrls: ['./event-registry.component.css']
})
export class EventRegistryComponent {

  @Output() onClose = new EventEmitter<void>();

  eventData: CustomEvent;
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();
  eventSeriesDates: string[] = [];

  imageSource: string = "";
  backendURL: string = "";
  eventStatus: string = "";
  constructor(private dataService: DataService, private uiUserService:UiUserService) {
    this.eventData = this.dataService.getCardData();
    this.getReadableStatus();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    this.backendURL = URLs.backend;
  }

  ngOnInit() {
    this.calculateAllDates();
  }

  closeRegistryCard() {
    this.onClose.emit();
  }

  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  registerForEvent(){
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null && this.eventData.id != null){
      this.uiUserService.registerForEvent(this.eventData.id, emailAddress).subscribe(response =>{
        this.closeRegistryCard();
        location.reload();
      });
    }
  }

  getReadableStatus() {
    switch (this.eventData.status) {
      case EnumEventStatus.INPREPARATION:
        this.eventStatus = 'In Vorbereitung';
        break;
      case EnumEventStatus.SCHEDULED:
        this.eventStatus = 'Geplant';
        break;
      case EnumEventStatus.RUNNING:
        this.eventStatus = 'In Durchführung';
        break;
      case EnumEventStatus.ACCOMPLISHED:
        this.eventStatus = 'Vergangen';
        break;
      case EnumEventStatus.CANCELLED:
        this.eventStatus = 'abgesagt';
        break;
    }
  }

  calculateAllDates(){
    let amount = this.eventData.eventSeries?.amount;
    let dayInBetween = this.eventData.eventSeries?.daysBetweenEvents;

    if(amount && dayInBetween) {
      for (let i = 0; i < amount; i++) {
        const date = new Date(this.eventStartDate.getTime());
        date.setDate(date.getDate() + (i * dayInBetween));
        const formattedDate = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        this.eventSeriesDates.push(formattedDate);
      }
    }
  }
}
