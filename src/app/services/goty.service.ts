import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Goty, GotyElement } from '../interfaces/goty.interface';
import { environment } from '../../environments/environment';
import { stringify } from '@angular/compiler/src/util';



@Injectable({
  providedIn: 'root'
})
export class GotyService {


  juegos: GotyElement[] = [];

  constructor(
    private http: HttpClient
  ) { }


  getGoty(): Observable<GotyElement[]> {

    if ( this.juegos.length === 0 ) {

      return this.http.get<Goty>( `${ environment.wsUrl }/goty/` ).pipe(
        map( resp => resp.goty ),
        tap( juegos => this.juegos = juegos ),
      );

    } else {

      return of( this.juegos );

    }

  }


  votarJuego( id: string ): Observable<{ok: boolean, msg: string} > {

    return this.http.put<{ ok: boolean, goty: GotyElement }>( `${ environment.wsUrl }/votar/${ id }`, {} ).pipe(
      map( resp => ({
        ok: resp.ok,
        msg: 'Gracias por su voto'
      })),
      catchError( err => {
        console.log(err);
        return of({
        ok: false,
        msg: err.msg || err.error.msg
      })})
    );

  }

}
