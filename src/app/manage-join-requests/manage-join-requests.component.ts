import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiAdminService} from "../../services/ui-admin.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../DataTransferObjects/User";
import {URLs} from "../../assets/SystemVariables/URLs";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";

@Component({
  selector: 'app-manage-join-requests',
  templateUrl: './manage-join-requests.component.html',
  styleUrls: ['./manage-join-requests.component.css']
})
export class ManageJoinRequestsComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();

  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ['firstname','lastname','email','actions'];
  backendURL: string = URLs.backend;
  imageSource!: string | undefined;
  orga!: Organisation;
  users!: User[];

  constructor(private uiAdminService: UiAdminService, private uiUserService: UiUserService) {

  }

  ngOnInit() {
    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiUserService.getOrganisation(orgaId).subscribe(response => {
        this.orga = response;
        this.imageSource = this.orga.image;
      })
      this.uiAdminService.getJoinRequestes(orgaId).subscribe(response => {
        this.users = response;
        this.dataSource.data = this.users;
      })
    }
  }

  acceptRequest(mail: string) {
    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiAdminService.acceptJoinRequest(orgaId, mail).subscribe(response => {
        this.ngOnInit()
      });
    }
  }

  declineRequest(mail: string) {
    const orgaId = sessionStorage.getItem('orgaId');
    if (orgaId != null) {
      this.uiAdminService.declineJoinRequest(orgaId, mail).subscribe(response => {
        this.ngOnInit()
      });
    }
  }

  closePopup() {
    this.onClose.emit();
  }
}
