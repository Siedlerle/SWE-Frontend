import {Component, ElementRef, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {listData} from "../event-catalog/event-list";
import {MatPaginator} from "@angular/material/paginator";
import {AddEventComponent} from "../add-event/add-event.component";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  eventList = listData
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
}

