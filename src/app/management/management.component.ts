import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "./CardService";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {UiAdminService} from "../../services/ui-admin.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {URLs} from "../../assets/SystemVariables/URLs";
import {MatSelectChange} from "@angular/material/select";
import {UiUserService} from "../../services/ui-user.service";
import {Router} from "@angular/router";
import {EnumEventStatus} from "../../DataTransferObjects/EnumEventStatus";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit  {
  backendURL: string = "";
  constructor(private dataService: DataService, private uiOrganizerService: UiOrganizerService, private uiAdminService: UiAdminService, private uiUserService: UiUserService, private router: Router) {
    this.backendURL = URLs.backend;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  eventSearchText = '';
  orgaSearchText = '';
  toggleSearch: boolean = false;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[];
  attendees: User[];
  managingEvents: CustomEvent[];
  orgaUsers: User[];
  orgaUserRoles: string[] = [];
  rightsList = ['Administrator', 'Organisator', 'Benutzer'];
  isAdmin: boolean;

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
        this.updateStatusOfEvents(this.managingEvents);
      });

    } else if(emailAddress != null && orgaId != null && orgaId !=='' && orgaRole != null && orgaRole === 'ADMIN') {
      this.uiAdminService.getEventsofOrganisation(orgaId).subscribe(response =>{
        this.managingEvents = response;
        this.updateStatusOfEvents(this.managingEvents);
      });

    }
    if(orgaId != null && orgaId !== ''){
      this.uiOrganizerService.getAllUsersInOrganisation(orgaId).subscribe(response =>{
        this.orgaUsers = response;
        this.dataSource.data = this.orgaUsers;
        for (let i = 0; i < this.orgaUsers.length; i++) {
          this.uiUserService.getRoleForUserInOrga(+orgaId, this.orgaUsers[i].emailAdress).subscribe(response => {
            this.orgaUserRoles[i] = response.role;
          })
        }
      });
    }
    if (orgaRole === "ADMIN") {
      this.displayedColumns = ['FirstName','LastName','eMail','rights','actions'];
      this.isAdmin = true;
    } else {
      this.displayedColumns = ['FirstName','LastName','eMail'];
      this.isAdmin = false;
    }
  }

  updateStatusOfEvents(events: CustomEvent[]) {
    const now = new Date();
    events.forEach(event => {
      const startTime = this.getDate(event.startDate, event.startTime);
      const endTime = this.getDate(event.endDate, event.endTime);

      if (event.status != EnumEventStatus.CANCELLED) {
        if (startTime > now) {
          event.status = EnumEventStatus.SCHEDULED;
        } else if (startTime < now && endTime > now) {
          event.status = EnumEventStatus.RUNNING;
        } else if (endTime < now) {
          event.status = EnumEventStatus.ACCOMPLISHED;
        }
      }
    });
  }

  getDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0);
    return newDate;
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

  showPresetManagement = false;

  openPresetManagement() {
    this.showPresetManagement = true;
  }
  closePresetManagement() {
    this.showPresetManagement = false;
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

  showAddUserToOrganisation = false;
  openAddUserToOrganisation(){
    this.showAddUserToOrganisation = true;
  }
  closeAddUserToOrganisation(){
    this.showAddUserToOrganisation = false;
  }

  showOrganisationsBannerUpload = false;
  openOrganisationBannerUpload(){
    this.showOrganisationsBannerUpload = true;
  }
  closeOrganisationBannerUpload() {
    this.showOrganisationsBannerUpload = false;
  }

  inviteToOrganisation(){}

  onRightsSelectionChange(event: any, user: any) {
    let newRole = event.target.value;


  }

  removeUser(user: User){
    const orgaId = sessionStorage.getItem('orgaId');
    if(orgaId !=null) {
      this.uiAdminService.removeUserFromOrganisation(orgaId,user.emailAdress).subscribe(response => {
        this.uiOrganizerService.getAllUsersInOrganisation(orgaId).subscribe(response =>{
          this.orgaUsers = response;
          this.dataSource.data = this.orgaUsers;
        });
      });
    }
  }

  getRoleOfUser(user: User) {
    let index = this.dataSource.data.findIndex(u => u === user);
    let role = this.orgaUserRoles[index]
    if (role === "ADMIN") {
      return "Administrator";
    } else if (role === "ORGANIZER") {
      return "Organisator";
    } else if (role === "USER") {
      return "Benutzer";
    }
    return;
  }

  setRoleOfUser(event: MatSelectChange, user: User) {
    let newRole = event.value;
    const orgaId = sessionStorage.getItem('orgaId');
    const emailAddress = sessionStorage.getItem('emailAdress');
    if (orgaId !== null) {
      if (newRole === "Administrator") {
        this.uiAdminService.setPersonAdmin(orgaId, user.emailAdress).subscribe();
      } else if (newRole === "Organisator") {
        this.uiAdminService.setPersonOrganizer(orgaId, user.emailAdress).subscribe();
      } else if (newRole === "Benutzer") {
        this.uiAdminService.setPersonUser(orgaId, user.emailAdress).subscribe();
      }
    }
    if (emailAddress === user.emailAdress) {
      sessionStorage.setItem('orgaId', '');
      sessionStorage.setItem('orgaRole', '');
      sessionStorage.setItem('eventRole', '');
      sessionStorage.setItem('activeManagement', JSON.stringify(false));
      this.router.navigate(['']);
    }
  }
}


