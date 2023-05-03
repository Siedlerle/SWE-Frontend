import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {DataService} from "../management/CardService";
import {UiUserService} from "../../services/ui-user.service";
import {URLs} from "../../assets/SystemVariables/URLs";
import {MatTableDataSource} from "@angular/material/table";
import {CustomDocument} from "../../DataTransferObjects/CustomDocument";
import {UiAttendeeService} from "../../services/ui-attendee.service";
import {Question} from "../../DataTransferObjects/Question";
import {QuestionType} from "../../DataTransferObjects/QuestionType";
import {Answer} from "../../DataTransferObjects/Answer";

@Component({
  selector: 'app-event-unregistry',
  templateUrl: './event-unregistry.component.html',
  styleUrls: ['./event-unregistry.component.css']
})
export class EventUnregistryComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  eventData: CustomEvent;
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();

  imageSource: string = "";
  backendURL: string = "";
  fileDataSource = new MatTableDataSource<CustomDocument>();
  eventDocs: CustomDocument[] = [];
  displayedDocumentColumns: string[] = ['Filename', 'Filetype', 'Filesize', 'actions'];


  QuestionType = QuestionType;
  questions: Question[] = [];

  answer:string;
  answers: Answer[] = [];

  constructor(private dataService: DataService, private uiUserService:UiUserService, private uiAttendeeService:UiAttendeeService )  {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    this.backendURL = URLs.backend;
  }

  ngOnInit() {
    let id = this.eventData.id;
    const emailAdress = sessionStorage.getItem('emailAdress');
    if (id != null) {
      this.uiAttendeeService.getDocumentsOfEvent(id).subscribe(data => {
        this.eventDocs = data;
        this.fileDataSource.data = this.eventDocs;
      });

      if(emailAdress != null){
        this.uiAttendeeService.getSurveyForEvent(id,emailAdress).subscribe(response => {
          this.questions = response;
          let a: Answer;
          for(let q=0; q<this.questions.length; q++){
            a={
              question: this.questions.at(q)!,
            }
            this.answers.push(a);
          }
        });
      }
    }
  }

  mapStringToEnum(value: string): QuestionType | null {
    switch(value) {
      case 'MULTIPLECHOICE': return QuestionType.MULTIPLECHOICE;
      case 'TEXT': return QuestionType.TEXT;
      default: return null;
    }
  }

  closeRegistryCard() {
    this.onClose.emit();
  }

  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  unregisterFromEvent(){
    const emailAddress = sessionStorage.getItem('emailAdress');
    if(emailAddress != null && this.eventData.id != null){
      this.uiUserService.unregisterFromEvent(this.eventData.id, emailAddress).subscribe(response =>{
        this.closeRegistryCard();
        location.reload();
      });

    }
  }
  getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  downloadFile(doc: CustomDocument)
  {
    let uri = doc.downloadUri;
    if(uri != null){
      this.uiAttendeeService.downloadDocument(uri, doc.name).subscribe(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  }

  bytesToMegabytes(bytes: number): string {
    if(bytes < 1000000){
      let kilobytes = bytes/1024
      return kilobytes.toFixed(2) + " KB"
    }
    let megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  }

  submitSurvey(){
    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null){
      this.uiAttendeeService.submitSurvey(emailAdress, this.answers).subscribe(response=>{
        this.closeRegistryCard();
      });

    }
  }
}
