import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {listData} from "../organisation-catalog/organisation-list";
import {MatCardContent} from "@angular/material/card";

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

  constructor(private router: Router) { }
  organisationList = listData;
  ngOnInit() {
    this.router.navigate(['/homepage']);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });
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

  showCard = false;
  openCard(){
    this.showCard = true;
  }
  closeCard(){
    this.showCard = false;
  }

  logOut(){
    this.router.navigate(['/login']);
  }
}
