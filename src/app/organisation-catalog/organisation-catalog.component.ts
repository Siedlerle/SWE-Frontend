import {Component, ElementRef, ViewChild} from '@angular/core';
import {listData} from "./organisation-list";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-organisation-catalog',
  templateUrl: './organisation-catalog.component.html',
  styleUrls: ['./organisation-catalog.component.css']
})
export class OrganisationCatalogComponent {
  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  organisationslist = listData;
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
