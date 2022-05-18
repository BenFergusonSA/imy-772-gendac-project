import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Storage } from 'aws-amplify';
import {NzUploadFile} from "ng-zorro-antd/upload";

@Injectable({
  providedIn: 'root'
})
export class UploadCvService {

  constructor(private httpClient: HttpClient) { }

  async uploadSingleCv(file: NzUploadFile) {
    try {
      await Storage.put('test.pdf', file);
      console.log('Uploaded');
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
}
