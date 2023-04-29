import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";

@Injectable({
  providedIn: 'root'
})
export class UiAdminService {

  constructor(private http:HttpClient) { }

  getEventsofOrganisation(orgaId: string):Observable<CustomEvent[]>{
    return this.http.post<CustomEvent[]>(URLs.backend+'/admin/orga/'+orgaId+'/events',null);
  }

  removeUserFromOrganisation(orgaId: string, emailAddress: string){
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/user/'+emailAddress+'/remove', null);
  }
}
