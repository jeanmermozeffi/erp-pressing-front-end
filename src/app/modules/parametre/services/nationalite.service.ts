import { Injectable } from "@angular/core";
import { Nationalite } from "../parametre";
import { AuthService } from "../../auth";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

const API_USERS_URL = `${environment.apiUrl}/parametre/nationalite`;

@Injectable()
export class NationaliteService {

  constructor(
    private htpp: HttpClient,
    private auth: AuthService
  ) { }

  /**
   * Exécute une requête HTTP de création (POST) vers l'API
   *
   * @param nationalite La facture à créer
   */
  create(nationalite: Nationalite) {
    return this.htpp.post<Nationalite>(`${API_USERS_URL}/`, nationalite);
  }

  /**
   * Exécute une requête HTTP de création (PUT) vers l'API
   *
   * @param nationalite Le Nationalite à créer
   */
  update(nationalite: Nationalite): Observable<Nationalite> {
    return this.htpp.put<Nationalite>(`${API_USERS_URL}/${nationalite.id}/`, nationalite);
  }

  find(id: number): Observable<Nationalite> {
    return this.htpp.get<Nationalite>(`${API_USERS_URL}/${id}`);
  }

  delete(nationalite: Nationalite) {
    return this.htpp.delete<Nationalite>(`${API_USERS_URL}/${nationalite.id}/`);
  }

  findAll() {
    return this.htpp.get<Nationalite[]>(`${API_USERS_URL}/`);
  }

}
