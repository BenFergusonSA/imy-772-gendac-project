import { NgModule } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";

@NgModule({
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
  ]
})
export class NgZorroModule { }
