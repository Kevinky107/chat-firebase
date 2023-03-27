import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from '../mensajes.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensaje } from '../interfaces/mensaje';
import { FormControl, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Geolocation } from '@capacitor/geolocation'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensajes: Array<Mensaje> = [];
  mensajeInput = new FormControl('');
  data: Array<Mensaje> = [];
  lastdata: Array<Mensaje> = [];
  index = 0;
  user = localStorage.getItem("user")!.toString().replace(/['"]+/g, '');
  location = '';
  url = "https://maps.google.com/?q=";


  constructor(private servicioMensajes: MensajesService, public authS: AuthService) { 
    Geolocation.getCurrentPosition().then(res => {
      this.location = res.coords.latitude.toFixed(4).toString()+', '+res.coords.longitude.toFixed(4).toString();
    });
    this.getMensajes();
   }

  ngOnInit() {}

  loadMensaje()
  {
    this.data = [];

    let idLastMessage = this.mensajes.length - this.index - 10;
    // let idFirstMessage = this.mensajes.length-1 - this.index;

    // if(idFirstMessage < 0)
    // {
    //   idFirstMessage = 0;
    // }

    for(let i = this.mensajes.length-1; i >= idLastMessage; i--)
    {
      if(this.mensajes[i] != null)
        this.data.push(this.mensajes[i])
    }
  }

  sendMensaje()
  {
    const date = Date.now().toString();
    const text = this.mensajeInput.value;

    const mensaje: Mensaje = {
      user: this.user,
      text: text,
      date: date,
      location: this.location
    }

    this.servicioMensajes.addMensaje(
      mensaje
    );

    this.getMensajes();

    this.mensajeInput.setValue('');
  }

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  onIonInfinite(ev: any) {
    setTimeout(() => {
      
      if(this.data.length >= this.mensajes.length){
        this.infiniteScroll?.complete();
        this.infiniteScroll.disabled = true;
        return;
      }else{
        this.index += 10;
        this.loadMensaje();
        this.infiniteScroll?.complete();
      }
    }, 500);
  }

  logOut()
  {
    this.authS.logout();
  }

  getMensajes() {
    this.mensajes = [];

    this.servicioMensajes.getMensajes().subscribe(m => {
      this.mensajes = m
      this.loadMensaje();
      console.log(this.data)
    })
  }

}
