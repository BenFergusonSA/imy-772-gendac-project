import { Component, OnInit } from '@angular/core';
import { NzSizeDSType } from 'ng-zorro-antd/core/types/size';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

interface CV {
  firstName: string;
  surname:string;
  id:string;
  email:string;
  phoneNumber:string;
  fileName:string;
}

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

  constructor(private http:HttpClient) {
    var url = "https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/Test/db";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    var outerThis = this;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          let temp = JSON.parse(xhr.responseText)["Items"].map((item: { firstName: any; surname: any; id: any; email: any; phoneNumber: any; fileName: any; skills: any; }) => {
            return {
              firstName: item.firstName.S,
              surname: item.surname.S,
              id: item.id.S,
              email: item.email.S,
              phoneNumber: item.phoneNumber.S,
              fileName: item.fileName.S
              // skills: item.skills
            }

          });
          outerThis.cvs = temp;
          console.log(outerThis.cvs);

          // setData(JSON.parse(xhr.responseText)["Items"]);
      }};

    xhr.send();


  }



  ngOnInit(): void {
  }
}

// function setData(): any[] {
//   var url = "https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/Test/db";

//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url);

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//           let temp = JSON.parse(xhr.responseText)["Items"].map((item: { firstName: any; surname: any; id: any; email: any; phoneNumber: any; fileName: any; skills: any; }) => {
//             return {
//               firstName: item.firstName.S,
//               surname: item.surname.S,
//               id: item.id.S,
//               email: item.email.S,
//               phoneNumber: item.phoneNumber.S,
//               fileName: item.fileName.S
//               // skills: item.skills
//             }
//           });
//           return temp;
//           // setData(JSON.parse(xhr.responseText)["Items"]);
//       }};

//     xhr.send();


// }

