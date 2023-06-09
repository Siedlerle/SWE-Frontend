import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  }

  @ViewChild('searchbar') searchbar: ElementRef;
  myOrgaSearchText = '';
  allOrgaSearchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;
  backendURL: string = URLs.backend;

  allOrganisations!:Organisation[]
  usersOrganisations!:Organisation[]

  ngOnInit(): void {
    const emailAddress = sessionStorage.getItem('emailAdress');
    this.uiUserService.getAllOrganisations().subscribe(response => {
      this.allOrganisations = response;
      if(emailAddress != null){
        this.uiUserService.getOrganisationForUser(emailAddress).subscribe(response =>{
          this.usersOrganisations = response;
          this.allOrganisations = this.allOrganisations.filter((org) => {
            return this.usersOrganisations.findIndex((myOrg) => myOrg.id === org.id) === -1;
          })
        });
      }
    });

  }




  public onCardClick(evt: MouseEvent) {
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

  filterMyOrgas() {
    if (!this.myOrgaSearchText) {
      return this.usersOrganisations;
    }
    return this.usersOrganisations.filter(orga => orga.name.toLowerCase().includes(this.myOrgaSearchText.toLowerCase()));
  }
  filterAllOrgas() {
    if (!this.allOrgaSearchText) {
      return this.allOrganisations;
    }
    return this.allOrganisations.filter(orga => orga.name.toLowerCase().includes(this.allOrgaSearchText.toLowerCase()));
  }


}
