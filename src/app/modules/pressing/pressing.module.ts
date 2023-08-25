import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressingComponent } from './pressing.component';
import { PressingRoutingModule } from './pressing-routing.module';
import { PressingEditComponent } from './forms/pressing-edit/pressing-edit.component';
import { PressingDetailsComponent } from './forms/pressing-details/pressing-details.component';
import { PressingSettingComponent } from './forms/pressing-setting/pressing-setting.component';



@NgModule({
  declarations: [
    PressingComponent,
    PressingEditComponent,
    PressingDetailsComponent,
    PressingSettingComponent
  ],
  imports: [
    CommonModule,
    PressingRoutingModule
  ]
})
export class PressingModule { }
