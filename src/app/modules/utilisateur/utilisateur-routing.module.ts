import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UtilisateurComponent } from "./utilisateur.component";
import { UtilisateurDetailsComponent } from "./forms/utilisateur-details/utilisateur-details.component";
import { UtilisateurListeComponent } from "./liste/utilisateur-liste/utilisateur-liste.component";
import { ProfileDetailComponent } from "./forms/profile-detail/profile-detail/profile-detail.component";


const routes: Routes = [
  {
    path: '',
    component: UtilisateurComponent,
    children: [
      {
        path: '',
        component: UtilisateurListeComponent,
      },
      {
        path: 'profile/:id',
        component: UtilisateurDetailsComponent,
        children: [
          {
            path: 'detail',
            component: ProfileDetailComponent,
          },
        ]
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UtilisateurRoutingModule {

}
