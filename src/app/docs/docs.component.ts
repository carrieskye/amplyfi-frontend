import {Component, OnInit} from '@angular/core';
import {DocService} from "../doc.service";

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  docs: any[];
  docsPerPage = 20;
  totalNumberOfDocs: number;
  totalNumberOfPages: number;
  currentPage = 1;
  loading = false;

  constructor(private docService: DocService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getDocs();
  }

  getDocs(): void {
    this.docService.getDocs()
      .subscribe(docs => {
        this.docs = docs;
        this.getNumberOfDocs();
      });
  }

  getDocsPage(): void {
    this.docService.getDocsLimited(this.docsPerPage, (this.currentPage - 1) * this.docsPerPage)
      .subscribe(docs => {
        this.docs = docs;
        let top = document.getElementById('top');
        if (top !== null) {
          top.scrollIntoView();
          top = null;
          this.loading = false;
        }
      });
  }

  getNumberOfDocs(): void {
    this.docService.getNumberOfDocs()
      .subscribe(numberOfDocs => {
        this.totalNumberOfDocs = numberOfDocs;
        this.totalNumberOfPages = Math.ceil(numberOfDocs / this.docsPerPage);
        this.loading = false;
      });
  }

  updatePage(pageNumber): void {
    this.loading = true;
    this.currentPage = pageNumber;
    this.getDocsPage();
  }
}
