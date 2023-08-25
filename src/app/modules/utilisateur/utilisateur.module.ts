import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UtilisateurComponent } from "./utilisateur.component";
import { UtilisateurRoutingModule } from "./utilisateur-routing.module";
import { CreateUserModalComponent } from "./forms/create-user/create-user-modal.component";
import { ModalsModule } from "src/app/_metronic/partials";
import { UtilisateurDetailsComponent } from './forms/utilisateur-details/utilisateur-details.component';
import { UtilisateurListeComponent } from './liste/utilisateur-liste/utilisateur-liste.component';
import { ProfileDetailComponent } from "./forms/profile-detail/profile-detail/profile-detail.component";
import { InlineSVGModule } from "ng-inline-svg-2";

@NgModule({
  declarations: [
    UtilisateurComponent,
    CreateUserModalComponent,
    UtilisateurDetailsComponent,
    UtilisateurListeComponent,
    ProfileDetailComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    ModalsModule,
    InlineSVGModule
  ],
  exports: [
    CreateUserModalComponent
  ]
})
export class UtilisateurModule {

}
