import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'MqttApp';
  lightOn = false;
  doorOpen = false;
  cameraOn = false;

  topics : Array<string> = ["/htl/4ahif/house/front/door/bell", 
                            "/htl/4ahif/house/front/door/light",
                            "/htl/4ahif/house/front/door/door",
                            "/htl/4ahif/house/front/door/camera"]

  constructor(private mqttService : MqttService){}

  ngOnInit() {}

  ngOnDestroy() {}



  lightClick() {
    console.log("Test")
    if(this.lightOn){
      this.mqttService.unsafePublish(this.topics[1], "on", {qos: 1, retain: false})
    }
    else{
      this.mqttService.unsafePublish(this.topics[1], "off", {qos: 1, retain: false})
    }
    
  }
}
