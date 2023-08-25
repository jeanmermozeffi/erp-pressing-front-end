import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const currentUser = this.authService.currentUserValue;

    const auth = this.authService.getAuthFromLocalStorage();

    if (!auth || !auth.access) {
      this.authService.logout();
      return false;
    }

    return true

    // return this.authService.authStatus$.pipe(
    //   map((status) => {
    //     console.log(status);

    //     // Si l'utilisateur est connecté, on retourne true
    //     if (status === true) {
    //       return true;
    //     }

    //     // Sinon on retourne une UrlTree qui redirigera l'utilisateur vers la page de login
    //     return this.router.parseUrl('/auth/login');
    //     // this.authService.logout();
    //     // return false;
    //   })
    // );


    // if (authToken) {
    //   // logged in so return true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.authService.logout();
    // return false;
  }
}
