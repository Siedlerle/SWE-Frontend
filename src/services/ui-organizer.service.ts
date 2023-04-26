import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";
import {EventSeries} from "../DataTransferObjects/EventSeries";

@Injectable({
  providedIn: 'root'
})
export class UiOrganizerService {

  constructor(private http:HttpClient) { }

  addEvent(event:CustomEvent, emailAddress: string, orgaId: string):Observable<String>{
    return this.http.post<String>(URLs.backend+URLs.createEvent+emailAddress+'/'+orgaId,event);
  }

  changeEvent(event:CustomEvent):Observable<String>{
    return this.http.post<String>(URLs.backend+URLs.changeEvent,event);
  }

  deleteEvent(eventId: number):Observable<String>{
    return this.http.post<String>(URLs.backend+URLs.deleteEvent+eventId,null);
  }

  addEventSeries(startEvent: CustomEvent, eventSeries: EventSeries, emailAddress: string, orgaId: string):Observable<String>{
    const body = {startEvent: startEvent, eventSeries: eventSeries};
    let jsonBody = JSON.stringify(body);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<String>(URLs.backend+URLs.createEventSeres+emailAddress+'/'+orgaId, jsonBody, httpOptions);
  }

  getManagingEvents(emailAddress: string, orgaId: string):Observable<CustomEvent[]> {
    return this.http.post<CustomEvent[]>(URLs.backend+'/organizer/orga/'+orgaId+'/event/managing/get/'+emailAddress, orgaId);
  }
}
