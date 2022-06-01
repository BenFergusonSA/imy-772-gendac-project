import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import {SharedModule} from "../../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { BasicCardComponent } from './components/basic-card/basic-card.component';
import { ViewCvsComponent } from './pages/view-cvs/view-cvs.component';
import { CreatePositionComponent } from './pages/create-position/create-position.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    BasicCardComponent,
    ViewCvsComponent,
    CreatePositionComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
