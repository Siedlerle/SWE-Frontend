import {HostListener, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {UiUserService} from "./ui-user.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private inactivityTimeout: any;
  private intervalHandler: any;


  constructor(private uiUserService: UiUserService) { }

  getToken(){
    return sessionStorage.getItem('accessToken')||'';
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  resetTimeout() {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      clearInterval(this.intervalHandler);
      this.uiUserService.logout();
      sessionStorage.setItem('authenticated', JSON.stringify(false));
      location.reload();
    }, 1 * 60 * 1000); // 30 Minuten in Millisekunden
  }

  startSendingRequests() {
    const intervalTime = 13 * 60 * 1000; // 13 Minuten in Millisekunden
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (refreshToken) {
      this.intervalHandler = interval(intervalTime).subscribe(() => {
        this.uiUserService.refresh().subscribe(response => {
          if (typeof response === 'object' && response !== null) {
            const accessToken = response.access_token;
            const refreshToken = response.refresh_token;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
          }
        }, error => {
          console.error('HTTP request error', error);
        });
        this.resetTimeout();
      });
    }
  }


}
