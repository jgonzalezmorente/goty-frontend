import { Component, OnDestroy, OnInit } from '@angular/core';
import { GotyService } from '../../services/goty.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica-barra-horizontal',
  templateUrl: './grafica-barra-horizontal.component.html',
  styleUrls: ['./grafica-barra-horizontal.component.css']
})
export class GraficaBarraHorizontalComponent implements OnInit {

  results = [
    {
      name: 'Juego 1',
      value: 20
    },
    {
      name: 'Juego 2',
      value: 25
    },
    {
      name: 'Juego 3',
      value: 15
    },
    {
      name: 'Juego 4',
      value: 20
    }
  ];
  view: any[] = [700, 400];

  // options
  showXAxis      = true;
  showYAxis      = true;
  gradient       = true;
  showLegend     = true;
  showXAxisLabel = true;
  yAxisLabel     = 'Juegos';
  showYAxisLabel = true;
  xAxisLabel     = 'Votos';
  colorScheme    = 'nightLights';

  constructor( private gotyService: GotyService,
               private wsService: WebsocketService ) {}

  ngOnInit(): void {

    this.gotyService.getGoty().subscribe(

      goty => {

        this.results = goty.map( game => {
          return {
            name: game.name,
            value: game.votos
          };
        });

      }

    );

    this.escucharSocket();

  }

  escucharSocket(): void {
    this.wsService.listen( 'cambio-goty' ).subscribe(

      goty => {
        const results = [ ...this.results ];

        results.find( r => r.name === goty.name ).value = goty.votos;

        this.results = results;

      }

    );
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
