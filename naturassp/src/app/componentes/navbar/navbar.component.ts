import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { Pedido } from 'src/app/model/Pedido';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public lista: Categoria[];
  public numItens: number;
  private pedido: Pedido;
  
  constructor(private service: CategoriaService) { }

  ngOnInit(): void {

    this.numItens = 0;
    this.pedido = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    
    if (this.pedido) {
      this.numItens = this.pedido.itensPedido.length;
    }

    this.service.getAllCategorias()
          .subscribe((res: Categoria[]) => this.lista = res,
                      err => console.log(err));
  }

}
