import { Injectable } from "@angular/core";
import { Ville } from "../parametre";
import { AuthService } from "../../auth";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

const API_USERS_URL = `${environment.apiUrl}/parametre/ville`;

@Injectable()
export class VilleService {

  constructor(
    private htpp: HttpClient,
    private auth: AuthService
  ) { }

  /**
   * Exécute une requête HTTP de création (POST) vers l'API
   *
   * @param ville La facture à créer
   */
  create(ville: Ville) {
    return this.htpp.post<Ville>(`${API_USERS_URL}/`, ville);
  }

  /**
   * Exécute une requête HTTP de création (PUT) vers l'API
   *
   * @param ville Le Ville à créer
   */
  update(ville: Ville): Observable<Ville> {
    return this.htpp.put<Ville>(`${API_USERS_URL}/${ville.id}/`, ville);
  }

  find(id: number): Observable<Ville> {
    return this.htpp.get<Ville>(`${API_USERS_URL}/${id}`);
  }

  delete(ville: Ville) {
    return this.htpp.delete<Ville>(`${API_USERS_URL}/${ville.id}/`);
  }

  findAll() {
    return this.htpp.get<Ville[]>(`${API_USERS_URL}/`);
  }

}
