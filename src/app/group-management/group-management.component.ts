import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {DataService} from "../management/CardService";
import {UiOrganizerService} from "../../services/ui-organizer.service";
import {UiAdminService} from "../../services/ui-admin.service";
import {CustomEvent} from "../../DataTransferObjects/CustomEvent";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {Group} from "../../DataTransferObjects/Group";

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

  dataSource = new MatTableDataSource<Group>();
  displayedColumns: string[] = ['name','actions'];
  groups: Group[];

  filterGroups() {
    if (!this.searchText) {
      return this.managingEvents;
    }
    return this.managingEvents.filter(event => {
      return event.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  ngOnInit() {
    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiAdminService.getGroupsOfOrganisation(orgaId).subscribe(response => {
        this.groups = response;
        this.dataSource.data = this.groups;
      })
    }
  }

  reloadGroups() {
    const orgaId = sessionStorage.getItem('orgaId');
    new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
      if (orgaId != null) {
        this.uiAdminService.getGroupsOfOrganisation(orgaId).subscribe(response => {
          this.groups = response;
          this.dataSource.data = this.groups;
        })
      }
    });
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


  showGroupCard = false;
  openGroupCard(){
    this.showGroupCard = true;
  }
  closeGroupCard(){
    this.showGroupCard = false;
  }
}
