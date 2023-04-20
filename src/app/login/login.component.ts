import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = "";
  email: string = "";
  password: string = "";

  onSubmit(form: NgForm) {
    if(this.email=="organizer@ftb-solutions.de" && this.password=="organizer") {
      sessionStorage.setItem('authenticated', JSON.stringify(true));
      sessionStorage.setItem('role', 'organizer');
      location.reload()
    }else if(this.email=="user@ftb-solutions.de" && this.password=="user") {
      sessionStorage.setItem('authenticated', JSON.stringify(true));
      sessionStorage.setItem('role', 'user');
      location.reload()
    }
    else {
      sessionStorage.setItem('authenticated', JSON.stringify(false));
      location.reload()
    }
  }
}
