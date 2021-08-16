import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { GotyService } from '../../services/goty.service';
import { GotyElement } from '../../interfaces/goty.interface';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: GotyElement[];

  constructor( private gotyService: GotyService ) { }

  ngOnInit(): void {

    this.gotyService.getGoty().subscribe(
      juegos => this.juegos = juegos
    );
  }

  votarJuego( juego: GotyElement ): void {

    this.gotyService.votarJuego( juego._id ).subscribe(
      resp => {
        if ( resp.ok ) {
          Swal.fire( 'Gracias', resp.msg, 'success' );
        } else {
          Swal.fire( 'Oops', resp.msg, 'error' );
        }
      }
    );

  }

}
