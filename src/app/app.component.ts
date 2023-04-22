import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SWE-Frontend';
  isAuthenticated: boolean = false;

  constructor(private router: Router) { }
  ngOnInit(){
    this.isAuthenticated =  JSON.parse(sessionStorage.getItem('authenticated') || 'false');
    if(!this.isAuthenticated){
      this.router.navigate(['']);
    }
  }
}
