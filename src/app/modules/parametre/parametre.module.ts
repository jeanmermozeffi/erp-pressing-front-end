import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaysEditComponent } from './pays/pays-edit/pays-edit.component';
import { PaysListeComponent } from './pays/pays-liste/pays-liste.component';
import { PaysCreateComponent } from './pays/pays-create/pays-create.component';
import { ParametreComponent } from './parametre.component';
import { ParametreRoutingModule } from './parametre-routing.module';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PaysFromModalComponent } from './pays/forms/pays-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParametreService } from './services/parametre.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../auth/services/auth.interceptor';
import { VilleCreateComponent } from './ville/ville-create/ville-create.component';
import { VilleComponent } from './ville/ville.component';
import { VilleEditComponent } from './ville/ville-edit/ville-edit.component';
import { VilleFormComponent } from './ville/ville-form/ville-form.component';
import { RegionComponent } from './region/region.component';
import { RegionCreateComponent } from './region/region-create/region-create.component';
import { RegionEditComponent } from './region/region-edit/region-edit.component';
import { RegionFromComponent } from './region/region-from/region-form.component';
import { RegionService } from './services/region.service';
import { PaysService } from './services/pays.service';
import { VilleService } from './services/ville.service';
import { NationaliteComponent } from './nationalite/nationalite.component';
import { NationaliteCreateComponent } from './nationalite/nationalite-create/nationalite-create.component';
import { NationaliteEditComponent } from './nationalite/nationalite-edit/nationalite-edit.component';
import { NationaliteFormComponent } from './nationalite/nationalite-form/nationalite-form.component';
import { NationaliteService } from './services/nationalite.service';



@NgModule({
  declarations: [
    PaysEditComponent,
    PaysListeComponent,
    PaysCreateComponent,
    ParametreComponent,
    PaysFromModalComponent,
    VilleCreateComponent,
    VilleComponent,
    VilleEditComponent,
    VilleFormComponent,
    RegionComponent,
    RegionCreateComponent,
    RegionEditComponent,
    RegionFromComponent,
    NationaliteComponent,
    NationaliteCreateComponent,
    NationaliteEditComponent,
    NationaliteFormComponent

  ],
  imports: [
    CommonModule,
    ParametreRoutingModule,
    ModalsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownMenusModule,
    FormsModule
  ],
  exports: [
    PaysFromModalComponent,
  ],
  providers: [
    ParametreService,
    RegionService,
    PaysService,
    VilleService,
    NationaliteService,
    // Enfin, nous déclarons que AuthInterceptor doit être utilisé pour intercepter les requêtes HTTP
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
  ]
})
export class ParametreModule { }
