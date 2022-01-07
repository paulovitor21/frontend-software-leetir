import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  public idPedido: number;
  constructor(private router: ActivatedRoute) { 
    this.idPedido = 0;
  }

  ngOnInit(): void {
    this.idPedido = this.router.snapshot.params["id"];

  }

}
