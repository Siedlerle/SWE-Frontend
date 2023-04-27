import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "./CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {UiAdminService} from "../../services/ui-admin.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private uiAdminService: UiAdminService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  eventSearchText = '';
  orgaSearchText = '';
  toggleSearch: boolean = false;

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  attendees: User[];
  managingEvents: CustomEvent[];

  filterEvents() {
    if (!this.eventSearchText) {
      return this.managingEvents;
    }
    console.log(this.eventSearchText)
    return this.managingEvents.filter(event => event.name.toLowerCase().includes(this.eventSearchText.toLowerCase()));
  }

  filterUsers() {
    const filterValue = this.orgaSearchText.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    const orgaRole = sessionStorage.getItem('orgaRole')
    if (emailAddress != null && orgaId != null && orgaId !=='' && orgaRole != null && orgaRole === 'ORGANIZER') {
      this.uiOrganizerService.getManagingEvents(emailAddress, orgaId).subscribe(response => {
        this.managingEvents = response;
        this.managingEvents.forEach(function (event) {
          if (event.imageSource == null) {
            event.imageSource = "../../assets/images/OrgaBanner.png";
          }
        });
      });
    } else if(emailAddress != null && orgaId != null && orgaId !=='' && orgaRole != null && orgaRole === 'ADMIN') {
      this.uiAdminService.getEventsofOrganisation(orgaId).subscribe(response =>{
        this.managingEvents = response;
        this.managingEvents.forEach(function (event) {
          if (event.imageSource == null) {
            event.imageSource = "../../assets/images/OrgaBanner.png";
          }
        });
      });
    }
  }

  showPopup = false;
  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }
  showCard = false;
  openCard(item: CustomEvent){
    this.showCard = true;
    this.dataService.setCardData(item);
  }
  closeCard(){
    this.showCard = false;
  }

  showGroupManagement = false;
  openGroupManagement() {
    this.showGroupManagement = true;
  }
  closeGroupManagement() {
    this.showGroupManagement = false;
  }

  showUserManagement = false;
  openUserManagement() {
    this.showUserManagement = true;
    //User informationen laden und setzten
  }
  closeUserManagement() {
    this.showUserManagement = false;
  }

  inviteToOrganisation(){}

  removeUser(user: User){}
}


