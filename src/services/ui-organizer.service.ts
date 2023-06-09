import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, switchMap, timer} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";
import {EventSeries} from "../DataTransferObjects/EventSeries";
import {C} from "@angular/cdk/keycodes";
import {User} from "../DataTransferObjects/User";
import {Form} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {Group} from "../DataTransferObjects/Group";
import {Preset} from "../DataTransferObjects/Preset";
import {Answer} from "../DataTransferObjects/Answer";

@Injectable({
  providedIn: 'root'
})
export class UiOrganizerService {

  constructor(private http:HttpClient) { }

  addEvent(event:CustomEvent, emailAddress: string, orgaId: string, image: File):Observable<String>{
    const formData = new FormData();
    formData.append('event', JSON.stringify(event));
    formData.append('image', image);

    return this.http.post<String>(URLs.backend+URLs.createEvent+emailAddress+'/'+orgaId, formData);
  }

  changeEvent(event:CustomEvent, image: File):Observable<any>{
    const formData = new FormData();
    formData.append('event', JSON.stringify(event));
    formData.append('image', image);

    return this.http.post<any>(URLs.backend+URLs.changeEvent,formData);
  }

  cancelEvent(eventId: number, reason: string):Observable<String>{
    return this.http.post<String>(URLs.backend+'/organizer/event/'+eventId+'/cancel', reason);
  }

  deleteEvent(eventId: number):Observable<any>{
    return this.http.post<any>(URLs.backend+URLs.deleteEvent+eventId,null);
  }

  changeStatusOfEvent(eventId: number, status: string) {
    return this.http.post<String>(URLs.backend+'/organizer/event/'+eventId+'/status/change',status);
  }

  addEventSeries(startEvent: CustomEvent, eventSeries: EventSeries, emailAddress: string, orgaId: string, image: File):Observable<String>{
    const formData = new FormData();
    formData.append('event', JSON.stringify(startEvent));
    formData.append('eventseries', JSON.stringify(eventSeries));
    formData.append('image', image);

    return this.http.post<String>(URLs.backend+URLs.createEventSeres+emailAddress+'/'+orgaId, formData);
  }

  getPresetsFromOrganisation(orgaId: string): Observable<Preset[]> {
    return this.http.post<Preset[]>(URLs.backend+URLs.getPresetsFromOrga+orgaId, null)
  }

  addPreset(preset: Preset, orgaId: string, image: File): Observable<String> {
    const formData = new FormData();
    formData.append('preset', JSON.stringify(preset));
    formData.append('image', image);

    return this.http.post<String>(URLs.backend+URLs.createPreset+orgaId, formData);
  }

  changePreset(preset: Preset, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('preset', JSON.stringify(preset));
    formData.append('image', image);

    return this.http.post<any>(URLs.backend+URLs.changePreset, formData);
  }

  deletePreset(presetId: number) {
    return this.http.post(URLs.backend+URLs.deletePreset+presetId, null);
  }

  getManagingEvents(emailAddress: string, orgaId: string):Observable<CustomEvent[]> {
    return this.http.post<CustomEvent[]>(URLs.backend+'/organizer/orga/'+orgaId+'/event/managing/get/'+emailAddress, orgaId);
  }

  getUnafiliatedUsersForEvent(event: CustomEvent):Observable<User[]>{
    return this.http.post<User[]>(URLs.backend+URLs.getUnafiliatedUsers,event);
  }

  getUnafiliatedGroupsForEvent(event: CustomEvent):Observable<Group[]>{
    return this.http.post<Group[]>(URLs.backend+URLs.getUnafiliatedGroups, event);
  }

  getAttendeesForEvent(eventId: number):Observable<User[]> {
    return timer(0,10000).pipe(
      switchMap(()=> this.http.post<User[]>(URLs.backend+'/tutor/event/'+eventId+'/attendees/get-all',null))
    );
  }

  getAllUsersInOrganisation(orgaId: string):Observable<User[]>{
    return timer(0,120000).pipe(
      switchMap(()=> this.http.post<User[]>(URLs.backend+'/organizer/organisation/'+orgaId+'/user/get-all',null))
    );
  }
  inviteUserToEvent(eventId: number, emailAddress: string){
    return this.http.post(URLs.backend+'/organizer/event/'+eventId+'/user/'+emailAddress+'/invite', null);
  }

  inviteTutorToEvent(eventId: number, emailAddress: string){
    return this.http.post(URLs.backend+'/organizer/event/'+eventId+'/tutor/'+emailAddress+'/invite', null);
  }

  inviteGroupToEvent(eventId: number, groupId: number){
    return this.http.post(URLs.backend+'/organizer/event/'+eventId+'/group/'+groupId+'/invite', null);
  }

  inviteUserToOrganisation(orgaId: string, emailAddress: string){
    return this.http.post(URLs.backend+'/organizer/organisation/' + orgaId + '/user/' + emailAddress + '/invite',null);
  }

  inviteExternToEvent(eventId: number, emailAdress:string){
    return this.http.post(URLs.backend+"/organizer/event/"+eventId+"/extern/"+emailAdress+"/invite",null);
  }

  removeUserFromEvent(eventId: number, emailAddress:string){
    return this.http.post(URLs.backend+'/organizer/event/'+eventId+'/attendee/'+emailAddress+'/remove',null);
  }

  changeTutorToAttendee(eventId: number, emailAddress: string){
    return this.http.post(URLs.backend+'/organizer/event/'+eventId+'/attendee/'+emailAddress+'/set-attendee',null);
  }

  getUsersOfGroup(groupId: number):Observable<User[]> {
    return this.http.post<User[]>(URLs.backend+'/organizer/group/'+groupId+'/users/get-all', null)
  }

}
