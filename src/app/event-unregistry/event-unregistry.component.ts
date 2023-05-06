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
import {Chat} from "../../DataTransferObjects/Chat";
import {Comment} from "../../DataTransferObjects/Comment";
import {EventDeleteDialogComponent} from "../event-delete-dialog/event-delete-dialog.component";
import {EventLeaveDialogComponent} from "../event-leave-dialog/event-leave-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";

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
  commentMessage: string;

  QuestionType = QuestionType;
  questions: Question[] = [];
  eventStatus: string = "";
  answer:string;
  answers: Answer[] = [];
  allChats: Chat[] = [];
  allComments: Comment[][] = [];

  constructor(private dataService: DataService, private uiUserService:UiUserService, private uiAttendeeService:UiAttendeeService,private dialog: MatDialog )  {
    this.eventData = this.dataService.getCardData();
    this.getReadableStatus();
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
      this.uiAttendeeService.getChatForEvent(id).subscribe(response =>{
        this.allChats = response;
        for(let i = 0; i < this.allChats.length; i++){

          let chatId : number = response[i].id!;


          this.uiAttendeeService.getCommentsForChat(chatId!, 0).subscribe(data =>{

            this.allComments[chatId] = data;
          })
        }
      })
    }
  }

  sendComment(chatId: number, message: string){
    const id = this.eventData.id;
    const emailAddress = sessionStorage.getItem('emailAdress');

    if(id != null && chatId != null && emailAddress != null) {
      this.uiAttendeeService.commentOnChat(chatId, message, emailAddress).subscribe(response =>{
        this.commentMessage = "";
        this.ngOnInit();
      })
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
    const dialogRef = this.dialog.open(EventLeaveDialogComponent, {
      width: '20vw',
      height:'20vw',
      data: {eventName: this.eventData.name, eventID: this.eventData.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
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

  getReadableStatus() {
    switch (this.eventData.status) {
      case EnumEventStatus.INPREPARATION:
        this.eventStatus = 'In Vorbereitung';
        break;
      case EnumEventStatus.SCHEDULED:
        this.eventStatus = 'Geplant';
        break;
      case EnumEventStatus.RUNNING:
        this.eventStatus = 'In Durchführung';
        break;
      case EnumEventStatus.ACCOMPLISHED:
        this.eventStatus = 'Vergangen';
        break;
      case EnumEventStatus.CANCELLED:
        this.eventStatus = 'abgesagt';
        break;
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

  areAllQuestionsAnswered(): boolean {
    for (const answer of this.answers) {
      if (!answer.text) {
        return false;
      }
    }
    return true;
  }

  submitSurvey(){
    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null){
      this.uiAttendeeService.submitSurvey(emailAdress, this.answers).subscribe(response=>{
        this.ngOnInit();
      });

    }
  }
}
