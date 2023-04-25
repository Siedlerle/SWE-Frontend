import {Component, ElementRef, Inject, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {listData, listEventData} from "../event-catalog/event-list";
import {MatPaginator} from "@angular/material/paginator";
import {AddEventComponent} from "../add-event/add-event.component";
import {EventCardComponent} from "../event-card/event-card.component";
import {MatCardContent} from "@angular/material/card";
import {DataService} from "./CardService";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  constructor(private dataService: DataService) { }
  eventList= listEventData;
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;
  filterEvents() {
    if (!this.searchText) {
      return this.eventList;
    }
    return this.eventList.filter(event => {
      return event.eventTitle.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  showPopup = false;
  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }
  showCard = false;
  openCard(item: MatCardContent){
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


