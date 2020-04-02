import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';
import { MaterialModule } from './material.module';
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { OptionsComponent } from './options/options.component';
import { MqttModule, IMqttServiceOptions  } from "ngx-mqtt";
import {MatIconModule} from '@angular/material/icon';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: 8000,
  path: '/mqtt'
}

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MaterialModule,
    WebcamModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
