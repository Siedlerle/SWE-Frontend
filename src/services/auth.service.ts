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

  constructor(private uiUserService: UiUserService) { }

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
      console.log("logged out")
    }, 30 * 60 * 1000); // 30 Minuten in Millisekunden
  }

  startSendingRequests() {
    const intervalTime = 13 * 60 * 1000; // 13 Minuten in Millisekunden
    const refreshToken = sessionStorage.getItem('refreshToken');
    const timeSinceLastInput = (new Date().getTime() - this.lastInputTime.getTime()) / 1000; // in Sekunden
    if (refreshToken && timeSinceLastInput <= 30 * 60) { // nur starten, wenn nicht länger als 30 Minuten keine Eingabe
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
