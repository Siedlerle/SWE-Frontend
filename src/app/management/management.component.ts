import {Component, ElementRef, Inject, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AddEventComponent} from "../add-event/add-event.component";
import {EventCardComponent} from "../event-card/event-card.component";
import {MatCardContent} from "@angular/material/card";
import {DataService} from "./CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiOrganizerService} from "../../services/ui-organizer.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService) { }
  managingEvents: CustomEvent[];
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;
  filterEvents() {
    if (!this.searchText) {
      return this.managingEvents;
    }
    return this.managingEvents.filter(event => {
      return event.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    if (emailAddress != null && orgaId != null) {
      this.uiOrganizerService.getManagingEvents(emailAddress, orgaId).subscribe(response => {
        this.managingEvents = response;
      });
    }
  }

  showPopup = false;
  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }
  showCard = false;
  openCard(item: CustomEvent){
    this.showCard = true;
    this.dataService.setCardData(item);
  }
  closeCard(){
    this.showCard = false;
  }

  showUserManagement = false;
  openUserManagement() {
    this.showUserManagement = true;
    //User informationen laden und setzten
  }
  closeUserManagement() {
    this.showUserManagement = false;
  }
}


