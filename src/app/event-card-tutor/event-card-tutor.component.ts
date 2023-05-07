import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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
import {Chat} from "../../DataTransferObjects/Chat";
import {Comment} from "../../DataTransferObjects/Comment";
import {EventLeaveDialogComponent} from "../event-leave-dialog/event-leave-dialog.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-event-card-tutor',
  templateUrl: './event-card-tutor.component.html',
  styleUrls: ['./event-card-tutor.component.css']
})
export class EventCardTutorComponent implements OnInit, OnDestroy{
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
  isAttending:Boolean[]=[];

  attendeeId: number[]=[];

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
  searchtext = '';

  answersMatchingToId: Answer[] = [];


  documentSubscription!:Subscription;
  attendeeSubscription!:Subscription;
  questionSubscription!:Subscription;
  answerSubscription!: Subscription;
  chatSubscription!:Subscription;

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private uiTutorService:UiTutorService, private uiAttendeeService:UiAttendeeService, private snackBar: MatSnackBar, private dialog: MatDialog) {
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
    this.getReadableStatus();

    let id = this.eventData.id;
    if (id != null) {
      this.documentSubscription = this.uiAttendeeService.getDocumentsOfEvent(id).subscribe(data => {
        this.eventDocs = data;
        this.fileDataSource.data = this.eventDocs;
      });
      this.attendeeSubscription = this.uiOrganizerService.getAttendeesForEvent(id).subscribe(response => {
        this.attendees = response;
        this.dataSource.data = this.attendees;
          for(let i=0; i<this.attendees.length;i++){
            // @ts-ignore
            this.attendeeId[i] = this.attendees.at(i).id;
          }

          if (id != null) {
            this.uiTutorService.getAttendingstatusForUsers(id, this.attendeeId).subscribe(response => {
              this.isAttending = response;
            });
          }
      });
      this.questionSubscription = this.uiTutorService.getAllQuestionsForEvent(id).subscribe(response =>{
        this.questionsToEvaluate = response;
      });
      this.answerSubscription = this.uiTutorService.getAllAnswersForQuestion(id).subscribe(response =>{
        this.answersToEvaluate = response;
      });

      this.chatSubscription = this.uiAttendeeService.getChatForEvent(id).subscribe(response =>{
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
      if (file != undefined || file != null) {
        if (file.size > 52428800) {
          this.snackBar.open("Datei-Größe maximal 50MB. Datei ist nicht hochgeladen worden.", 'Schließen', { duration: 5000 });
          this.fileControl.reset();
        } else {
          this.file = file;
          const formData = new FormData();
          formData.append('file', this.file, this.file.name);
          const id = this.eventData.id;
          if(id != null){
            this.uiTutorService.addDocumentToEvent(id, formData).subscribe(response => {
              //location.reload();
              this.ngOnInit();
            });
          }
        }
      }
    });

  }
  onInputFocus(){
    this.chatSubscription.unsubscribe();
  }
  onInputFocusLost(){
    let id = this.eventData.id;

    if(id!=null){
      this.chatSubscription = this.uiAttendeeService.getChatForEvent(id).subscribe(response => {
        this.allChats = response;
        for (let i = 0; i < this.allChats.length; i++) {

          let chatId: number = response[i].id!;


          this.uiAttendeeService.getCommentsForChat(chatId!, 0).subscribe(data => {

            this.allComments[chatId] = data;
          })
        }
      });
    }
  }
  ngOnDestroy() {
    this.documentSubscription.unsubscribe();
    this.attendeeSubscription.unsubscribe();
    this.answerSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
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

  applyFilter() {
    this.dataSource.filter = this.searchtext.trim().toLowerCase();
  }
  sendChatMessage(){
    const id = this.eventData.id;

    const emailAddress = sessionStorage.getItem('emailAdress');
    if(id != null && emailAddress != null) {
      this.uiTutorService.sendMessage(id, this.chatMessage, emailAddress).subscribe(response =>{
        this.ngOnInit();
        this.chatMessage = "";
      })
    }
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
      //location.reload();
      this.ngOnInit();
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

  onFileSelected(event: any) {
    if(this.fileControl != null){
      this.fileControl.setValue(null);

    }
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
        this.questions = [];
        this.ngOnInit();
      });
    }
  }

  checkAttendingStatus(){
    const id = this.eventData.id;
    if(id != null) {
      this.uiTutorService.changeAttendingStatus(id, this.attendeeId, this.isAttending).subscribe();
    }
  }

  isUserOrganizerOrHimself(user: User): boolean {
    let visible = true;
    const emailAddress = sessionStorage.getItem('emailAdress');

    if (emailAddress === user.emailAdress) {
      visible = false;
    } else {
      visible = true;
    }

    return visible;
  }
}
