import {Component, EventEmitter, OnInit, Output, } from '@angular/core';
import {UiUserService} from "../../services/ui-user.service";
import {User} from "../../DataTransferObjects/User";
import {MatDialog} from "@angular/material/dialog";
import {UserDeleteDialogComponent} from "../user-delete-dialog/user-delete-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @Output() onClose = new EventEmitter<void>();

  user: User;
  newPassword: string;
  confirmNewPassword: string;
  myForm: FormGroup;


  constructor(private uiUserService: UiUserService, private dialog: MatDialog, private fb:FormBuilder, private snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      field1: ['', [Validators.required]],
      field2: ['', [Validators.required]]
    }, {validator: this.checkIfMatchingFields('field1', 'field2')});
  }

  ngOnInit() {

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null){
      this.uiUserService.getUserInformation(emailAdress).subscribe(response =>{
        this.user = response;
      });
    }
  }

  checkIfMatchingFields(field1Name: string, field2Name: string) {
    return (group: FormGroup) => {
      const field1 = group.controls[field1Name];
      const field2 = group.controls[field2Name];

      if (field1.value !== field2.value) {
        field2.setErrors({notMatching: true});
      } else {
        field2.setErrors(null);
      }
    };
  }

  closeCard() {
    this.onClose.emit();
  }

  deleteUser(user: User){
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '250px',
      data: {firstname: user.firstname, lastname: user.lastname, emailAdress: user.emailAdress},
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  resetPassword(){
    const newUser: User = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      emailAdress: this.user.emailAdress,
      password: this.newPassword
    }

    this.uiUserService.resetPassword(newUser).subscribe(response =>{
      if (typeof response === 'object' && response !== null) {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        this.snackBar.open('Passwort erfolgreich geändert', 'Close', {duration: 2000}).afterDismissed().subscribe(()=>{
          location.reload()
        });
      }
    },
(error) => {
        if (error.status === 403) {
          this.snackBar.open('Passwort konnte nicht geändert werden', 'Close', {duration: 2000});
        }
      }
    );
  }
}
