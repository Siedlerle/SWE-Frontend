import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {listData} from "./organisation-list";
import {MatPaginator} from "@angular/material/paginator";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {User} from "../../DataTransferObjects/User";
import {OrganisationCardComponent} from "../organisation-card/organisation-card.component";
import {OrganisationCardService} from "../organisation-card/OrganisationCardService";
import {URLs} from "../../assets/SystemVariables/URLs";

@Component({
  selector: 'app-organisation-catalog',
  templateUrl: './organisation-catalog.component.html',
  styleUrls: ['./organisation-catalog.component.css']
})
export class OrganisationCatalogComponent implements OnInit{

  constructor(private uiUserService:UiUserService, private organisationCardService:OrganisationCardService) {
    this.uiUserService.getAllOrganisations().subscribe(response => {
      this.allOrganisations = response;
    });
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null){
      this.uiUserService.getOrganisationForUser(emailAddress).subscribe(response =>{
        this.usersOrganisations = response;
      });
    }
  }

  organisationslist = listData;
  @ViewChild('searchbar') searchbar: ElementRef;
  myOrgaSearchText = '';
  allOrgaSearchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;
  backendURL: string = URLs.backend;

  allOrganisations!:Organisation[]
  usersOrganisations!:Organisation[]

  ngOnInit(): void {

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

  showMyOrganisation = false;
  openMyOrganisation(item: Organisation){
    this.showMyOrganisation = true;
    this.organisationCardService.setCardData(item);
  }
  closeMyOrganisation(){
    this.showMyOrganisation = false;
  }

  showOrganisation = false;
  openOrganisation(item: Organisation){
    this.showOrganisation = true;
    this.organisationCardService.setCardData(item)
  }
  closeOrganisation(){
    this.showOrganisation = false
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }

  searchClose() {
    this.myOrgaSearchText = '';
    this.toggleSearch = false;
  }


}
