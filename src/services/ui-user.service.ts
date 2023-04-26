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


@Injectable({
  providedIn: 'root'
})
export class UiUserService {

    constructor(private http:HttpClient) {
    }


    //Authentifizierung
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



    //Organisation
    getAllOrganisations():Observable<Organisation[]>{
      return this.http.post<Organisation[]>(URLs.backend+URLs.getAllOrganisations,null);
    }

    getOrganisation(orgaId: number):Observable<Organisation>{
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


    //Events
    getAllEvents(emailAdress: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+URLs.getAllEventsForUser+emailAdress, null);
    }

    getRegisteredEventsInOrganisation(emailAdress: string, orgaId: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+'/user/orga/'+orgaId+'/event/get-registered/'+emailAdress,null);
    }

    getEventInvitations(emailAddress: string, orgaId: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+URLs.getEventInvitationsForUser+emailAddress,orgaId);
    }

    getAllVisibleNoRegisteredEventsInOrganisation(emailAddress: string, orgaId: string):Observable<CustomEvent[]>{
      return this.http.post<CustomEvent[]>(URLs.backend+'/user/orga/'+orgaId+'/event/get-available-events/'+emailAddress, null);
    }
}
