import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadCvPageComponent} from "./pages/upload-cv-page/upload-cv-page.component";

const routes: Routes = [
  { path: '', component: UploadCvPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadCvRoutingModule { }
