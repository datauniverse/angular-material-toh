import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormsModule,
  ReactiveFormsModule
}    from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }