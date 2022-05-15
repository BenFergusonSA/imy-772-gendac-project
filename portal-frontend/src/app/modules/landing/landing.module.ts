import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {SharedModule} from "../../shared/shared.module";
import { LoginComponentComponent } from './components/login-component/login-component.component';

@NgModule({
  imports: [LandingRoutingModule, SharedModule],
  declarations: [LandingPageComponent, LoginComponentComponent],
})
export class LandingModule { }
