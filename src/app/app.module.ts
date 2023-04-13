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
import { EventCatalogComponent } from './event-catalog/event-catalog.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ManagementComponent } from './management/management.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'event-catalog', component: EventCatalogComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'management', component: ManagementComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventCatalogComponent,
    MyEventsComponent,
    HomepageComponent,
    ManagementComponent,
    ProfileComponent
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
    MatListModule

  ],
  exports: [
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
