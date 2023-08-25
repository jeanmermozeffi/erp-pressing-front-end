import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService} from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';


// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { AuthLocalStorage } from './modules/auth/jwt/auth-local-storage';
import { TOKEN_MANAGER } from './modules/auth/jwt/auth-token-manager';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    {
      provide: [
        APP_INITIALIZER,
      ],
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    // On explique que tous ceux qui veulent un TokenManager recevront de la part du système d'injection de dépendances
    // un LocalStorageTokenManager. Si à l'avenir on change de stratégie (par exemple pour utiliser un
    // sessionStorage), on n'aura qu'à changer ce qui est fourni ici
    AuthService,
    {
      provide: TOKEN_MANAGER, useClass: AuthLocalStorage
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
