import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { API_ENDPOINTS } from 'src/app/shared/constants/api-endpoints.constant';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit {
  sizeL: NzButtonSize = 'large';
  sizeS: NzButtonSize = 'small';

  numberOfCVs: number = 0;
  numberOfTemplates: number = 0;

  positions: any[] = [

  ];

  mainSearchTerm: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Get number of CVs
    const outerThis = this;

    var url = API_ENDPOINTS.getApplicants;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        outerThis.numberOfCVs = JSON.parse(xhr.responseText)["Count"];
      }};

    xhr.send();

    // End of Get number of CVs

    // Get position templates

    var url2 = API_ENDPOINTS.posTemplates;

    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", url2);
    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4) {
        let temp = JSON.parse(xhr2.responseText)["Items"].map((item: { name: any; skills: any; education: any; experience: any; }) => {
          return {
            name: item.name.S,
            skills: item.skills.S.split(',').join(', '),
            education: item.education.S,
            experience: item.experience.S,
            matches: -1
          }
        });
        temp = temp.sort((a: any, b: any) => {
          return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
        });
        outerThis.numberOfTemplates = temp.length;
        outerThis.positions = temp;
      }};

    xhr2.send();

    // End of Get position templates
  }

  updateSearchTerm(value: any){
    this.mainSearchTerm = value.target.value;
  }

  mainSearch(){
    this.router.navigate(['portal','dashboard','view-cvs'], { queryParams: { searchTerm: this.mainSearchTerm } });
  }

}
