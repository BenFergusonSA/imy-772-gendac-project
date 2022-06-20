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

  // https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/Test/PositionTemplates/skilllist

  skillsList: string[] = [
    "Loading..."
  ];

  listOfSelectedValue = [];

  constructor(private fb: FormBuilder,private httpClient: HttpClient, private router: Router) {
    var url = API_ENDPOINTS.getSkillsList;
    console.log("Loaded Page");
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
   }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = new FormData();
      const formDetails = this.validateForm.getRawValue();
      Object.keys(formDetails).forEach((formDetail) => {
        formData.append(formDetail, formDetails[formDetail])
      });

      const id = uuid.v4();
      try {
        formDetails.template_id = id;

        let jsonObj = {
            "template_id": formDetails.template_id,
            "name": formDetails.name,
            "skills": formDetails.skills.join(","),
            "education": "Degree",
            "experience": "Software Developer"
        }

        this.httpClient.post(API_ENDPOINTS.posTemplates, jsonObj).subscribe({

          next: (data) => {
            console.log(data);
            this.router.navigate(['portal','dashboard']);

          },
          error: (err) => { console.log(err) },

        });
      } catch (error) {
        console.log("Error creating template: ", error);
        throw Error('Error creating template');
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, Validators.required],
      skills: [null, Validators.required],
    });
  }

}
