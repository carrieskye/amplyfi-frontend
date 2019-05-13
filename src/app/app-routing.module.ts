import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DocsComponent} from "./docs/docs.component";
import {DocDetailComponent} from "./doc-detail/doc-detail.component";
import {CompaniesComponent} from "./companies/companies.component";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {PlacesComponent} from "./places/places.component";
import {PeopleComponent} from "./people/people.component";

const routes: Routes = [
  {path: '', redirectTo: '/docs', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'docs', component: DocsComponent},
  {path: 'docs/:id', component: DocDetailComponent},
  {path: 'companies/:name', component: CompanyDetailComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'places', component: PlacesComponent},
  {path: 'people', component: PeopleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
