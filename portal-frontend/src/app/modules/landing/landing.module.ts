import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [LandingRoutingModule, SharedModule],
  declarations: [LandingPageComponent],
})
export class LandingModule { }
