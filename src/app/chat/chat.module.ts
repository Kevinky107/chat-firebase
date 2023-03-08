import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../mensajes.service';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

//import { MensajesComponent } from './mensajes/mensajes.component';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoutingModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
