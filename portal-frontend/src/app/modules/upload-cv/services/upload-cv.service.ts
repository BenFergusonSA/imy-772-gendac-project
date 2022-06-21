import {Injectable} from '@angular/core';
import {Storage} from 'aws-amplify';
import {NzUploadFile} from "ng-zorro-antd/upload";
import * as uuid from "uuid";
import {API_ENDPOINTS} from "../../../shared/constants/api-endpoints.constant";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadCvService {

  constructor(private httpClient: HttpClient) {
  }

  async uploadSingleCv(file: NzUploadFile, formDetails: any) {
    const cvUuid = uuid.v4();
    const fileName = cvUuid + '.pdf';
    try {
      return new Promise<void>(async (resolve, reject) => {
        await Storage.put(fileName, file);

        this.httpClient.post(API_ENDPOINTS.uploadCv, formDetails).subscribe({
          next: async (data) => {
            this.httpClient.post(API_ENDPOINTS.triggerCvParse, {
              applicantCVUUID: cvUuid
            }).subscribe({
              next: () => {
                resolve();
              },
              error: (err) => {
                console.log(err);
                reject();
              }
            })
          },
          error: (err) => {
            console.log(err);
            reject();
          },
        });
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
      throw Error('Failed to upload CV');
    }
  }
}
