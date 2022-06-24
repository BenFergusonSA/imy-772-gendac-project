import { Component, OnInit } from '@angular/core';
import { NzSizeDSType } from 'ng-zorro-antd/core/types/size';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { API_ENDPOINTS } from 'src/app/shared/constants/api-endpoints.constant';
import {NzNotificationService} from "ng-zorro-antd/notification";
import * as uuid from "uuid";
import { NzButtonSize } from 'ng-zorro-antd/button';
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
  sizeL: NzButtonSize = 'large';
  sizeS: NzButtonSize = 'small';

  addSkill(){
    this.skillsList.push(this.typedSkillValue);

    let skill_id = uuid.v4();
    let jsonObj = {
      "id": skill_id,
      "skill": this.typedSkillValue
    }

    this.httpClient.post(API_ENDPOINTS.skillsList, jsonObj).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => { console.log(err) },

    });
  }

  addEducation(){
    this.educationList.push(this.typedEducationValue);

    let skill_id = uuid.v4();
    let jsonObj = {
      "id": skill_id,
      "education": this.typedSkillValue
    }

    this.httpClient.post(API_ENDPOINTS.educationList, jsonObj).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => { console.log(err) },

    });
  }

  small: NzSizeDSType = 'small';
  // validateForm!: FormGroup;
  searchValue: string = "";
  typedSkillValue: string = "";
  typedEducationValue: string = "";

  isLoading: boolean = true;
  alreadyMatches: boolean = false;

  cvs: any[] = [
    {
      firstName: 'Loading...',
      surname: '',
      id: "",
      email: "",
      phoneNumber: "",
      pdfURL: "",
      skills: [],
      education: [],
      showing: true
    }
  ];

  allCVs: any[] = [

  ]

  tempCvs: any[] = [
    {
      firstName: 'Loading...',
      surname: '',
      id: "",
      email: "",
      phoneNumber: "",
      pdfURL: "",
      skills: [],
      education: [],
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

  filterAccuracy: number = 65;

  accFormatter(value: number): string {
    return `${value}%`;
  }

  typeSkill(value: any){
    this.typedSkillValue = value.target.value;
  }

  typeEducation(value: any){
    this.typedEducationValue = value.target.value;
  }

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
  }

  ngOnInit(): void {
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
            const template_id = outerThis.router.parseUrl(outerThis.router.url).queryParams["template_id"];
            const routeParams = outerThis.router.parseUrl(outerThis.router.url).queryParams;
            if(routeParams["searchTerm"] != null){
              outerThis.searchValue = routeParams["searchTerm"] || "";
            }
            if(routeParams["skills"] != null){
              let tmpSkills = [];
              if(typeof(routeParams["skills"]) == "string"){
                tmpSkills.push(routeParams["skills"]);
              }else{
                tmpSkills = routeParams["skills"];
              }
                outerThis.listOfSelectedValue = tmpSkills;
            }
            if(routeParams["education"] != null){
              let tmpEdu = [];
              if(typeof(routeParams["education"]) == "string"){
                tmpEdu.push(routeParams["education"]);
              }else{
                tmpEdu = routeParams["education"];
              }
              outerThis.listOfSelectedEducation = tmpEdu;
            }

            console.log(routeParams);

            outerThis.getCVData();
          }
        }
        xhr2.send();
      }
    }
    xhr.send();
  }

  resetFilters() {
    this.listOfSelectedValue = [];
    this.listOfSelectedEducation = [];
    this.listOfSelectedExperience = [];
    this.typedSkillValue = "";
    this.typedEducationValue = "";
    this.filterAccuracy = 65;
    this.filter();
  }

  getCVData(){
    this.isLoading = true;
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
              experience: "Loading...",
              hasSkills: false,
              searchShowing: true,
              filterShowing: true
            }
          });

          temp = temp.sort((a: any, b: any) => {
            return b.firstName.toLowerCase() < a.firstName.toLowerCase() ? 1 : -1;
          });

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
                    education: item.education.SS,
                    experience: item.experience.S,
                    skills: item.skills.SS
                  }
                });

                temp.forEach((cv: any) => {
                  let found = false;
                  temp2.forEach((skill: { cv_id: string; applicant_id: string; education: string[]; experience: string; skills: string[] }) => {
                    console.log("checking")
                    if (cv.uuid === skill.applicant_id) {
                      cv.skills = skill.skills;
                      cv.education = skill.education;
                      cv.experience = skill.experience;
                      cv.hasSkills = true;
                      found = true;
                      console.log("Found");
                    }
                  });
                  if(!found){
                    cv.skills = ["No skills found"]
                  }
                });
                outerThis.allCVs = temp;
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

  filter(){
    console.log("Filtering...");
    this.isLoading = true;
    this.filterSkills(this.allCVs);
  }

  filterSkills(allApplicants: any){
    if(this.listOfSelectedValue.length == 0){
      this.filterEducation(allApplicants);
    }else{
      var url = API_ENDPOINTS.getSkillFilter;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      var outerThis = this;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          let filteredSkills = JSON.parse(xhr.responseText).map((applicant: any[]) => {
            return {
              firstName: applicant[0].Item.firstName.S,
              surname: applicant[0].Item.surname.S,
              id: applicant[0].Item.id.S,
              email: applicant[0].Item.email.S,
              phoneNumber: applicant[0].Item.phoneNumber.S,
              uuid: applicant[0].Item.uuid.S,
              pdfURL: "http://gendac-cvs80138-dev.s3.amazonaws.com/public/"+applicant[0].Item.uuid.S,
              skills: applicant[1].skills.SS,
              education: applicant[1].education.SS,
              experience: applicant[1].experience.S,
              hasSkills: true,
              searchShowing: true,
              filterShowing: true
            }
          });

          filteredSkills = filteredSkills.sort((a: any, b: any) => {
            return b.firstName.toLowerCase() < a.firstName.toLowerCase() ? 1 : -1;
          });
          console.log("Done Skills");
          outerThis.filterEducation(filteredSkills);
        }
      }

      let data = `{
        "skills": ${JSON.stringify(outerThis.listOfSelectedValue)},
        "accuracy": ${outerThis.filterAccuracy/100}
      }`;

      console.log(data);

      xhr.send(data);
    }
  }

  filterEducation(filteredSkills: any){
    if(this.listOfSelectedEducation.length > 0){
      var url2 = API_ENDPOINTS.getEducationFilter;
      let outerThis = this;
      var xhr2 = new XMLHttpRequest();
      xhr2.open("POST", url2);
      xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
          let filteredEducation = JSON.parse(xhr2.responseText).map((applicant: any[]) => {
            return {
              firstName: applicant[0].Item.firstName.S,
              surname: applicant[0].Item.surname.S,
              id: applicant[0].Item.id.S,
              email: applicant[0].Item.email.S,
              phoneNumber: applicant[0].Item.phoneNumber.S,
              uuid: applicant[0].Item.uuid.S,
              pdfURL: "http://gendac-cvs80138-dev.s3.amazonaws.com/public/"+applicant[0].Item.uuid.S,
              skills: applicant[1].skills.SS,
              education: applicant[1].education.SS,
              experience: applicant[1].experience.S,
              hasSkills: true,
              searchShowing: true,
              filterShowing: true
            }
          });

          let filteredResult = filteredSkills.filter((applicant: any) => {
            let present = false;
            for(let i = 0; i < filteredEducation.length; i++){
              if(filteredEducation[i].uuid == applicant.uuid){
                present = true;
                break;
              }
            }
            return present;
          });
          //check if we viewing a template or not

          if (outerThis.router.parseUrl(outerThis.router.url).queryParams["template_id"] != null){
            if(outerThis.alreadyMatches == false){
              //Post request
              let numOfMatches = filteredResult.length;
              let jsonObj = {
                "template_id": outerThis.router.parseUrl(outerThis.router.url).queryParams["template_id"],
                "numOfMatches": filteredResult.length
              }
              try {
                outerThis.httpClient.post(API_ENDPOINTS.matchedTemplates, jsonObj).subscribe({
          
                  next: (data) => {
                    console.log(data);
          
                  },
                  error: (err) => { console.log(err) },
          
                });
              }catch (error) {
                console.log("Error creating template: ", error);
                throw Error('Error creating template');
              }
            }
          }
          outerThis.filterSearch(filteredResult);
        }
      }

      let data2 = `{
        "education": ${JSON.stringify(outerThis.listOfSelectedEducation)},
        "accuracy": ${outerThis.filterAccuracy/100}
      }`;

      xhr2.send(data2);
    }else{
      this.filterSearch(filteredSkills);
    }
  }

  filterSearch(filteredResult: any){
    filteredResult.forEach((cv: any) => {
      if(cv.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      cv.surname.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      cv.id.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      cv.email.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      cv.phoneNumber.toLowerCase().includes(this.searchValue.toLowerCase())){
        cv.showing = true;
      }else{
        cv.showing = false;
      }
    });

    this.cvs = filteredResult;
    this.isLoading = false;
  }
}
