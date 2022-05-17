import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortalComponent} from "./portal.component";
import {AuthenticatedUserGuard} from "../../shared/guards/authenticated-user.guard";

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(mod => mod.DashboardModule),
        // canActivate: [AuthenticatedUserGuard]
      },
      {
        path: 'upload-cv',
        loadChildren: () => import('src/app/modules/upload-cv/upload-cv.module').then(mod => mod.UploadCvModule),
        // canActivate: [AuthenticatedUserGuard]
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule {
}
