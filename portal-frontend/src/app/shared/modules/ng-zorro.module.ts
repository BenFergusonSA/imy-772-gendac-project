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
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    NzNotificationModule,
    NzCardModule,
    NzGridModule,
    NzCollapseModule,
    NzToolTipModule
  ]
})
export class NgZorroModule { }
