import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiUserService} from "../../services/ui-user.service";

@Component({
  selector: 'app-event-catalog',
  templateUrl: './event-catalog.component.html',
  styleUrls: ['./event-catalog.component.css']
})
export class EventCatalogComponent implements OnInit {
  public onCardClick(evt: MouseEvent) {
    console.log(evt);
  }

  availableEvents: CustomEvent[];
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  constructor(private uiUserService: UiUserService) {

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
    }else if(emailAddress != null){
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

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  showCard = false;
  openCard(item: CustomEvent){
    this.showCard = true;
    //this.dataService.setCardData(item);
  }
  closeCard(){
    this.showCard = false;
  }
}

