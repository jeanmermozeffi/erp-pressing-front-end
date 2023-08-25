import { Observable, of } from "rxjs";
import { AuthTokenManager, authLocalStorageToken } from "./auth-token-manager";
import { AuthModelApi } from "../models/auth.model";

export class AuthSessionStorage implements AuthTokenManager {

  storeAuthToken(authToken: string): Observable<string> {
    sessionStorage.setItem('authToken', JSON.stringify(authToken));
    return of(authToken);
  }

  getAuthToken(): Observable<string | null> {
    return of(sessionStorage.getItem('authToken'));
  }

  removeAuthToken(): Observable<boolean> {
    sessionStorage.removeItem('authToken');
    return of(true);
  }

  // private methods
  setAuthFromLocalStorage(auth: AuthModelApi): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access) {
      sessionStorage.setItem(authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): AuthModelApi | undefined {
    try {
      const lsValue = sessionStorage.getItem(authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
