import { Component, OnInit } from '@angular/core';
import { NzSizeDSType } from 'ng-zorro-antd/core/types/size';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

// interface CV {
//   firstName: string;
//   surname:string;
//   id:string;
//   email:string;
//   phoneNumber:string;
//   fileName:string;
// }

@Component({
  selector: 'app-view-cvs',
  templateUrl: './view-cvs.component.html',
  styleUrls: ['./view-cvs.component.less']
})
export class ViewCvsComponent implements OnInit {
  small: NzSizeDSType = 'small';

  cvs: any[] = [
    {
      firstName: 'Loading...',
      surname: '',
      id: "",
      email: "",
      phoneNumber: "",
      fileName: "",
      skills: []
    }
  ];

  constructor(private http:HttpClient, private router: Router) {
    this.getCVData();
  }

  ngOnInit(): void {
  }

  reloadPage() {
    this.getCVData();
  }

  getCVData(){
    // Get Applicants
    var url = "https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/Test/db";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    var outerThis = this;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          let temp = JSON.parse(xhr.responseText)["Items"].map((item: { email: any; firstName: any; id: any; phoneNumber: any; surname: any; uuid: any; }) => {
            return {
              firstName: item.firstName.S,
              surname: item.surname.S,
              id: item.id.S,
              email: item.email.S,
              phoneNumber: item.phoneNumber.S,
              uuid: item.uuid.S,
              skills: ["Loading..."],
              hasSkills: false
            }
          });
          outerThis.cvs = temp;

          // Get Skills
          var url2 = "https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/Test/db/skills";

          var xhr2 = new XMLHttpRequest();
          xhr2.open("GET", url2);
          xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                let temp2 = JSON.parse(xhr2.responseText)["Items"].map((item: { cv_id: any; skills: any; }) => {
                  return {
                    id: item.cv_id.S,
                    skills: item.skills.S
                  }
                });

                outerThis.cvs.forEach(cv => {
                  let found = false;
                  temp2.forEach((skill: { id: any; skills: string; }) => {
                    if (cv.uuid === skill.id) {
                      cv.skills = skill.skills.split(",");
                      cv.hasSkills = true;
                      found = true;
                    }
                  });
                  if(!found){
                    cv.skills = ["Processing skills..."]
                  }
                });
            }};

          xhr2.send();
          // End of Get Skills
      }};

    xhr.send();
    // End of Get Applicants
  }
}
