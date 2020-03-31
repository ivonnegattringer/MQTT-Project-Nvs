import { Component, OnInit } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  isLightOn : boolean;
  isDoorOpen : boolean;
  isCameraOn : boolean;

  topics : Array<string> = [
  "/htl/4ahif/house/front/door/bell", 
  "/htl/4ahif/house/front/door/light",
  "/htl/4ahif/house/front/door/door",
  "/htl/4ahif/house/front/door/camera"];
  private subscription: Subscription;

  constructor(private mqttService: MqttService) { }

  ngOnInit() {
    this.topics.forEach(topic => {
      this.subscribeTopic(topic)
    });
  }

  openDoor(){
    console.log("Door opened");
    this.mqttService.unsafePublish(this.topics[2], "on", {qos: 0, retain: false});
    this.isDoorOpen = true;
  }

  closeDoor(){
    console.log("Door closed");
    this.mqttService.unsafePublish(this.topics[2], "off", {qos: 0, retain: false});
    this.isDoorOpen = false;
  }

  lightOn(){
    this.isLightOn = true;
    this.mqttService.unsafePublish(this.topics[1], "on", {qos: 0, retain: false});
    console.log("Light on");
  }

  lightOff(){
    this.isLightOn = false;
    this.mqttService.unsafePublish(this.topics[1], "off", {qos: 0, retain: false});
    console.log("Light off");
  }
  
  cameraOn(){
    this.isCameraOn = true;
    this.mqttService.unsafePublish(this.topics[3], "on", {qos: 0, retain: false});
    console.log("Camera on");
  }

  cameraOff(){
    this.isCameraOn = false;
    this.mqttService.unsafePublish(this.topics[3], "off", {qos: 0, retain: false});
    console.log("Camera off");
  }

  subscribeTopic(topic: string) {
    this.subscription = this.mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      let mqttMessage  = message.payload.toString();
      
      console.log('Message: ' + mqttMessage + ';  Topic: ' + message.topic);

      switch(topic){
        case this.topics[0]: //Bell
          break;
        case this.topics[1]: //Light
            if(mqttMessage.toUpperCase().localeCompare("ON") == 0){
              this.isLightOn = true;
            }
            else this.isLightOn = false;
          break; 
        case this.topics[2]: //Door
          if(mqttMessage.toUpperCase().localeCompare("ON") == 0){
            this.isDoorOpen = true;
          }
          else this.isDoorOpen = false;
          break;
        case this.topics[3]: //Camera
          if(mqttMessage.toUpperCase().localeCompare("ON") == 0){
            this.isCameraOn = true;
          }
          else this.isCameraOn = false;
          break;
      }
    });

    console.log('Subscribed to: ' + topic)
  }
}
