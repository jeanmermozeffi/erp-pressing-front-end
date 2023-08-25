import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable()
export class ParametreHttpService
{

  constructor(
    private http: HttpClient
  ) {}

}
