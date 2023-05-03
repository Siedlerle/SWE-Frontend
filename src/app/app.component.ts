import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {UiUserService} from "../services/ui-user.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SWE-Frontend';
  isAuthenticated: boolean = false;
  private isPhoneviewed: boolean;

  constructor(private router: Router, private authService: AuthService, private uiUserService:UiUserService , private activeRoute : ActivatedRoute, public responsive: BreakpointObserver) {
    document.addEventListener('mousemove', this.handleUserInput.bind(this));
    document.addEventListener('keypress', this.handleUserInput.bind(this));
    document.addEventListener('mousedown', this.handleUserInput.bind(this));
  }
  handleUserInput() {
    this.authService.resetTimeout();
    this.authService.lastInputTime = new Date();
  }
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
    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {

        this.isPhoneviewed = false;

        if (result.matches) {
          this.isPhoneviewed = true;
        }
        {
          console.log('HandsetPortrait is on');
        }

      });
  }

}
