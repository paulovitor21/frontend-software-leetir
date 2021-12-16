import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  public getAllCategorias() {
    return this.http.get("http://localhost:8080/categoria");
  }
}
