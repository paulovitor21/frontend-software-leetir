import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarcepService {

  constructor(private http: HttpClient) { }

  public buscarCEP(cep: string) {
    return this.http.get("https:viacep.com.br/ws/" +cep+"/json");
  }
}
