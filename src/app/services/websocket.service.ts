import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor( public socket: Socket ) {

    this.checkStatus();

  }

  checkStatus(): void {

    this.socket.on( 'connect', () => this.socketStatus = true );
    this.socket.on( 'disconnect', () => this.socketStatus = false );

  }

  emit( evento: string, payload?: any, callback?: ( resp: any ) => void ): void {
    console.log('Emitiendo', evento );
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ): Observable<any> {
    return this.socket.fromEvent( evento );
  }


}
