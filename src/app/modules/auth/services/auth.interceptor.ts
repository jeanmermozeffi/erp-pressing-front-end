import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, switchMap, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService,
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // On récupère l'URL
        const url = req.url;

        // Si la requête n'a pas besoin d'une authentification
        if (!url.startsWith(environment.apiUrl)) {
            return next.handle(req);
        }

        return this.auth.authToken$.pipe(
            tap((token) => {
                if (!token) {
                    throw new Error(`Aucun Authentication token`);
                }
            }),
            switchMap((authToken) => {
                const authRequest = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                return next.handle(authRequest);

            })
        );
    }

}
