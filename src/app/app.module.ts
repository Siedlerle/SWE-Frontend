import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {EventCatalogComponent} from './event-catalog/event-catalog.component';
import {FilterPipe} from "../services/filter.service";
import { MyEventsComponent } from './my-events/my-events.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ManagementComponent } from './management/management.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddEventComponent } from './add-event/add-event.component';
import { OrganisationCatalogComponent } from './organisation-catalog/organisation-catalog.component';
import { EventCardComponent } from './event-card/event-card.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptorProvider} from "../services/auth-interceptor";
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { OrganisationCardComponent } from './organisation-card/organisation-card.component';
import { UsermanagementInOrganisationComponent } from './usermanagement-in-organisation/usermanagement-in-organisation.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AddUserToEventComponent } from './add-user-to-event/add-user-to-event.component';
import {MatTableModule} from "@angular/material/table";
import { GroupManagementComponent } from './group-management/group-management.component';
import { AddGroupComponent } from './add-group/add-group.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { AddUserToOrganisationComponent } from './add-user-to-organisation/add-user-to-organisation.component';
import { EventDeleteDialogComponent } from './event-delete-dialog/event-delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'event-catalog', component: EventCatalogComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'management', component: ManagementComponent},
  { path: 'login', component: LoginComponent},
  { path: 'organisation-catalog', component: OrganisationCatalogComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'imprint', component: ImprintComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent}
  //{ path: '', redirectTo: '/homepage', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventCatalogComponent,
    MyEventsComponent,
    HomepageComponent,
    ManagementComponent,
    ProfileComponent,
    FilterPipe,
    AddEventComponent,
    EventCardComponent,
    LoginComponent,
    OrganisationCatalogComponent,
    ImprintComponent,
    PrivacyPolicyComponent,
    OrganisationCardComponent,
    UsermanagementInOrganisationComponent,
    AddUserToEventComponent,
    GroupManagementComponent,
    AddGroupComponent,
    EventDeleteDialogComponent,
    AddUserToOrganisationComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatGridListModule,
    MatMomentDateModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    NgxMatFileInputModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule
  ],
  exports: [
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
