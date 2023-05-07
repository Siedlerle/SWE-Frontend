import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, switchMap, timer} from "rxjs";
import {CustomDocument} from "../DataTransferObjects/CustomDocument";
import {URLs} from "../assets/SystemVariables/URLs";
import {Question} from "../DataTransferObjects/Question";
import {Answer} from "../DataTransferObjects/Answer";
import {Chat} from "../DataTransferObjects/Chat";
import {Comment} from "../DataTransferObjects/Comment";

@Injectable({
  providedIn: 'root'
})
export class UiAttendeeService {

  constructor(private http:HttpClient) { }

  getDocumentsOfEvent(eventId: number | undefined): Observable<CustomDocument[]> {
    return timer(0,10000).pipe(
      switchMap(()=> this.http.post<CustomDocument[]>(URLs.backend+URLs.getFiles+eventId, null))
    );
  }

  downloadDocument(uri: string, fileName: string):Observable<any> {
    console.log(uri)
    let queryParams = new HttpParams();
    queryParams = queryParams.append("uri", uri);
    queryParams = queryParams.append("filename", fileName);

    return this.http.post(URLs.backend+URLs.downloadFile, null,{ responseType: 'blob', params: queryParams });
  }

  getSurveyForEvent(eventId: number | undefined, emailAdress: string):Observable<Question[]>{
    return timer(0,10000).pipe(
      switchMap(()=> this.http.post<Question[]>(URLs.backend+"/attendee/get-survey/"+eventId+"/"+emailAdress,null))
    );
  }

  submitSurvey(emailAdress: string, answers:Answer[]){
    return this.http.post(URLs.backend+URLs.answerSurvey+emailAdress,answers);
  }

  getChatForEvent(eventId: number | undefined):Observable<Chat[]>{
    return timer(0,10000).pipe(
      switchMap(()=> this.http.post<Chat[]>(URLs.backend+"/attendee/get-chat/"+eventId, null))
    );
  }

  getCommentsForChat(chatId: number, userId: number):Observable<Comment[]>{
    return this.http.post<Comment[]>(URLs.backend+"/attendee/get-comment-on-chat/"+chatId+"/"+userId, null);
  }

  commentOnChat(chatId: number, text: string, userEmail: string){
    return this.http.post(URLs.backend+"/attendee/comment-on-chat/"+chatId+"/"+userEmail, text);
  }
}
