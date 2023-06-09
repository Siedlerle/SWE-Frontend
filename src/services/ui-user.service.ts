import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../DataTransferObjects/User";
import {URLs} from "../assets/SystemVariables/URLs";
import {Observable} from "rxjs";
import {Organisation} from "../DataTransferObjects/Organisation";
import {AuthService} from "./auth.service";
import {OrgaRole} from "../DataTransferObjects/OrgaRole";
import {CustomEvent} from "../DataTransferObjects/CustomEvent";
import {C} from "@angular/cdk/keycodes";
import {EventRole} from "../DataTransferObjects/EventRole";


@Injectable({
  providedIn: 'root'
})
export class UiUserService {

    constructor(private http:HttpClient) {
    }


    //Authentifizierung
    register(newUser : User):Observable<any>{
      return this.http.post<any>(URLs.backend+URLs.register,newUser);
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

    /*refresh():Observable<any>{
      return this.http.post<any>(URLs.backend+URLs.refresh, null, { responseType: 'json'});
    }*/



    //User
    getUserInformation(emailAdress: string):Observable<User>{
      return this.http.post<User>(URLs.backend+URLs.getInfo+emailAdress, null);
    }

    changePassword(){
      return this.http.post(URLs.backend+URLs.resetPWD, null);
    }

    deleteUser(emailAdress: string){
      return this.http.post(URLs.backend+URLs.delete+emailAdress, null);
    }

    resetPassword( user: User):Observable<any>{
      return this.http.post<any>(URLs.backend+URLs.resetPWD, user);
    }


    //Organisation
    getAllOrganisations():Observable<Organisation[]>{
      return this.http.post<Organisation[]>(URLs.backend+URLs.getAllOrganisations,null);
    }

    getOrganisation(orgaId: string):Observable<Organisation>{
      return this.http.post<Organisation>(URLs.backend+URLs.getOrganisation+orgaId,null);
    }

    getOrganisationForUser(emailAdress: string):Observable<Organisation[]>{
      return this.http.post<Organisation[]>(URLs.backend+URLs.getOrganisationForUser+emailAdress,null);
    }

    getRoleForUserInOrga(orgaId: number, emailAdress: string):Observable<OrgaRole>{
      return this.http.post<OrgaRole>(URLs.backend+'/user/orga/'+orgaId+'/get-role-for-user/'+emailAdress,null);
    }

    getOrganisationInvitations(emailAddess: string):Observable<Organisation[]>{
      return this.http.post<Organisation[]>(URLs.backend+URLs.getOrgaInvitationsForUser+emailAddess, null);
    }

    requestJoin(orgaId: number, emailAdress:string){
      return this.http.post(URLs.backend+'/user/orga/'+orgaId+'/request-join/'+emailAdress,null);
    }

    acceptOrganisationInvitation(orgaId: number, emailAdress: string){
      return this.http.post(URLs.backend+'/user/orga/'+orgaId+'/accept-invitation/'+emailAdress,null);
    }

    declineOrganisationInvitation(orgaId: number, emailAdress: string){
      return this.http.post(URLs.backend+'/user/orga/'+orgaId+'/decline-invitation/'+emailAdress,null);
    }

    leaveOrganisation(orgaId: number, emailAdress: string){
      return this.http.post(URLs.backend+'/user/orga/'+orgaId+'/leave/'+emailAdress, null);
    }

    //Events
    getAllEvents(emailAdress: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+URLs.getAllEventsForUser+emailAdress, null);
    }

    getAllRegisteredEvents(emailAdress: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+URLs.getRegisteredEventsForUser+emailAdress,null);
    }

    getRegisteredEventsInOrganisation(emailAdress: string, orgaId: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+'/user/orga/'+orgaId+'/event/get-registered/'+emailAdress,null);
    }

    getAllEventInvitations(emailAddress: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+URLs.getEventInvitationsForUser+emailAddress,null);
    }

    getAllEventInvitationsForUserInOrga(orgaId: string, emailAdress: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+"/user/orga/"+orgaId+"/event/get-invitations/"+emailAdress, null);
    }

    getAllVisibleNoRegisteredEventsInOrganisation(emailAddress: string, orgaId: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+'/user/orga/'+orgaId+'/event/get-available-events/'+emailAddress, null);
    }

    acceptEventInvitation(eventId:number, emailAddress:string){
      return this.http.post(URLs.backend+'/user/event/'+eventId+'/accept-invitation/'+emailAddress,null);
    }

    declineEventInvitation(eventId:number, emailAddress:string){
      return this.http.post(URLs.backend+'/user/event/'+eventId+'/decline-invitation/'+emailAddress,null);
    }

    registerForEvent(eventId: number, emailAddress: string){
      return this.http.post(URLs.backend+'/user/event/'+eventId+'/register/'+emailAddress, null);
    }

    unregisterFromEvent(eventId: number, emailAddress: string, feedback: string){
      return this.http.post(URLs.backend+'/user/event/'+eventId+'/unregister/'+emailAddress, feedback);
    }

    getRoleInEvent(eventId: number, emailAddress: string):Observable<EventRole>{
      return this.http.post<EventRole>(URLs.backend+"/user/event/"+eventId+"/get-role/"+emailAddress,null);
    }

    getOrganizerOfEvent(eventId: number):Observable<User> {
      return this.http.post<User>(URLs.backend+'/user/event/'+eventId+'/get-organizer', null)
    }
}
