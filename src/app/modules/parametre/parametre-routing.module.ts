import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParametreComponent } from "./parametre.component";
import { PaysListeComponent } from "./pays/pays-liste/pays-liste.component";
import { PaysEditComponent } from "./pays/pays-edit/pays-edit.component";
import { RegionComponent } from "./region/region.component";
import { RegionEditComponent } from "./region/region-edit/region-edit.component";
import { VilleComponent } from "./ville/ville.component";
import { VilleEditComponent } from "./ville/ville-edit/ville-edit.component";
import { NationaliteComponent } from "./nationalite/nationalite.component";

const routes: Routes = [
    {
        path: 'parametre',
        component: ParametreComponent,
        children: [
            {
                path: 'pays',
                component: PaysListeComponent,
            },
            {
                path: 'pays/:id',
                component: PaysEditComponent,
            },
            {
                path: 'region',
                component: RegionComponent,
            },
            {
                path: 'region/:id',
                component: RegionEditComponent,
            },
            {
                path: 'ville',
                component: VilleComponent,
            },
            {
                path: 'ville/:id',
                component: VilleEditComponent,
            },
            {
                path: 'nationalite',
                component: NationaliteComponent,
            },
        ],
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: '**', redirectTo: 'overview', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ParametreRoutingModule {

}
