import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModelApi } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthTokenManager, TOKEN_MANAGER } from '../jwt/auth-token-manager';
export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private token: string | null = null;


  // public fields
  // Ce Subject est un Observable qu'on pourra suivre et écouter partout dans l'application
  // Il permet d'être au courant de l'état de l'authentification
  authStatus$ = new BehaviorSubject<boolean>(false);
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  // On expose un getter qui retourne un Observable qui contient le token, il sera utile dans le AuthInterceptor
  // et pourquoi pas à d'autres endroits où le token sera nécessaire
  get authToken$() {
    return this.tokenManager.getAuthToken();
  }

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    // Notez qu'on ne demande pas ici en particulier le LocalStorageTokenManager, mais bien un TokenManager
    // Le système d'injection nous donnera donc un TokenManager sans qu'on ait à se soucier de si il s'agit
    // d'un LocalStorageTokenManager, d'un SessionStorageTokenManager, d'un CookieTokenManager, etc.
    // Si demain, on change de stratégie pour le stockage du token, il suffira de changer le provider dans le
    // SharedModule et tous les services qui utilisent un TokenManager seront automatiquement mis à jour
    @Inject(TOKEN_MANAGER) private tokenManager: AuthTokenManager,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    // Dès la construction du service, on souhaite que notre authStatus$ soit raccord par rapport
    // au fait qu'on ait un token ou pas, on appelle donc le TokenManager (qui sait où se trouve le token)
    // et si on a un token, on met à jour notre authStatus$ avec la valeur true, sinon false
    this.tokenManager.getAuthToken().subscribe((token) => {
      this.authStatus$.next(!!token);
    });
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map(response => response),
      tap((auth: AuthModelApi) => {
        this.token = auth.access;
        this.tokenManager.setAuthFromLocalStorage(auth);
        // this.authStatus$.next(true);
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getUserData(): Observable<UserModel | undefined> {
    // Vérifiez si le token est présent (par exemple, s'il a été stocké dans le service ou dans le gestionnaire de tokens)
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.access) {
      // Si le token n'est pas présent, vous pouvez demander à l'utilisateur de se connecter à nouveau
      // Ou utiliser le refreshToken pour renouveler le token et ensuite récupérer les données de l'utilisateur
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    this.token = auth.access; // Stocker le token dans la variable

    this.authStatus$.next(true); // Mettre à jour l'état d'authentification

    // Effectuez la deuxième requête pour obtenir les données de l'utilisateur
    // Vous pouvez également inclure le token dans les en-têtes pour chaque requête authentifiée
    return this.authHttpService.getUserByToken(auth.access).pipe(
      map(response => response),
      tap((user: UserModel) => {
        return user;
      })
    );
  }


  logout() {
    this.authStatus$.next(false);
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();

    if (!auth || !auth.access) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    this.token = auth.access; // Stocker le token dans la variable

    // this.authStatus$.next(true); // Mettre à jour l'état d'authentification

    return this.authHttpService.getUserByToken(this.token).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModelApi): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthToken() {
    return this.tokenManager.getAuthToken();
  }

  getAuthFromLocalStorage(): AuthModelApi | undefined {
    return this.tokenManager.getAuthFromLocalStorage()
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
