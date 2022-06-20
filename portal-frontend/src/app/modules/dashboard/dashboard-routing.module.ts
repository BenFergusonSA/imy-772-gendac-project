import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardPageComponent} from "./pages/dashboard-page/dashboard-page.component";
import {ViewCvsComponent} from "./pages/view-cvs/view-cvs.component";
import {CreatePositionComponent} from "./pages/create-position/create-position.component";
import { ViewPdfComponent } from './pages/view-pdf/view-pdf.component';

const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'view-cvs', component: ViewCvsComponent },
  { path: 'create-position', component: CreatePositionComponent },
  { path: 'view-pdf', component: ViewPdfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
