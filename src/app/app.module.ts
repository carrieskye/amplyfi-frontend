import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DocsComponent} from "./docs/docs.component";
import {DocDetailComponent} from "./doc-detail/doc-detail.component";
import {CompaniesComponent} from "./companies/companies.component";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {PeopleComponent} from "./people/people.component";
import {PlacesComponent} from "./places/places.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DocsComponent,
    DocDetailComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    PeopleComponent,
    PlacesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
