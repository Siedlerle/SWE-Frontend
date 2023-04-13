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
}
