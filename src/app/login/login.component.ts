import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UiUserService} from "../../services/ui-user.service";
import {User} from "../../DataTransferObjects/User";
import {MatTabGroup} from "@angular/material/tabs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  @ViewChild("loginForm") loginForm: NgForm;
  @ViewChild("registerForm") registerForm: NgForm;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  myForm: FormGroup;
  userName: string = "";
  email: string = "";
  password: string = "";


  registerFirstName: string = "";
  registerLastName: string = "";
  registerEmail: string = "";
  registerPassword: string = "";
  confirmRegisterPassword: string = "";

  loading = false;

  authToken:string | null = "";


  constructor(private uiUserService: UiUserService, private fb: FormBuilder, private route: ActivatedRoute,  private snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      field1: ['', [Validators.required]],
      field2: ['', [Validators.required]]
    }, {validator: this.checkIfMatchingFields('field1', 'field2')});

  }

  ngOnInit(): void {
    const config: MatSnackBarConfig = {
      duration: 10000,
      politeness: "off",
      panelClass: ["snackbar"],
      verticalPosition: "top"

    };
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.authToken = params.get('authToken');
      if (this.authToken !== null) {
        this.uiUserService.verify(this.authToken).subscribe(
          (response) => {
            const text = response.message;
            this.snackBar.open(text, 'Close', { duration: 10000 });
          },
          (error) => {
            this.snackBar.open(error.message, 'Close', config);
          }
        );
      }
    });
  }

  checkIfAtSymbolExists(inputValue: string): boolean {
    return inputValue.includes('@');
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


  onSubmit(form: NgForm) {
    if(form == this.loginForm) {

      if (this.email == "organizer@ftb-solutions.de" && this.password == "organizer") {
        sessionStorage.setItem('authenticated', JSON.stringify(true));
        sessionStorage.setItem('role', 'organizer');
        location.reload()
      } else if (this.email == "user@ftb-solutions.de" && this.password == "user") {
        sessionStorage.setItem('authenticated', JSON.stringify(true));
        sessionStorage.setItem('role', 'user');
        location.reload()
      } else {

        const newUser: User = {
          emailAdress: this.email,
          password: this.password
        }

        this.uiUserService.login(newUser).subscribe(response => {
          if (typeof response === 'object' && response !== null) {
            const accessToken = response.access_token;
            const refreshToken = response.refresh_token;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
            sessionStorage.setItem('emailAdress', this.email);
            sessionStorage.setItem('authenticated', JSON.stringify(true));
            location.reload()
          } else {
            sessionStorage.setItem('authenticated', JSON.stringify(false));
            location.reload()
          }
        });
      }
    }else if(form == this.registerForm){

      const newUser: User = {
        firstname: this.registerFirstName,
        lastname: this.registerLastName,
        emailAdress: this.registerEmail,
        password: this.registerPassword
      }
      this.loading = true;
      this.uiUserService.register(newUser).subscribe(response => {
        this.loading = false;
        this.tabGroup.selectedIndex = 0;
        form.resetForm();
        this.myForm.reset();
        this.registerFirstName = '';
        this.registerLastName = '';
        this.registerEmail = '';
        this.registerPassword = '';
        this.confirmRegisterPassword = '';
        sessionStorage.setItem('authenticated', JSON.stringify(false));
        location.reload();
      });
    }
  }
}
