import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public getAllProdutos() {
    return this.http.get("http://localhost:8080/produto");
  }

  public getProdutoPeloId(id: number) {
    return this.http.get("http://localhost:8080/produto/" + id);
  }
}
