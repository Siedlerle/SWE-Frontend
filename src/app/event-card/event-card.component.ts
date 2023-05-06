import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../management/CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {User} from "../../DataTransferObjects/User";
import {QuestionType} from "../../DataTransferObjects/QuestionType";
import {MatTableDataSource} from "@angular/material/table";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {FormControl, NgForm} from "@angular/forms";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventDeleteDialogComponent} from "../event-delete-dialog/event-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {URLs} from "../../assets/SystemVariables/URLs";
import {UiTutorService} from "../../services/ui-tutor.service";
import {CustomDocument} from "../../DataTransferObjects/CustomDocument";
import {UiAttendeeService} from "../../services/ui-attendee.service";
import {Question} from "../../DataTransferObjects/Question";
import {EnumEventRole} from "../../DataTransferObjects/EnumEventRole";
import {UiUserService} from "../../services/ui-user.service";
import {Chat} from "../../DataTransferObjects/Chat";
import {Comment} from "../../DataTransferObjects/Comment";
import {ThemePalette} from "@angular/material/core";
import {CancelEventConfirmDialogComponent} from "../cancel-event-confirm-dialog/cancel-event-confirm-dialog.component";
import {Event} from "@angular/router";
import {Answer} from "../../DataTransferObjects/Answer";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  eventIsCancelled: boolean;
  eventData: CustomEvent;
  dataSource = new MatTableDataSource<User>();
  fileDataSource = new MatTableDataSource<CustomDocument>();
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  displayedDocumentColumns: string[] = ['Filename', 'Filetype', 'Filesize', 'actions'];
  attendees: User[];
  backendURL: string = "";
  newEventImage!: File;
  newEventImageControl: FormControl;
  color: ThemePalette = 'primary';
  accept!: string;
  fileControl = new FormControl();
  file!: File;
  eventDocs: CustomDocument[] = [];
  isAdmin: boolean;

  questions: Question[] = [];
  QuestionType = QuestionType;

  answerString : string[] = [];

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
  chatMessage: string;
  allChats: Chat[] = [];
  chat: Chat;

  allComments: Comment [][] = [];

  attendeeRoleMap: {[key:number]:boolean} = {};

  questionsToEvaluate: Question[] = [];
  answersToEvaluate: Answer[] = [];


  searchText = '';

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private uiTutorService:UiTutorService, private uiAttendeeService:UiAttendeeService, private uiUserService: UiUserService, private snackBar: MatSnackBar,private dialog: MatDialog) {
    this.eventData = Object.assign({},this.dataService.getCardData());
    this.eventStartDate = new Date(this.eventData.startDate);
    this.eventEndDate = new Date(this.eventData.endDate);
    if (this.eventData.image == null) {
      this.imageSource = "../../assets/images/OrgaBanner.png";
    } else {
      this.imageSource = this.eventData.image;
    }
    this.getReadableStatus();
    this.backendURL = URLs.backend;
    this.newEventImageControl = new FormControl(this.file)

    const orgaRole = sessionStorage.getItem('orgaRole');
    if (orgaRole === "ADMIN") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
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
        if(this.attendees){
          for(let i=0; i<this.attendees.length; i++){
            const emailAdress = this.attendees[i].emailAdress;
            if (id != null && emailAdress != null) {
              this.uiUserService.getRoleInEvent(id, emailAdress).subscribe(response => {
                if (response.role === EnumEventRole.TUTOR) {
                  // @ts-ignore
                  this.attendeeRoleMap[this.attendees.at(i).id]=true;
                } else {
                  // @ts-ignore
                  this.attendeeRoleMap[this.attendees.at(i).id] = false;
                }
              });
            }
          }
        }
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

    this.newEventImageControl.valueChanges.subscribe((file: any) => {
      if (file != undefined || file != null) {
        if (file.size > 1048576) {
          this.snackBar.open("Image-Größe maximal 1MB. Bild ist nicht hochgeladen worden.", 'Schließen', { duration: 5000 });
          this.newEventImageControl.reset();
        } else {
          this.newEventImage = file;
        }
      }
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }


  sendChatMessage(){
    const id = this.eventData.id;

    const emailAddress = sessionStorage.getItem('emailAdress');
    if(id != null && emailAddress != null) {
      this.uiTutorService.sendMessage(id, this.chatMessage, emailAddress).subscribe(response =>{
        this.ngOnInit();
        this.chatMessage = "";
      });
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

  onSave() {
    // save edited data and exit editing mode
    this.eventData.name = this.eventName;
    this.eventData.description = this.eventDescription;
    this.isEditing = false;
  }
  onCancel() {
    // discard changes and exit editing mode
    this.isEditing = false;
  }

  showChangeOrganizerOfEvent = false;
  openChangeOrganizerOfEvent(){
    this.showChangeOrganizerOfEvent = true;
  }
  closeChangeOrganizerOfEvent(){
    this.showChangeOrganizerOfEvent = false;
  }

  showAddUsertoEvent = false;
  openAddUsertoEvent(){
     this.showAddUsertoEvent = true
  }

  closeAddUsertoEvent(){
    this.showAddUsertoEvent = false
  }

  onChangeEvent(form: NgForm) {
    const dayTime = new Date();
    const startTime = this.getDate(this.eventData.startDate, this.eventData.startTime);
    const endTime = this.getDate(this.eventData.endDate, this.eventData.endTime);
    if (startTime > endTime) {
      this.snackBar.open("Startzeitpunkt liegt nach Endzeitpunkt. Event wird nicht erstellt.", 'Schließen', { duration: 5000 });
      return;
    } else if (startTime < dayTime) {
      this.snackBar.open("Startzeitpunkt liegt vor jetzigem Zeitpunkt. Event wird nicht erstellt.", 'Schließen', { duration: 5000 });
      return;
    }

    this.uiOrganizerService.changeEvent(this.eventData, this.newEventImage).subscribe(response => {
      const text = response.message;
      if (text === "Event changed successfully") {
        this.snackBar.open("Event erfolgreich geändert", 'Schließen', { duration: 10000 });
        location.reload()
      } else {
        this.snackBar.open("Änderung des Events fehlgeschlagen", 'Schließen', { duration: 10000 });
      }
    });

  }

  getDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0);
    return newDate;
  }

  cancelEvent(event: CustomEvent) {
    const dialogRef = this.dialog.open(CancelEventConfirmDialogComponent, {
      width: '20vw',
      height:'20vw',
      data: {eventName: event.name, eventID: event.id, status: this.eventData.status}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getReadableStatus();
      location.reload();
    });
  }

  deleteEvent(event: CustomEvent) {
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '250px',
      data: {eventName: event.name, eventID: event.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  withDrawCancelEvent() {
    if (this.eventData.id != null) {
      let newStatus = EnumEventStatus.SCHEDULED.toString();
      console.log(newStatus);
      this.uiOrganizerService.changeStatusOfEvent(this.eventData.id, newStatus).subscribe(response => {
        this.eventData.status = EnumEventStatus.SCHEDULED;
        this.getReadableStatus();
      })
    }
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

  removeTutor(user: User){
    const id = this.eventData.id;
    const emailAdress = user.emailAdress;
    if(id!= null)
    this.uiOrganizerService.changeTutorToAttendee(id, emailAdress).subscribe(response =>{
      this.closeCard();
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

  deleteFile(doc: CustomDocument)
  {
    this.uiTutorService.deleteDocument(doc).subscribe(response =>{
      //location.reload();
      this.ngOnInit();
    });
  }
  onFileSelected(event: any) {
    if(this.fileControl != null){
      this.fileControl.setValue(null);

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
      console.log(index)
      this.questions.splice(index, 1);
      this.answerString = [];
    }
  }

  submitQuestionaire() {
    const id = this.eventData.id;
    if(id != null){
      this.uiTutorService.addQuestion(id, this.questions).subscribe(response => {
        this.answerString = [];
        this.questions = [];
        this.ngOnInit();
      });
    }
  }


  deleteChoice(question:Question, answerIndex: number){
    question.answerString!.splice(answerIndex, 1);
    this.answerString.splice(answerIndex,1);
  }
  closeCard() {
    this.isEditing = false;
    this.onClose.emit();
  }
}

