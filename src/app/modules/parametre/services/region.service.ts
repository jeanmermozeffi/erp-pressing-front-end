import { Injectable } from "@angular/core";
import { Region } from "../parametre";
import { AuthService } from "../../auth";
import { Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

const API_USERS_URL = `${environment.apiUrl}/parametre/region`;

@Injectable()
export class RegionService {

  constructor(
    private htpp: HttpClient,
    private auth: AuthService
  ) { }

  /**
   * Exécute une requête HTTP de création (POST) vers l'API
   *
   * @param region La facture à créer
   */
  create(region: Region) {
    return this.htpp.post<Region>(`${API_USERS_URL}/`, region);
  }

  /**
   * Exécute une requête HTTP de création (PUT) vers l'API
   *
   * @param region Le region à créer
   */
  update(region: Region): Observable<Region> {
    return this.htpp.put<Region>(`${API_USERS_URL}/${region.id}/`, region);
  }

  find(id: number): Observable<Region> {
    return this.htpp.get<Region>(`${API_USERS_URL}/${id}`);
  }

  delete(region: Region) {
    return this.htpp.delete<Region>(`${API_USERS_URL}/${region.id}/`);
  }

  findAll() {
    return this.htpp.get<Region[]>(`${API_USERS_URL}/`);
  }


}
