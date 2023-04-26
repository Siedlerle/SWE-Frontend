import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {listData} from "../organisation-catalog/organisation-list";
import {MatCardContent} from "@angular/material/card";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  menuItems = [
    { label: 'Start', route: '/homepage' },
    { label: 'Eventkatalog', route: '/event-catalog' },
    { label: 'Meine Events', route: '/my-events' },
    { label: 'Verwaltung', route: '/management' }
  ];

  activeLink: string;

  organisationsForUser!:Organisation[];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private uiUserService : UiUserService) { }
  organisationList = listData;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress!=null){
      this.uiUserService.getOrganisationForUser(emailAdress).subscribe(response =>{
        this.organisationsForUser = response;
      });
    }
  }

  isDropdownOpen = false;
  isDropdownOpenBanner = false;
  dropDownTop = 0;
  dropDownLeft = 0;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdownBanner(event: MouseEvent) {
    this.isDropdownOpenBanner = !this.isDropdownOpenBanner;
    this.dropDownTop = event.clientY + 10;
    this.dropDownLeft = event.clientX -150;
  }

  onOrganisationClick(organisation:Organisation){
    sessionStorage.setItem('orgaId', JSON.stringify(organisation.id));

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null && organisation.id != null){
      this.uiUserService.getRoleForUserInOrga(organisation.id, emailAdress).subscribe(response =>{
        sessionStorage.setItem('orgaRole',response.role);
      });
    }

    this.router.navigate(['']);
  }

  goBackToStart(){
    sessionStorage.setItem('orgaId', '');
    sessionStorage.setItem('orgaRole', '');
    sessionStorage.setItem('eventRole', '');
    this.router.navigate(['']);
  }

  showCard = false;
  openCard(){
    this.showCard = true;
  }
  closeCard(){
    this.showCard = false;
  }

  logOut(){
    this.uiUserService.logout().subscribe();
    sessionStorage.setItem('authenticated', JSON.stringify(false));
    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('refreshToken', '');
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('orgaId', '');
    location.reload();
  }
}
