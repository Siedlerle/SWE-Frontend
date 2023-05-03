import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, timer} from "rxjs";
import {CustomDocument} from "../DataTransferObjects/CustomDocument";
import {URLs} from "../assets/SystemVariables/URLs";
import {Question} from "../DataTransferObjects/Question";
import {Answer} from "../DataTransferObjects/Answer";

@Injectable({
  providedIn: 'root'
})
export class UiAttendeeService {

  constructor(private http:HttpClient) { }

  getDocumentsOfEvent(eventId: number): Observable<CustomDocument[]> {
    return this.http.post<CustomDocument[]>(URLs.backend+URLs.getFiles+eventId, null);
  }

  downloadDocument(uri: string, fileName: string):Observable<any> {
    console.log(uri)
    let queryParams = new HttpParams();
    queryParams = queryParams.append("uri", uri);
    queryParams = queryParams.append("filename", fileName);

    return this.http.post(URLs.backend+URLs.downloadFile, null,{ responseType: 'blob', params: queryParams });
  }

  getSurveyForEvent(eventId:number, emailAdress:string):Observable<Question[]>{
    return this.http.post<Question[]>(URLs.backend+"/attendee/get-survey/"+eventId+"/"+emailAdress,null);
  }

  submitSurvey(emailAdress: string, answers:Answer[]){
    return this.http.post(URLs.backend+URLs.answerSurvey+emailAdress,answers);
  }
}
