import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as uuid from "uuid";
import {HttpClient} from "@angular/common/http";
import { API_ENDPOINTS } from 'src/app/shared/constants/api-endpoints.constant';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.less']
})
export class CreatePositionComponent implements OnInit {
  validateForm!: FormGroup;

  title: string = "Create new Position Template";
  createBtnText: string = "Create";

  // https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/Test/PositionTemplates/skilllist

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
      "education": this.typedEducationValue
    }

    this.httpClient.post(API_ENDPOINTS.educationList, jsonObj).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => { console.log(err) },

    });
  }

  skillsList: string[] = [
    "Loading..."
  ];

  educationList: string[] = [
    "Loading..."
  ];

  typedName: string = "";
  typedSkillValue: string = "";
  typedEducationValue: string = "";

  listOfSelectedValue = [];
  listOfSelectedEducation = [];

  typeSkill(value: any){
    this.typedSkillValue = value.target.value;
  }
  typeEducation(value: any){
    this.typedEducationValue = value.target.value;
  }

  constructor(private fb: FormBuilder,private httpClient: HttpClient, private router: Router) {
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
                education_id: item.education_id.S,
                education: item.education.S
              }
            });
            temp2 = temp2.sort((a: any, b: any) => {
              return b.education.toLowerCase() < a.education.toLowerCase() ? 1 : -1;
            });
            outerThis.educationList = temp2.map((item: { education_id: any; education: any; }) => {
              return item.education;
            });
          }
        }
        xhr2.send();
      }
    }
    xhr.send();
   }

  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.router.parseUrl(this.router.url).queryParams["name"] != null){
        let template_id = this.router.parseUrl(this.router.url).queryParams["template_id"];

        this.removeFromDB(template_id);
      }else{
        this.addToDB();
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  addToDB(){
    const formData = new FormData();
    const formDetails = this.validateForm.getRawValue();
    Object.keys(formDetails).forEach((formDetail) => {
      formData.append(formDetail, formDetails[formDetail])
    });

    const id = uuid.v4();

    let jsonObj = {
      "template_id": id,
      "name": formDetails.name,
      "skills": formDetails.skills.join(","),
      "education": formDetails.education.join(","),
      "experience": "None",
      "matches": 0
    }
    try {
      this.httpClient.post(API_ENDPOINTS.posTemplates, jsonObj).subscribe({

        next: (data) => {
          console.log(data);
          this.router.navigate(['portal','dashboard']);

        },
        error: (err) => { console.log(err) },

      });
    }catch (error) {
      console.log("Error creating template: ", error);
      throw Error('Error creating template');
    }
  }

  removeFromDB(template_id: any){
    const removeJson = {
        "template_id": template_id
    };
    console.log(removeJson);
    try {
      this.httpClient.post(API_ENDPOINTS.removePosTemplates, removeJson).subscribe({
      next: (data) => {
        console.log(data);
        this.addToDB();
      },
      error: (err) => { console.log(err) },
      });
    }catch (error) {
      console.log("Error creating template: ", error);
      throw Error('Error creating template');
    }
  }

  removeOnly(){
    const removeJson = {
        "template_id": this.router.parseUrl(this.router.url).queryParams["template_id"]
    };
    console.log(removeJson);
    try {
      this.httpClient.post(API_ENDPOINTS.removePosTemplates, removeJson).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['portal','dashboard']);
      },
      error: (err) => { console.log(err) },
      });
    }catch (error) {
      console.log("Error creating template: ", error);
      throw Error('Error creating template');
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, Validators.required],
      skills: [null, Validators.required],
      education: [null],
    });

    const routeParams = this.router.parseUrl(this.router.url).queryParams;
    console.log(routeParams);
    if(routeParams["name"] != null){
      this.title = "Edit Position Template";
      this.createBtnText = "Update";
      this.validateForm.controls['name'].setValue(routeParams["name"]);
      if(routeParams["skills"] != null || routeParams["skills"] != []){
        let tmpSkills = [];
        if(typeof(routeParams["skills"]) == "string"){
          tmpSkills.push(routeParams["skills"]);
        }else{
          tmpSkills = routeParams["skills"];
        }
          this.listOfSelectedValue = tmpSkills;
      }
      if(routeParams["education"] != null || routeParams["education"] != []){
        let tmpEdu = [];
        if(typeof(routeParams["education"]) == "string"){
          tmpEdu.push(routeParams["education"]);
        }else{
          tmpEdu = routeParams["education"];
        }
        this.listOfSelectedEducation = tmpEdu;
      }
    }
  }

}
