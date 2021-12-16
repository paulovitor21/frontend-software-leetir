import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public getAllProdutos() {
    console.log("Estou no PRODUTOSERVICE - Entrei em contato com o BackEnd")
    return this.http.get("http://localhost:8080/produto");
  }
}
