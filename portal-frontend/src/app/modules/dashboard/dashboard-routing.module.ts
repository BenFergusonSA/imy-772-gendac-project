import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardPageComponent} from "./pages/dashboard-page/dashboard-page.component";
import {ViewCvsComponent} from "./pages/view-cvs/view-cvs.component";

const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'view-cvs', component: ViewCvsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
