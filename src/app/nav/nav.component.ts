import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  menuItems = [
    { label: 'Start', route: '/homepage' },
    { label: 'Eventkatalog', route: '/event-catalog' },
    { label: 'Meine Events', route: '/my-events' },
    { label: 'Verwaltung', route: '/management' }
  ];

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
}
