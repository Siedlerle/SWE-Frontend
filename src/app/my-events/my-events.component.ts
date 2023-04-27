import {Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  registeredEvents: CustomEvent[] = [];
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  constructor(private uiUserService : UiUserService) {

  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');

    if (emailAddress != null && orgaId != null && orgaId !== '') {
      this.uiUserService.getRegisteredEventsInOrganisation(emailAddress, orgaId).subscribe(response => {
        this.registeredEvents = response;
      });
    } else if(emailAddress != null){
      this.uiUserService.getAllRegisteredEvents(emailAddress).subscribe(response =>{
        this.registeredEvents = response;
      });
    }
  }

  filterEvents() {
    if (!this.searchText) {
      return this.registeredEvents;
    }
    console.log(this.searchText)
    return this.registeredEvents.filter(event => event.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}


