import { NgModule } from '@angular/core';
import { PortalComponent } from './portal.component';
import {SharedModule} from "../../shared/shared.module";
import {PortalRoutingModule} from "./portal-routing.module";

@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    PortalRoutingModule,
    SharedModule
  ]
})
export class PortalModule { }
