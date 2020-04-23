import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

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

  topics = {
    bell:"/htl/4ahif/house/front/door/bell",
    light:"/htl/4ahif/house/front/door/light",
    door:"/htl/4ahif/house/front/door/door",
    camera:"/htl/4ahif/house/front/door/camera"
 }

  private subscription: Subscription;

  constructor(private mqttService : MqttService){}

  ngOnInit() {
    this.subscribeNewTopic(this.topics.bell)
    this.subscribeNewTopic(this.topics.camera)
    this.subscribeNewTopic(this.topics.door)
    this.subscribeNewTopic(this.topics.light)
  }

  ngOnDestroy() {}

  subscribeNewTopic(topic : string): void {
    console.log('inside subscribe new topic')
    this.subscription = this.mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      let msg  = message.payload.toString();
      console.log('Message: ' + msg + ' for topic: ' + message.topic);

      switch(topic){
      
        case this.topics.light:
            if(msg.toUpperCase().localeCompare("ON") == 0){
              this.lightOn = true;
            }
            else{
              this.lightOn = false;
            }
          break; 
        case this.topics.camera:
          if(msg.toUpperCase().localeCompare("ON") == 0){
            this.cameraOn = true;
          }
          else{
            this.cameraOn = false;
          }
          break;
        case this.topics.door:
          if(msg.toUpperCase().localeCompare("OPEN") == 0){
            this.doorOpen = true;
          }
          else{
            this.doorOpen = false;
          }
          break;
      }
    });

    console.log('subscribed to topic: ' + topic)
  }

  simplePublish(topic:String, message:String){
    this.mqttService.unsafePublish(topic.toString(), message.toString(), {qos: 0, retain: true})
  }

  lightonClick() {
    this.lightOn = !this.lightOn;
    if(this.lightOn){
      this.simplePublish(this.topics.light, "on")
    }
    else{
      this.simplePublish(this.topics.light, "off")
    }
    
  }

  dooronClick(){
    this.doorOpen = !this.doorOpen;
    if(this.doorOpen){
      this.simplePublish(this.topics.door, "open")
    }
    else{
      this.simplePublish(this.topics.door, "close")
    }
  }
  async cameraOnClick(){
    this.cameraOn = !this.cameraOn;
    if(this.cameraOn){
      this.simplePublish(this.topics.camera, "on")
      this.delay(5000).then(()=>
          window.location.reload()
      )
    }
    else{
      this.simplePublish(this.topics.camera, "off")
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
