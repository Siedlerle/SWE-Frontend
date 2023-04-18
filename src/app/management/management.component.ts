import {Component, ElementRef, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {listData, listEventData} from "../event-catalog/event-list";
import {MatPaginator} from "@angular/material/paginator";
import {AddEventComponent} from "../add-event/add-event.component";
import {EventCardComponent} from "../event-card/event-card.component";
import {MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  eventList = listEventData
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
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


  }

  closeCard(){
    this.showCard = false;
  }


}


