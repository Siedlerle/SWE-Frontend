import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../DataTransferObjects/User";
import {URLs} from "../assets/SystemVariables/URLs";
import {Observable} from "rxjs";
import {Organization} from "../DataTransferObjects/Organization";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class UiUserService {

    constructor(private http:HttpClient, private authService: AuthService) {
    }

    register(newUser : User){
      return this.http.post(URLs.backend+URLs.register,newUser,{responseType:'text'});
    }

    login(newUser : User):Observable<any>{
      return this.http.post<any>(URLs.backend+URLs.login, newUser, { responseType: 'json'});
    }

    logout(){
      return this.http.get(URLs.backend+URLs.logout);
    }

    verify(authToken: string):Observable<any>{
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('authToken', authToken);
      return this.http.post<any>(URLs.backend+URLs.verify,null,{ headers:headers, params: params});
    }

    getAllOrganisations():Observable<Organization[]>{
      return this.http.post<Organization[]>(URLs.backend+URLs.getAllOrganisations,null);
    }
}
