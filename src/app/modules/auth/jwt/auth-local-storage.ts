import { Observable, of } from "rxjs";
import { AuthTokenManager, authLocalStorageToken } from "./auth-token-manager";
import { AuthModelApi } from "../models/auth.model";

export class AuthLocalStorage implements AuthTokenManager {

  storeAuthToken(authToken: string): Observable<string> {
    localStorage.setItem(authLocalStorageToken, JSON.stringify(authToken));
    return of(authToken);
  }

  // getAuthToken(): Observable<string | null> {
  //   return of(sessionStorage.getItem('authToken'));
  // }

  getAuthToken(): Observable<string | null> {
    const storedToken = localStorage.getItem(authLocalStorageToken);

    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      return of(parsedToken.access);
    }
    return of(null);
  }

  removeAuthToken(): Observable<boolean> {
    localStorage.removeItem(authLocalStorageToken);
    return of(true);
  }


  // private methods
  setAuthFromLocalStorage(auth: AuthModelApi): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access) {
      localStorage.setItem(authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): AuthModelApi | undefined {
    try {
      const lsValue = localStorage.getItem(authLocalStorageToken);
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
