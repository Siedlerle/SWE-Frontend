import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";
import {Organisation} from "../DataTransferObjects/Organisation";
import {Group} from "../DataTransferObjects/Group";
import {User} from "../DataTransferObjects/User";

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

  setPersonAdmin(orgaId: string, emailAddress: string) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/user/role/admin', emailAddress);
  }

  setPersonOrganizer(orgaId: string, emailAddress: string) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/user/role/organizer', emailAddress);
  }

  setPersonUser(orgaId: string, emailAddress: string) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/user/role/user', emailAddress);
  }

  changeOrganisation(orga: Organisation, image: File):Observable<String>{
    const formData = new FormData();
    formData.append('organisation', JSON.stringify(orga));
    formData.append('image', image);

    return this.http.post<String>(URLs.backend+'/admin/orga/change', formData);
  }

  changeOrganizerOfEvent(eventId: number, emailAddress: string):Observable<User>{
    return this.http.post<User>(URLs.backend+'/admin/event/'+eventId+'/organizer/change/'+emailAddress, null);
  }

  createGroup(orgaId: string, group: Group) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/group/add', group);
  }

  changeGroup(group: Group) {
    return this.http.post(URLs.backend+'/admin/group/change', group);
  }

  deleteGroup(groupId: number) {
    return this.http.post(URLs.backend+'/admin/group/'+groupId+'/delete', null);
  }

  getGroupsOfOrganisation(orgaId: string):Observable<Group[]> {
    return this.http.post<Group[]>(URLs.backend+'/organizer/organisation/'+orgaId+'/group/get-all', null);
  }

  addUserToGroup(groupId: number, userMail: string) {
    return this.http.post(URLs.backend+'/admin/group/'+groupId+'/user/add', userMail);
  }

  removeUserFromGroup(groupId: number, userMail: string) {
    return this.http.post(URLs.backend+'/admin/group/'+groupId+'/user/'+userMail+'/remove', null);
  }

  getUsersOfOrgaNotInGroup(groupId: number, orgaId: string):Observable<User[]> {
    return this.http.post<User[]>(URLs.backend+'/admin/orga/'+orgaId+'/group/'+groupId+'/user/get-not-in-group', null);
  }

  getAllOrganizersOfOrganisation(orgaId: string):Observable<User[]> {
    return this.http.post<User[]>(URLs.backend+'/admin/orga/'+orgaId+'/organizers/get-all', null);
  }

  getJoinRequestes(orgaId: string):Observable<User[]> {
    return this.http.post<User[]>(URLs.backend+'/admin/orga/'+orgaId+'/get-requests', null);
  }

  acceptJoinRequest(orgaId: string, emailAddress: string) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/user/'+emailAddress+'/accept', null);
  }

  declineJoinRequest(orgaId: string, emailAddress: string) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/user/'+emailAddress+'/decline', null)
  }
}
