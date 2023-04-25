import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SWE-Frontend';
  isAuthenticated: boolean = false;

  constructor(private router: Router, private activeRoute : ActivatedRoute) { }
  ngOnInit(){
    this.isAuthenticated =  JSON.parse(sessionStorage.getItem('authenticated') || 'false');

    const param = this.activeRoute.params;

    if(param == null) {
      if (!this.isAuthenticated) {
        this.router.navigate(['']);
      }
    }else{
      if(!this.isAuthenticated){
        setTimeout(()=>{
          this.router.navigate([''])
        },1000)
      }
    }
  }
}
