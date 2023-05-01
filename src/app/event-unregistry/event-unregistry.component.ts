import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {DataService} from "../management/CardService";
import {UiUserService} from "../../services/ui-user.service";
import {URLs} from "../../assets/SystemVariables/URLs";
import {MatTableDataSource} from "@angular/material/table";
import {CustomDocument} from "../../DataTransferObjects/CustomDocument";
import {UiAttendeeService} from "../../services/ui-attendee.service";

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
    if (id != null) {
      this.uiAttendeeService.getDocumentsOfEvent(id).subscribe(data => {
        this.eventDocs = data;
        this.fileDataSource.data = this.eventDocs;
      });
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
}
