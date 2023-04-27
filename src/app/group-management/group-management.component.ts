import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {UiAdminService} from "../../services/ui-admin.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent {


  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private uiAdminService: UiAdminService) { }
  managingEvents: CustomEvent[];
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toggleSearch: boolean = false;

  @Output() onClose = new EventEmitter<void>();

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['FirstName','LastName','eMail','actions'];
  attendees: User[];

  filterEvents() {
    if (!this.searchText) {
      return this.managingEvents;
    }
    return this.managingEvents.filter(event => {
      return event.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  ngOnInit() {
    const emailAddress = sessionStorage.getItem('emailAdress');
    const orgaId = sessionStorage.getItem('orgaId');
    const orgaRole = sessionStorage.getItem('orgaRole')
    if (emailAddress != null && orgaId != null && orgaId !=='' && orgaRole != null && orgaRole === 'ORGANIZER') {
      this.uiOrganizerService.getManagingEvents(emailAddress, orgaId).subscribe(response => {
        this.managingEvents = response;
      });
    } else if(emailAddress != null && orgaId != null && orgaId !=='' && orgaRole != null && orgaRole === 'ADMIN') {
      this.uiAdminService.getEventsofOrganisation(orgaId).subscribe(response =>{
        this.managingEvents = response;
      });
    }
  }

  showAddGroup = false;
  openAddGroup() {
    this.showAddGroup = true;
  }

  closeAddGroup() {
    this.showAddGroup = false;
  }


  closePopup() {
    this.onClose.emit();
  }
}
