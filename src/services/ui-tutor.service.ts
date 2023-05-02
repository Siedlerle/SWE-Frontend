import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, timer} from "rxjs";
import {URLs} from "../assets/SystemVariables/URLs";
import {CustomDocument} from "../DataTransferObjects/CustomDocument";
import {Question} from "../DataTransferObjects/Question";

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
    console.log(question.at(0).questionText);
    // @ts-ignore
    console.log(question.at(0).questionType);
    return this.http.post(URLs.backend+"/tutor/event/"+eventId+"/question/add", question);
  }
}
