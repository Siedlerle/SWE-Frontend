import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";

@Component({
  selector: 'app-event-catalog',
  templateUrl: './event-catalog.component.html',
  styleUrls: ['./event-catalog.component.css']
})
export class EventCatalogComponent implements OnInit {
  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  availableEvents: CustomEvent[];
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  constructor(private uiUserService: UiUserService) {

  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    if (emailAddress != null && orgaId != null) {
      this.uiUserService.getAllVisibleNoRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.availableEvents = response;
      });
    }
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


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.president.toLowerCase().includes(searchText) || it.party.toLowerCase().includes(searchText) || it.took_office.toLowerCase().includes(searchText);
    });
  }
}
