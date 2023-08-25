import { Injectable, NgModule } from "@angular/core";
import { Pays } from "../parametre";
import { AuthService } from "../../auth";
import { Observable, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable()
export class ParametreService
{

  constructor(
    private htpp: HttpClient,
    private auth: AuthService
  ) { }

  /**
   * Exécute une requête HTTP de création (POST) vers l'API
   *
   * @param pays La facture à créer
   */
  create(pays: Pays)
  {
    return this.htpp.post<Pays>(`${API_USERS_URL}/parametre/pays/`, pays);
  }

  /**
   * Exécute une requête HTTP de création (PUT) vers l'API
   *
   * @param pays Le pays à créer
   */
  update(pays: Pays): Observable<Pays>
  {
    return this.htpp.put<Pays>(`${API_USERS_URL}/parametre/pays/${pays.id}/`, pays);
  }

  find(id: number): Observable<Pays>
  {
    return this.htpp.get<Pays>(`${API_USERS_URL}/parametre/pays/${id}`);
  }

  delete(pays: Pays) {
    return this.htpp.delete<Pays>(`${API_USERS_URL}/parametre/pays/${pays.id}/`);
  }

  findAll() {
    return this.htpp.get<Pays[]>(`${API_USERS_URL}/parametre/pays/`);
  }




}
