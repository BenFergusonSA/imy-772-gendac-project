import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";

@NgModule({
  imports: [LandingRoutingModule],
  declarations: [LandingPageComponent],
})
export class LandingModule { }
