import {Injectable} from '@angular/core';
import {Storage} from 'aws-amplify';
import {NzUploadFile} from "ng-zorro-antd/upload";

@Injectable({
  providedIn: 'root'
})
export class UploadCvService {

  constructor() {
  }


  async uploadSingleCv(file: NzUploadFile, formDetails: any) {
    const timeStamp = new Date().toISOString();
    const cvUuid = uuid.v4();
    const fileName = cvUuid + '.pdf';
    try {
      formDetails.uuid = fileName;
      
      return new Promise<void>((resolve, reject) => {
        this.httpClient.post(API_ENDPOINTS.uploadCv, formDetails).subscribe({
          next: async (data) => {
            await Storage.put(fileName, file);

            this.httpClient.post(API_ENDPOINTS.parseCV, {
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
