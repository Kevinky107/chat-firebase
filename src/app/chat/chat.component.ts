import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensaje } from '../interfaces/mensaje';
import { FormControl, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensajes: Array<Mensaje> = [];
  mensajeInput = new FormControl('');

  constructor(private servicioMensajes: MensajesService, public authS: AuthService) { 
    this.servicioMensajes.getMensajes().subscribe(m => {
      this.mensajes = m
      this.mostrarMensajes();
    })
   }

  ngOnInit() {}

  sendMensaje()
  {
    //const inp = document.getElementById('text');
    const date = new Date().toString();
    const user = localStorage.getItem("user")!.toString().replace(/['"]+/g, '');
    const text = this.mensajeInput.value;
    
    const mensaje: Mensaje = {
      user: user,
      text: text,
      date: date
    }

    this.servicioMensajes.addMensaje(
      mensaje
    );

    this.mensajes.push(mensaje);
    this.mensajeInput.setValue('');
  }

  mostrarMensajes()
  {
    const user = localStorage.getItem("user")!.toString().replace(/['"]+/g, '');
    let lista = document.getElementById("mensajes") as HTMLElement;
    lista.innerHTML = "";

    this.mensajes.forEach(mensaje => {
      let slot = '';
      if(mensaje.user == user)
        {slot = 'style="text-align: right"'}

      lista.innerHTML += '<ion-item><ion-label '+slot+'><p class="usuario">'+ mensaje.user +'</p><p>' + mensaje.text+'</p></ion-label></ion-Item>';
    });
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  logOut()
  {
    this.authS.logout();
  }

}

