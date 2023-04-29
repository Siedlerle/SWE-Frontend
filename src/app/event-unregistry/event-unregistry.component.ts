import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {DataService} from "../management/CardService";
import {UiUserService} from "../../services/ui-user.service";

@Component({
  selector: 'app-event-unregistry',
  templateUrl: './event-unregistry.component.html',
  styleUrls: ['./event-unregistry.component.css']
})
export class EventUnregistryComponent {
  @Output() onClose = new EventEmitter<void>();

  eventData: CustomEvent;
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();

  imageSource: string = "";

  constructor(private dataService: DataService, private uiUserService:UiUserService) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
  }

  closeRegistryCard() {
    this.onClose.emit();
  }

  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  unregisterFromEvent(){
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null && this.eventData.id != null){
      this.uiUserService.unregisterFromEvent(this.eventData.id, emailAddress).subscribe(response =>{
        this.closeRegistryCard();
        location.reload();
      });
    }
  }
}
