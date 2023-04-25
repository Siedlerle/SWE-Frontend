import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {listData} from "./organisation-list";
import {MatPaginator} from "@angular/material/paginator";
import {UiUserService} from "../../services/ui-user.service";
import {Organization} from "../../DataTransferObjects/Organization";

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

  organisations!:Organization[]

  ngOnInit(): void {
    this.uiUserService.getAllOrganisations().subscribe(response => {
      this.organisations = response;
      console.log(this.organisations[0])
    });
  }


  public onCardClick(evt: MouseEvent) {
    console.log(evt);
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
