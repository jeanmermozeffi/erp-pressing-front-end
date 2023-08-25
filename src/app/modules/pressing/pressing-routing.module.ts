import { RouterModule, Routes } from "@angular/router";
import { PressingComponent } from "./pressing.component";
import { NgModule } from "@angular/core";
import { PressingEditComponent } from "./forms/pressing-edit/pressing-edit.component";
import { PressingDetailsComponent } from "./forms/pressing-details/pressing-details.component";


const routes: Routes = [
  {
    path: '',
    component: PressingComponent,
    children: [
      {
        path: 'editer',
        component: PressingEditComponent
      },
      {
        path: 'informations',
        component: PressingDetailsComponent
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressingRoutingModule {}
