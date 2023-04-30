import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";
import {DataService} from "../management/CardService";
import {URLs} from "../../assets/SystemVariables/URLs";

@Component({
  selector: 'app-event-catalog',
  templateUrl: './event-catalog.component.html',
  styleUrls: ['./event-catalog.component.css']
})
export class EventCatalogComponent implements OnInit {

  availableEvents: CustomEvent[];
  @ViewChild('searchbar') searchbar: ElementRef;
  eventSearchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  backendURL: string = "";
  toggleSearch: boolean = false;

  constructor(private dataService: DataService,private uiUserService: UiUserService) {
    this.backendURL = URLs.backend;
  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    if (emailAddress != null && orgaId != null && orgaId!=='') {
      this.uiUserService.getAllVisibleNoRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.availableEvents = response;
        this.availableEvents.forEach(function (event) {
          if (event.image == null) {
            event.image = "../../assets/images/OrgaBanner.png";
          }
        });
      });
    }else if(emailAddress != null && orgaId == null && orgaId===''){
      this.uiUserService.getAllEvents(emailAddress).subscribe(response =>{
        this.availableEvents = response;
      });
      this.availableEvents.forEach(function (event) {
        if (event.image == null) {
          event.image = "../../assets/images/OrgaBanner.png";
        }
      });
    }
  }

  filterEvents() {
    if (!this.eventSearchText) {
      return this.availableEvents;
    }
    console.log(this.eventSearchText)
    return this.availableEvents.filter(event => event.name.toLowerCase().includes(this.eventSearchText.toLowerCase()));
  }

  showInvitationCard = false;
  openCard(item: CustomEvent){
    this.showInvitationCard = true;
    this.dataService.setCardData(item);
  }
  closeCard(){
    this.showInvitationCard = false;
  }


}

