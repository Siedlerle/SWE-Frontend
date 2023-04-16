import {Component, ElementRef, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {listEventData} from "../event-catalog/event-list";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent {

  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  eventList = listEventData;
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  constructor() {

  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
}


