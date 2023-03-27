import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { AuthGuard } from './services/guard';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ChatModule,
    LoginModule,
    BrowserModule,
    DatabaseModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
