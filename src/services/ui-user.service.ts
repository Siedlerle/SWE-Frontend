import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../DataTransferObjects/User";
import {URLs} from "../assets/SystemVariables/URLs";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UiUserService {

    constructor(private http:HttpClient) {
    }

    register(newUser : User){
      return this.http.post(URLs.backend+URLs.register,newUser,{responseType:'text'});
    }

    login(newUser : User):Observable<any>{
      return this.http.post<any>(URLs.backend+URLs.login, newUser, { responseType: 'json'});
    }
}
