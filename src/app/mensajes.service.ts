import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

import { Mensaje } from './interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private mensajes: AngularFireList<Mensaje>;

  constructor(private db: AngularFireDatabase) {
    this.mensajes = this.db.list('/messages', (ref) =>
    ref.orderByChild('date')
  );
  }

  addMensaje(msg: Mensaje) {
    this.mensajes.push(msg);
    this.actMensajes();
  }

  actMensajes() {
    this.mensajes = this.db.list('/messages', (ref) =>
      ref.orderByChild('date'));
  }

  getMensajes(): Observable<Mensaje[]> {

    return this.mensajes.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => this.getUserFromPayload(c.payload))
      )
    );
  }

  getUserFromPayload(payload: any): Mensaje {
    return {
      $key: payload.key,
      ...payload.val(),
    };
  }

}
