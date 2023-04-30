import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiUserService} from "../../services/ui-user.service";
import {URLs} from "../../assets/SystemVariables/URLs";

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

  imageSource: string = "";
  backendURL: string = "";

  constructor(private dataService: DataService, private uiUserService:UiUserService) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    this.backendURL = URLs.backend;
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
}