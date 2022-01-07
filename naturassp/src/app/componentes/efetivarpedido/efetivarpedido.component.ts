import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { EnderecoCEP } from 'src/app/model/EnderecoCEP';
import { Pedido } from 'src/app/model/Pedido';
import { BuscarcepService } from 'src/app/servicos/buscarcep.service';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-efetivarpedido',
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {

  public cliente:Cliente;
  public achou: boolean;
  public visivel: boolean;
  public pedido: Pedido;
  public mensagemErro: string;

  constructor(private cliService: ClienteService,
              private cepService: BuscarcepService, 
              private pedService: PedidoService,
              private router: Router) { 
    this.cliente = new Cliente();
    this.pedido = new Pedido();
    this.achou = false;
    this.visivel = false;
  }

  ngOnInit(): void {
  }

  public buscarTelefone(){
    this.cliService.buscarClientePeloTelefone(this.cliente.telefone)
      .subscribe((cli:Cliente) =>{
        this.cliente = cli;
        this.achou = true;
        console.log(this.cliente);
        this.visivel = true;
      },
      (err) => {
        if (err.status == 404) {
          // deu certo, mas a pesquisa não encontrou o cliente com esse telefone = é novo cliente
          this.visivel = true;
        }
        else {
          alert("Erro desconhecido" + err);
        }
        
        console.log(err);
      })
  }

  public buscarCEP() {
    this.cepService.buscarCEP(this.cliente.cep).subscribe
    ((res: EnderecoCEP) => {
      this.cliente.logradouro = res.logradouro;
      this.cliente.cidade = res.localidade;
      this.cliente.bairro = res.bairro;
      this.cliente.estado = res.uf;
    },
    (err) => {
      console.log("")
      this.mensagemErro = "CEP não encontrado";
      document.getElementById("btnModal").click();
    });
  }

  public finalizarPedido() {
    let pedidoTmp: Pedido;
    pedidoTmp = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    this.pedido.itensPedido = pedidoTmp.itensPedido;
    this.pedido.valorTotal = pedidoTmp.valorTotal;
    this.pedido.cliente = this.cliente;
    this.pedido.status = 0; // pedido inicial

    console.log(this.pedido);

    this.pedService.inserirNovoPedido(this.pedido).subscribe(
      (res: Pedido) => {
        alert("Pedido efetivado = numero " + res.idPedido);
        localStorage.removeItem("LeetirCarrinho");
        this.router.navigate(["/recibo/",res.idPedido]);
      },
      (err) => {
        alert("Não consegui efetivar seu pedido - desculpe");
      }
    );

  }

}
