import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public buscarClientePeloTelefone(telefone:string) {
    return this.http.get("http://localhost:8080/cliente/" + telefone);
  }
}
