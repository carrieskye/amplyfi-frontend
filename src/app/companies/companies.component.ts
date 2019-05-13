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
  headElements = ['name', 'oldest', 'latest', 'count'];

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
      this.elements.push({
        name: this.companies[i].name,
        oldest: this.companies[i].min_year,
        latest: this.companies[i].max_year,
        count: this.companies[i].docs.length
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
