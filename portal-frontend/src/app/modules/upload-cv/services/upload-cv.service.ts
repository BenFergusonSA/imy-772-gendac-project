import {Injectable} from '@angular/core';
import {Storage} from 'aws-amplify';
import {NzUploadFile} from "ng-zorro-antd/upload";

@Injectable({
  providedIn: 'root'
})
export class UploadCvService {

  constructor() {
  }

  async uploadSingleCv(file: NzUploadFile) {
    const timeStamp = new Date().toISOString();
    const fileName = `${timeStamp}-${file.name}`;
    try {
      await Storage.put(fileName, file);
    } catch (error) {
      console.log("Error uploading file: ", error);
      throw Error('Failed to upload CV');
    }
  }
}
