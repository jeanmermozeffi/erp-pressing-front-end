import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthModelApi } from "../models/auth.model";
import { InjectionToken } from "@angular/core";


export const authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

// Il vaut toujours mieux utiliser un InjectionToken plutôt qu'une simple string lorsqu'on veut indiquer
// à l'injection de dépendances quel objet on souhaite injecter
export const TOKEN_MANAGER = new InjectionToken<AuthTokenManager>(
  'Le tokenManager à utiliser'
);

export interface AuthTokenManager {
  storeAuthToken(token: string): Observable<string>
  getAuthToken(): Observable<string | null>
  removeAuthToken(): Observable<boolean>
  setAuthFromLocalStorage(auth: AuthModelApi): boolean
  getAuthFromLocalStorage(): AuthModelApi|undefined
}
