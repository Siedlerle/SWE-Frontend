import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";
import {Organisation} from "../DataTransferObjects/Organisation";
import {Group} from "../DataTransferObjects/Group";

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

  createGroup(orgaId: string, group: Group) {
    return this.http.post(URLs.backend+'/admin/orga/'+orgaId+'/group/add', group);
  }

  getGroupsOfOrganisation(orgaId: string):Observable<Group[]> {
    return this.http.post<Group[]>(URLs.backend+'/organizer/organisation/'+orgaId+'/group/get-all', null);
  }
}
