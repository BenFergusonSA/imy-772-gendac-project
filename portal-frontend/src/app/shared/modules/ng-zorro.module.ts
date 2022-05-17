import { NgModule } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzAlertModule,
    NzPopoverModule,
    NzSpaceModule,
    NzUploadModule,
    NzNotificationModule
  ]
})
export class NgZorroModule { }
