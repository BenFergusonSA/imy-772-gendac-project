import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {LoaderStateModel} from "../../../../shared/models/loader-state.model";
import {UploadCvService} from "../../services/upload-cv.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-upload-single-cv',
  templateUrl: './upload-single-cv.component.html',
  styleUrls: ['./upload-single-cv.component.less']
})
export class UploadSingleCvComponent implements OnInit {
  fileList: NzUploadFile[] = [];
  uploadCvForm!: FormGroup;
  uploadState: LoaderStateModel = new LoaderStateModel();

  constructor(private fb: FormBuilder, private uploadCvService: UploadCvService, private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.uploadCvForm = this.fb.group({
      firstName: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
      idNumber: [null, [Validators.required]],
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  async handleUpload(): Promise<void> {
    if (!this.uploadCvForm.valid) {
      return;
    }

    this.uploadState.startLoader();

    try {
      await this.uploadCvService.uploadSingleCv(this.fileList[0]);

      this.uploadState.onSuccess();
      this.notification.create(
        'success',
        'Upload CV',
        'The CV has successfully been uploaded.'
      );
    } catch (error) {
      this.uploadState.onFailure('Failed to upload CV');
      this.notification.create(
        'error',
        'Upload CV',
        'The CV has failed to be uploaded'
      );
    }
  }

}