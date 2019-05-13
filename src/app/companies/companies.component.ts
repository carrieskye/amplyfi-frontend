import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from "angular-bootstrap-md";
import {CompanyService} from "../company.service";
import {Company} from "../company";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  elements: any = [];
  headElements = ['name', 'top-location', 'top-year', 'most-recent-year', 'documents'];

  searchText: string = '';
  previous: string;

  companies: Company[];
  loading = false;

  constructor(private companyService: CompanyService) {
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.loading = true;
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies()
      .subscribe(companies => {
        this.companies = companies;
        this.tableSettings();
      })
  }

  tableSettings(): void {
    for (let i = 1; i < this.companies.length; i++) {
      const years = this.companies[i].years;
      let top_year = "";
      let recent_year = "";
      if (Object.keys(years).length > 0) {
        top_year = Object.keys(years).reduce((a, b) => years[a] > years[b] ? a : b);
        recent_year = Object.keys(years).reduce((a, b) => a > b ? a : b);
      }

      const locations = this.companies[i].locations;
      let top_location = "";
      if (Object.keys(locations).length > 0) {
        top_location = Object.keys(locations).reduce((a, b) => locations[a] > locations[b] ? a : b);
      }

      this.elements.push({
        name: this.companies[i].name,
        "top-location": top_location,
        "top-year": top_year,
        "most-recent-year": recent_year,
        documents: this.companies[i].ids.length
      });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();

    this.loading = false;
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
