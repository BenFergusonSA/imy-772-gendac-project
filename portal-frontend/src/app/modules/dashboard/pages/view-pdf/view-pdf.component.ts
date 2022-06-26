import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.less']
})
export class ViewPdfComponent implements OnInit {

  pdfSrc = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.router.parseUrl(this.router.url).queryParams;
    this.pdfSrc = routeParams["pdfSrc"];
    console.log(this.pdfSrc);
  }

}
