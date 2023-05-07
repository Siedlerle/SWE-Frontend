import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, switchMap, timer} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomDocument} from "../DataTransferObjects/CustomDocument";
import {Question} from "../DataTransferObjects/Question";
import {Answer} from "../DataTransferObjects/Answer";
import {User} from "../DataTransferObjects/User";
import {Chat} from "../DataTransferObjects/Chat";

@Injectable({
  providedIn: 'root'
})
export class UiTutorService {

  constructor(private http:HttpClient) { }

  addDocumentToEvent(eventId: number, formData: FormData):Observable<CustomDocument>{
    return this.http.post<CustomDocument>(URLs.backend+"/tutor/event/"+eventId+"/file/upload",formData);
  }

  deleteDocument(doc: CustomDocument): Observable<CustomDocument> {
    return this.http.post<CustomDocument>(URLs.backend+"/tutor/event/file/"+doc.id+"/delete", doc);
  }

  addQuestion(eventId:number, question:Question[]){
    // @ts-ignore
    //console.log(question.at(0).questionText);
    // @ts-ignore
    //console.log(question.at(0).questionType);
    return this.http.post(URLs.backend+"/tutor/event/"+eventId+"/question/add", question);
  }

  getAllQuestionsForEvent(eventId: number):Observable<Question[]>{
    return timer(0,10000).pipe(
      switchMap(()=> this.http.post<Question[]>(URLs.backend+"/tutor/event/"+eventId+"/question-all",null))
    );
  }

  getAllAnswersForQuestion(eventId: number):Observable<Answer[]>{
    return timer(0,10000).pipe(
      switchMap(()=> this.http.post<Answer[]>(URLs.backend+"/tutor/event/"+eventId+"/question-answers",null))
    );
  }

  sendMessage(eventId : number, message: string, email: string){

    return this.http.post(URLs.backend+"/tutor/event/"+eventId+"/chat/add/"+email, message);
  }

  getAttendingstatusForUsers(eventId: number, userIds:number[]):Observable<Boolean[]>{
    return this.http.post<Boolean[]>(URLs.backend+"/tutor/event/"+eventId+"/attendees/get-status", userIds);
  }

  changeAttendingStatus(eventId: number, userIds:number[], attending:Boolean[]){
    const formData = new FormData();
    // @ts-ignore
    formData.append('userIds', userIds);
    // @ts-ignore
    formData.append('attending', attending);
    return this.http.post(URLs.backend+"/tutor/event/"+eventId+"/attendees/update-status",formData);
  }
}
