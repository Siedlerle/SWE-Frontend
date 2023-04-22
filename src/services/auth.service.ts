import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  get token(){
    return sessionStorage.getItem('accessToken');
  }

}
