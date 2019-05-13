import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DocService} from "../doc.service";
import {Doc} from "../doc";

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {
  @Input() doc: Doc;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private docService: DocService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.getDoc();
  }

  getDoc(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.docService.getDoc(id)
      .subscribe(doc => {
        this.doc = doc;
        this.loading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
