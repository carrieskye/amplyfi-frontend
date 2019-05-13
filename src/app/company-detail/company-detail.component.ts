import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {KeyValue, Location} from '@angular/common';
import {CompanyService} from "../company.service";
import {Company} from "../company";
import {DocService} from "../doc.service";

@Component({
  selector: 'app-doc-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  @Input() company: Company;
  name: string;
  loading = false;
  oldest: number;
  newest: number;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private docService: DocService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.getCompany();
    });
  }

  getCompany(): void {
    this.companyService.getCompany(this.name)
      .subscribe(company => {
        this.company = company;
        this.oldest = +Object.keys(company.years).reduce((a, b) => a < b ? a : b);
        this.newest = +Object.keys(company.years).reduce((a, b) => a > b ? a : b);
        this.loading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

  valueAscOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return a.value < b.value ? 1 : a.value > b.value ? -1 : 0
  }
}
