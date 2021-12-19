import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPedido } from 'src/app/model/ItemPedido';
import { Pedido } from 'src/app/model/Pedido';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe: Produto;
  public quantidade: number;

  constructor(private route  : ActivatedRoute, 
              private service: ProdutoService,
              private nav:     Router ) { 

    this.quantidade = 1;
  }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      this.recuperaProduto(parameter["id"]);
    })
  }

  public recuperaProduto(id: number) {
    this.service.getProdutoPeloId(id).subscribe( 
      (prod: Produto) => {this.produtoDetalhe = prod; },
      erro => { alert("Produto inválido!") }
    );
  }

  public adicionarCarrinho() {
    let pedido:Pedido;
    pedido = JSON.parse(localStorage.getItem("LeetirCarrinho"));

    if (!pedido) { // se ele não existir, eu crio um novo pedido
      pedido = new Pedido();
      
      pedido.valorTotal = 0;
      pedido.itensPedido = [];
    }

    let item: ItemPedido;
    item = new ItemPedido();

    item.qtdeItem = this.quantidade;
    item.produto = this.produtoDetalhe;
    item.precoUnitario = this.produtoDetalhe.preco;
    item.precoTotal = item.precoUnitario * item.qtdeItem;
    console.log(JSON.stringify(item));



    pedido.itensPedido.push(item);
    pedido.valorTotal = pedido.valorTotal + item.precoTotal;
    localStorage.setItem("LeetirCarrinho", JSON.stringify(pedido));
    
    this.nav.navigate(['carrinho']);
  }
}
