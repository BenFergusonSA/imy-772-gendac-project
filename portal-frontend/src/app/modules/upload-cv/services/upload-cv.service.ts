import {Injectable} from '@angular/core';
import {Storage} from 'aws-amplify';
import {NzUploadFile} from "ng-zorro-antd/upload";
import * as uuid from "uuid";
import {HttpClient} from "@angular/common/http";
import {API_ENDPOINTS} from "../../../shared/constants/api-endpoints.constant";


@Injectable({
  providedIn: 'root'
})
export class UploadCvService {

  constructor(private httpClient: HttpClient) {
  }


  async uploadSingleCv(file: NzUploadFile, formDetails: any){
    const timeStamp = new Date().toISOString();
    const fileName = uuid.v4();
    try {
      

      formDetails.uuid = fileName;
      //console.log(JSON. stringify(formDetails));

      this.httpClient.post(API_ENDPOINTS.uploadCv, formDetails).subscribe({

        next: (data) => { console.log(data) },
        error: (err) => { console.log(err) },
        
      });

   

      await Storage.put(fileName, file);
    } catch (error) {
      console.log("Error uploading file: ", error);
      throw Error('Failed to upload CV');
    }
  }
}
