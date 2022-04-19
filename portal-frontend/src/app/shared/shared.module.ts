import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgZorroModule} from "./modules/ng-zorro.module";
import {IconsProviderModule} from "./modules/icons-provider.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroModule,
    IconsProviderModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
    IconsProviderModule
  ]
})
export class SharedModule {
}
