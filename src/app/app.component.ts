import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SWE-Frontend';
  isAuthenticated: boolean = false;
  ngOnInit(){
    this.isAuthenticated =  JSON.parse(sessionStorage.getItem('authenticated') || 'false');
  }
}
