import { Component, OnInit } from '@angular/core';
import { NzSizeDSType } from 'ng-zorro-antd/core/types/size';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { API_ENDPOINTS } from 'src/app/shared/constants/api-endpoints.constant';
import {NzNotificationService} from "ng-zorro-antd/notification";
import * as uuid from "uuid";
// import { FormGroup } from '@angular/forms';

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
  // validateForm!: FormGroup;
  searchValue: string = "";

  cvs: any[] = [
    {
      firstName: 'Loading...',
      surname: '',
      id: "",
      email: "",
      phoneNumber: "",
      pdfURL: "",
      skills: [],
      showing: true
    }
  ];



  skillsList: string[] = [
    "Loading..."
  ];

  educationList: string[] = [
    'Loading...'
  ];

  experienceList: string[] = [
    "Loading..."
  ];

  listOfSelectedValue = [];
  listOfSelectedEducation = [];
  listOfSelectedExperience = [];

  constructor(private http:HttpClient, private router: Router, private notification: NzNotificationService, private httpClient: HttpClient) {
      // Post Example
    // for(let i = 0; i < this.experienceList.length; i++){
      // let experience_id = uuid.v4();
      // let jsonObj = {
      //   "id": experience_id,
      //   "skill": "Vue"
      // }

      // this.httpClient.post(API_ENDPOINTS.skillsList, jsonObj).subscribe({
      //   next: (data) => {
      //     console.log(data);
      //   },
      //   error: (err) => { console.log(err) },

      // });
    // }













    this.getCVData();

    var url = API_ENDPOINTS.skillsList;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    var outerThis = this;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let temp = JSON.parse(xhr.responseText)["Items"].map((item: { id: any; skill: any; }) => {
          return {
            id: item.id.S,
            skill: item.skill.S
          }
        });
        temp = temp.sort((a: any, b: any) => {
          return b.skill.toLowerCase() < a.skill.toLowerCase() ? 1 : -1;
        });
        outerThis.skillsList = temp.map((item: { id: any; skill: any; }) => {
          return item.skill;
        });
      }
    }
    xhr.send();

    var url2 = API_ENDPOINTS.educationList;
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", url2);
    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4) {
        let temp2 = JSON.parse(xhr2.responseText)["Items"].map((item: { education_id: any; education: any; }) => {
          return {
            id: item.education_id.S,
            education: item.education.S
          }
        });
        temp2 = temp2.sort((a: any, b: any) => {
          return b.education.toLowerCase() < a.education.toLowerCase() ? 1 : -1;
        });
        outerThis.educationList = temp2.map((item: { id: any; education: any; }) => {
          return item.education;
        });
      }
    }
    xhr2.send();

    var url3 = API_ENDPOINTS.experienceList;
    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", url3);
    xhr3.onreadystatechange = function () {
      if (xhr3.readyState === 4) {
        let temp3 = JSON.parse(xhr3.responseText)["Items"].map((item: { experience_id: any; experience: any; }) => {
          return {
            id: item.experience_id.S,
            experience: item.experience.S
          }
        });
        temp3 = temp3.sort((a: any, b: any) => {
          return b.experience.toLowerCase() < a.experience.toLowerCase() ? 1 : -1;
        });
        outerThis.experienceList = temp3.map((item: { id: any; experience: any; }) => {
          return item.experience;
        });
      }
    }
    xhr3.send();
  }

  ngOnInit(): void {
    const routeParams = this.router.parseUrl(this.router.url).queryParams;
    if(routeParams["searchTerm"] != null){
      this.searchValue = routeParams["searchTerm"] || "";
    }
    if(this.listOfSelectedValue != null){
      this.listOfSelectedValue = routeParams["skills"].split(", ") || [];
      this.listOfSelectedEducation = routeParams["education"].split(", ") || [];
      this.listOfSelectedExperience = routeParams["experience"].split(", ") || [];
    }
  }

  reloadPage() {
    this.getCVData();
  }

  getCVData(){
    // Get Applicants
    var url = API_ENDPOINTS.getApplicants;

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
              pdfURL: "http://gendac-cvs80138-dev.s3.amazonaws.com/public/"+item.uuid.S,
              skills: ["Loading..."],
              education: ["Loading..."],
              experience: ["Loading..."],
              hasSkills: false,
              searchShowing: true,
              filterShowing: true
            }
          });
          outerThis.cvs = temp;

          // Get Skills
          var url2 = API_ENDPOINTS.getSkills;

          var xhr2 = new XMLHttpRequest();
          xhr2.open("GET", url2);
          xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                let temp2 = JSON.parse(xhr2.responseText)["Items"].map((item: { cv_id: any; applicant_id: any; education: any; experience: any; skills: any; }) => {
                  return {
                    cv_id: item.cv_id.S,
                    applicant_id: item.applicant_id.S,
                    education: item.education.S,
                    experience: item.experience.S,
                    skills: item.skills.S
                  }
                });

                outerThis.cvs.forEach(cv => {
                  let found = false;
                  temp2.forEach((skill: { cv_id: string; applicant_id: string; education: string; experience: string; skills: string }) => {
                    console.log("checking")
                    if (cv.uuid === skill.applicant_id) {
                      cv.skills = skill.skills.split(",");
                      cv.education = skill.education.split(",");
                      cv.experience = skill.experience.split(",");
                      cv.hasSkills = true;
                      found = true;
                      console.log("Found");
                    }
                  });
                  if(!found){
                    cv.skills = ["No skills found"]
                  }
                });

                outerThis.cvs.forEach(cv => {
                  if(cv.firstName.toLowerCase().includes(outerThis.searchValue.toLowerCase()) ||
                  cv.surname.toLowerCase().includes(outerThis.searchValue.toLowerCase()) ||
                  cv.id.toLowerCase().includes(outerThis.searchValue.toLowerCase()) ||
                  cv.email.toLowerCase().includes(outerThis.searchValue.toLowerCase()) ||
                  cv.phoneNumber.toLowerCase().includes(outerThis.searchValue.toLowerCase())){
                    cv.showing = true;
                  }else{
                    cv.showing = false;
                  }
                });
                outerThis.filter();
            }};

          xhr2.send();
          // End of Get Skills
      }};

    xhr.send();
    // End of Get Applicants
  }

  downloadPDF(url: any): any {
    const outerThis = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if(xhr.status === 200){
          // Content-Type: application/pdf
          // Content-Disposition: inline; filename="filename.pdf"
          outerThis.router.navigate(['portal','dashboard','view-pdf'], { queryParams: { pdfSrc: url } });
        }else{
          outerThis.notification.create(
            'error',
            'PDF file not available',
            "This file doesn't seem to be available right now. Please try again later."
          );
        }
        console.log(xhr.status);
      }};

    xhr.send();

    // window.open(url, '_blank');
  }

  search(value: any) {
    this.searchValue = value.target.value;
    this.cvs.forEach(cv => {
      if(cv.firstName.toLowerCase().includes(value.target.value.toLowerCase()) ||
      cv.surname.toLowerCase().includes(value.target.value.toLowerCase()) ||
      cv.id.toLowerCase().includes(value.target.value.toLowerCase()) ||
      cv.email.toLowerCase().includes(value.target.value.toLowerCase()) ||
      cv.phoneNumber.toLowerCase().includes(value.target.value.toLowerCase())){
        cv.searchShowing = true;
      }else{
        cv.searchShowing = false;
      }
    });
  }

  filter() {
    this.cvs.forEach(cv => {
      let hasSkills = true;
      let hasEducation = true;
      let hasExperience = true;
      for(let i = 0; i < this.listOfSelectedValue.length; i++){
        if(!cv.skills.includes(this.listOfSelectedValue[i])){
          hasSkills = false;
        }
      }
      for(let i = 0; i < this.listOfSelectedEducation.length; i++){
        if(!cv.education.includes(this.listOfSelectedEducation[i])){
          hasEducation = false;
        }
      }
      for(let i = 0; i < this.listOfSelectedExperience.length; i++){
        if(!cv.experience.includes(this.listOfSelectedExperience[i])){
          hasExperience = false;
        }
      }
      cv.filterShowing = hasSkills && hasEducation && hasExperience;
    });
    console.log(this.listOfSelectedValue);
    console.log(this.listOfSelectedEducation);
    console.log(this.listOfSelectedExperience);
  }
}
