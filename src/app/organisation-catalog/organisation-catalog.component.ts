import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {listData} from "./organisation-list";
import {MatPaginator} from "@angular/material/paginator";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {User} from "../../DataTransferObjects/User";
import {OrganisationCardComponent} from "../organisation-card/organisation-card.component";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";

@Component({
  selector: 'app-organisation-catalog',
  templateUrl: './organisation-catalog.component.html',
  styleUrls: ['./organisation-catalog.component.css']
})
export class OrganisationCatalogComponent implements OnInit{

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService) {

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
  openCard(item: Organisation){
    this.showCard = true;
    this.organisationCardService.setCardData(item);
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
