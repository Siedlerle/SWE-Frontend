import {Component, EventEmitter, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {CustomDocument} from "../../DataTransferObjects/CustomDocument";
import {UiTutorService} from "../../services/ui-tutor.service";
import {UiAttendeeService} from "../../services/ui-attendee.service";
import {URLs} from "../../assets/SystemVariables/URLs";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";
import {FormControl} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Question} from "../../DataTransferObjects/Question";
import {QuestionType} from "../../DataTransferObjects/QuestionType";
import {Answer} from "../../DataTransferObjects/Answer";
import {considerSettingUpAutocompletion} from "@angular/cli/src/utilities/completion";
import {Chat} from "../../DataTransferObjects/Chat";
import {Comment} from "../../DataTransferObjects/Comment";

@Component({
  selector: 'app-event-card-tutor',
  templateUrl: './event-card-tutor.component.html',
  styleUrls: ['./event-card-tutor.component.css']
})
export class EventCardTutorComponent {
  @Output() onClose = new EventEmitter<void>();
  closeCard() {
    this.onClose.emit();
  }
  backendURL: string = "";


  eventIsCancelled: boolean;
  eventData: CustomEvent;
  dataSource = new MatTableDataSource<User>();
  displayedColumnsFiles: string[] = ['Filename','Filetype','Filesize','actions'];
  fileDataSource = new MatTableDataSource<CustomDocument>();
  eventDocs: CustomDocument[] = [];

  displayedColumsAttendees:string[] = ['FirstName','LastName','eMail', 'attendence','actions'];
  attendees: User[];
  isAttending:boolean[]=[];

  fileControl: FormControl;
  accept: string;
  color: ThemePalette = 'primary';
  file!: File;

  questions: Question[] = [];
  QuestionType = QuestionType;

  answerString : string[] = [];

  questionsToEvaluate: Question[] = [];
  answersToEvaluate: Answer[] = [];
  allChats: Chat[] = [];
  allComments: Comment[][] = [];
  chatMessage: string;

  answersMatchingToId: Answer[] = [];

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private uiTutorService:UiTutorService, private uiAttendeeService:UiAttendeeService) {
    this.eventData = this.dataService.getCardData();
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    this.getReadableStatus();
    this.backendURL = URLs.backend;
    this.fileControl = new FormControl(this.file)

  }

  ngOnInit() {
    let id = this.eventData.id;
    if (id != null) {
      this.uiAttendeeService.getDocumentsOfEvent(id).subscribe(data => {
        this.eventDocs = data;
        this.fileDataSource.data = this.eventDocs;
      });
      this.uiOrganizerService.getAttendeesForEvent(id).subscribe(response => {
        this.attendees = response;
        this.dataSource.data = this.attendees;
      });
      this.uiTutorService.getAllQuestionsForEvent(id).subscribe(response =>{
        this.questionsToEvaluate = response;
      });
      this.uiTutorService.getAllAnswersForQuestion(id).subscribe(response =>{
        this.answersToEvaluate = response;
      });

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


    this.fileControl.valueChanges.subscribe((file: any) => {
      if (Array.isArray(file)) {
        /*
        files.forEach(function(item) {
          this.service.addDocumentToEvent(this.eventId, item).subscribe(data => {
            console.log(data); // handle the response
          });
        });
        */
      } else {
        this.file = file;
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        if (this.file.size <= 52428800)//
        {
          const id = this.eventData.id;
          if(id != null){
            this.uiTutorService.addDocumentToEvent(id, formData).subscribe(response => {
              location.reload();
            });
          }
        }
        else {
          console.log("Datei zu groß");
        }
      }
    });

  }

  isEditing = false;
  eventName: string ="";
  eventDescription: string = "";
  eventType: string = "";
  eventStartTime: string = "";
  eventEndTime: string = "";
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();
  eventLocation: string = "";
  eventStatus: string = "";
  imageSource: string = "";
  sendChatMessage(message: string){
    const id = this.eventData.id;

    const emailAddress = sessionStorage.getItem('emailAdress');
    if(id != null && emailAddress != null) {
      this.uiTutorService.sendMessage(id, this.chatMessage, emailAddress).subscribe(response =>{

      })
    }
    location.reload();
  }
  removeUser(user: User){
    let eventId = this.eventData.id;
    if ( eventId != null ){
      this.uiOrganizerService.removeUserFromEvent(eventId,user.emailAdress).subscribe(response => {
        this.ngOnInit();
      });

    }
  }


  getFormattedTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  showAddUsertoEvent = false;
  openAddUsertoEvent(){
    this.showAddUsertoEvent = true
  }

  closeAddUsertoEvent(){
    this.showAddUsertoEvent = false
  }


  getReadableStatus() {
    switch (this.eventData.status) {
      case EnumEventStatus.INPREPARATION:
        this.eventStatus = 'In Vorbereitung';
        this.eventIsCancelled = false;
        break;
      case EnumEventStatus.SCHEDULED:
        this.eventStatus = 'Geplant';
        this.eventIsCancelled = false;
        break;
      case EnumEventStatus.RUNNING:
        this.eventStatus = 'In Durchführung';
        this.eventIsCancelled = false;
        break;
      case EnumEventStatus.ACCOMPLISHED:
        this.eventStatus = 'Vergangen';
        this.eventIsCancelled = false;
        break;
      case EnumEventStatus.CANCELLED:
        this.eventStatus = 'abgesagt';
        this.eventIsCancelled = true;
        break;
    }
  }

  getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }
  deleteFile(doc: CustomDocument)
  {
    this.uiTutorService.deleteDocument(doc).subscribe(response =>{
      location.reload();
    });
  }
  bytesToMegabytes(bytes: number): string {
    if(bytes < 1000000){
      let kilobytes = bytes/1024
      return kilobytes.toFixed(2) + " KB"
    }
    let megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  }

  saveAnswer(index: number, question:Question) {
    // @ts-ignore
    question.answerString[index] = this.answerString[index];
  }
  addQuestion() {
    const newQuestion: Question = {
      questionText: '',
      questionType: QuestionType.TEXT,
      answerString: []
    };
    this.questions.push(newQuestion);
  }
  removeQuestion(question: Question): void {
    const index = this.questions.indexOf(question);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }
  submitQuestionaire() {
    const id = this.eventData.id;
    if(id != null){
      this.uiTutorService.addQuestion(id, this.questions).subscribe(response => {
        this.closeCard();
      });
    }
  }

  // @ts-ignore
  getAnswersToQuestion(item:Question){
    for(let i=0; i<this.answersToEvaluate.length;i++){

    }
  }

}
