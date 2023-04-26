import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {listData} from "./organisation-list";
import {MatPaginator} from "@angular/material/paginator";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";

@Component({
  selector: 'app-organisation-catalog',
  templateUrl: './organisation-catalog.component.html',
  styleUrls: ['./organisation-catalog.component.css']
})
export class OrganisationCatalogComponent implements OnInit{

  constructor(private uiUserService:UiUserService) {

  }

  organisationslist = listData;
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  organisations!:Organisation[]

  ngOnInit(): void {
    this.uiUserService.getAllOrganisations().subscribe(response => {
      this.organisations = response;
    });
  }


  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  showCard = false;
  openCard(){
    this.showCard = true;
  }
  closeCard(){
    this.showCard = false;
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
