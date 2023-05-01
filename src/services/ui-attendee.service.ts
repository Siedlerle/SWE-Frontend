import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, timer} from "rxjs";
import {CustomDocument} from "../DataTransferObjects/CustomDocument";
import {URLs} from "../assets/SystemVariables/URLs";

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
}
