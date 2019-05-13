import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
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

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private docService: DocService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.getCompany();
  }

  getCompany(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.companyService.getCompany(this.name)
      .subscribe(company => {
        this.company = company;
        this.loading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
