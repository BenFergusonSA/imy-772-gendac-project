import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import {SharedModule} from "../../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { BasicCardComponent } from './components/basic-card/basic-card.component';
import { ViewCvsComponent } from './pages/view-cvs/view-cvs.component';
import { CreatePositionComponent } from './pages/create-position/create-position.component';
import { ViewPdfComponent } from './pages/view-pdf/view-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    DashboardPageComponent,
    BasicCardComponent,
    ViewCvsComponent,
    CreatePositionComponent,
    ViewPdfComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    PdfViewerModule
  ]
})
export class DashboardModule { }
