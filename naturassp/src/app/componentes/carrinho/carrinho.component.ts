import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/model/Pedido';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public pedido: Pedido;
  public vazio: boolean;
  constructor(private route: Router) { 

  }

  ngOnInit(): void {
    this.pedido = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    if (!this.pedido) {
      this.vazio = true;
    }
    else{
      this.vazio = false;
    }
  }

  public removerItem(idProduto: number) {
    let i: number;
    for (i = 0; i < this.pedido.itensPedido.length; i++) {
      if (this.pedido.itensPedido[i].produto.id == idProduto) {
        alert("remove o produto = " + this.pedido.itensPedido[i].produto.nome);
        this.pedido.valorTotal -= this.pedido.itensPedido[i].precoTotal;
        this.pedido.itensPedido.splice(i,1);
      }
    }
    localStorage.setItem("LeetirCarrinho", JSON.stringify(this.pedido));
  }

  public efetivar() {
    if (this.pedido.itensPedido.length > 0) {
      this.route.navigate(['/efetivarpedido']);
    }
    else {
      this.route.navigate(['/destaques']);
    }
    
  }

}
