import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";

@Injectable({
  providedIn: 'root'
})
export class UiOrganizerService {

  constructor(private http:HttpClient) { }

  addEvent(event:CustomEvent, emailAdress: string):Observable<String>{
    return this.http.post<String>(URLs.backend+URLs.createEvent+emailAdress,event);
  }

  changeEvent(event:CustomEvent):Observable<String>{
    return this.http.post<String>(URLs.backend+URLs.changeEvent,event);
  }

  deleteEvent(eventId: number):Observable<String>{
    return this.http.post<String>(URLs.backend+URLs.deleteEvent+eventId,null);
  }
}
