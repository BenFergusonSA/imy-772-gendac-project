import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ENDPOINTS} from "../../../shared/constants/api-endpoints.constant";

@Injectable({
  providedIn: 'root'
})
export class UploadCvService {

  constructor(private httpClient: HttpClient) { }

  uploadSingleCv(formData: FormData) {
    return this.httpClient.post(API_ENDPOINTS.uploadCv, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
