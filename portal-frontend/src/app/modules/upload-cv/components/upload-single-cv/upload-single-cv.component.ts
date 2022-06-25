import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {LoaderStateModel} from "../../../../shared/models/loader-state.model";
import {UploadCvService} from "../../services/upload-cv.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-single-cv',
  templateUrl: './upload-single-cv.component.html',
  styleUrls: ['./upload-single-cv.component.less']
})
export class UploadSingleCvComponent implements OnInit {
  fileList: NzUploadFile[] = [];
  uploadCvForm!: FormGroup;
  uploadState: LoaderStateModel = new LoaderStateModel();
  isValidFormSubmitted: boolean | null = null;
  namePattern = "^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$" as unknown as RegExp;
  emailPattern = "^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])"  as unknown as RegExp;
  idPattern = "^[0-9]*$" as unknown as RegExp;
  phonePattern = "^([0-9]{10})" as unknown as RegExp;
  constructor(private fb: FormBuilder, private uploadCvService: UploadCvService, private notification: NzNotificationService, private router: Router) {
  }

  ngOnInit(): void {
    this.uploadCvForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern(this.namePattern)]],
      surname: [null, [Validators.required, Validators.pattern(this.namePattern)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      phoneNumber: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      idNumber: [null, [Validators.required, Validators.pattern(this.idPattern)]],
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

    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });

    const formDetails = this.uploadCvForm.getRawValue();
    Object.keys(formDetails).forEach((formDetail) => {
      formData.append(formDetail, formDetails[formDetail])
    })

    try {
      const formDetails = this.uploadCvForm.getRawValue();

      const cvUuid = await this.uploadCvService.uploadSingleCv(this.fileList[0], formDetails);
      await this.uploadCvService.waitForCVParsing(cvUuid);

      this.uploadState.onSuccess();
      this.notification.create(
        'success',
        'Upload CV',
        'The CV has successfully been uploaded.'
      );
      this.router.navigate(['portal','dashboard','view-cvs']).catch(() => {});
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
