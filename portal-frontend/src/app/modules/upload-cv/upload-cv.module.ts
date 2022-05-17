import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCvRoutingModule } from './upload-cv-routing.module';
import { UploadCvPageComponent } from './pages/upload-cv-page/upload-cv-page.component';
import { UploadSingleCvComponent } from './components/upload-single-cv/upload-single-cv.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    UploadCvPageComponent,
    UploadSingleCvComponent
  ],
  imports: [
    CommonModule,
    UploadCvRoutingModule,
    SharedModule
  ]
})
export class UploadCvModule { }
