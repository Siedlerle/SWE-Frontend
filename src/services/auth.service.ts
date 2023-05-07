import {HostListener, Injectable} from '@angular/core';
import {interval} from "rxjs";
import {UiUserService} from "./ui-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private inactivityTimeout: any;
  private intervalHandler: any;
  lastInputTime: Date = new Date();

  constructor(private uiUserService: UiUserService) {

  }

  getToken(){
    return sessionStorage.getItem('accessToken')||'';
  }


  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  @HostListener('document:mousedown', ['$event'])
  resetTimeout() {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      clearInterval(this.intervalHandler);
      sessionStorage.setItem('accessToken','');
      sessionStorage.setItem('refreshToken', '');
      sessionStorage.setItem('orgaId','');
      sessionStorage.setItem('emailAdress','');
      sessionStorage.setItem('orgaRole','');
      sessionStorage.setItem('authenticated', JSON.stringify(false));
      location.reload();
      this.uiUserService.logout().subscribe();
      //console.log("logged out")
    }, 30 * 60 * 1000); // 30 Minuten in Millisekunden
  }
}
