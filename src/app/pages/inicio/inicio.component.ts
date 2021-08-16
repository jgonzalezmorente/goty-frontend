import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { GotyService } from '../../services/goty.service';
import { GotyElement } from '../../interfaces/goty.interface';
import { WebsocketService } from '../../services/websocket.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos = [];

  constructor( private gotyService: GotyService,
               private wsService: WebsocketService ) { }

  ngOnInit(): void {

    this.gotyService.getGoty().pipe(
      map( ( resp: GotyElement[] ) => resp.map( ({ name, votos }) => ( { name, value: votos } )) )
    ).subscribe( juegos => this.juegos = juegos );

    this.escucharSocket();

  }


  escucharSocket(): void {
    this.wsService.listen( 'cambio-goty' ).subscribe(
      goty => {
        const juegos = [ ...this.juegos ];
        juegos.find( r => r.name === goty.name ).value = goty.votos;
        this.juegos = juegos;
        console.log(this.juegos);
      }

    );
  }

}
