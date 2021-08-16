import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-grafica-barra-horizontal',
  templateUrl: './grafica-barra-horizontal.component.html',
  styleUrls: ['./grafica-barra-horizontal.component.css']
})
export class GraficaBarraHorizontalComponent {

  @Input() results = [];

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

  constructor( ) {}

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
