import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription;

  constructor(private mqttService : MqttService){}

  ngOnInit() {
    this.topics.forEach(topic => {
      this.subscribeNewTopic(topic)
    });
  }

  ngOnDestroy() {}

  subscribeNewTopic(topic : string): void {
    console.log('inside subscribe new topic')
    this.subscription = this.mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      let msg  = message.payload.toString();
      console.log('Message: ' + msg + ' for topic: ' + message.topic);

      switch(topic){
        case this.topics[0]:
          break;
        case this.topics[1]:
            if(msg.toUpperCase().localeCompare("ON") == 0){
              this.lightOn = true;
            }
            else{
              this.lightOn = false;
            }
          break; 
      }
    });

    console.log('subscribed to topic: ' + topic)
  }

  lightClick() {
    this.lightOn = !this.lightOn;
    if(this.lightOn){
      console.log("on");
      this.mqttService.unsafePublish(this.topics[1], "on", {qos: 0, retain: false})
    }
    else{
      console.log("off");
      this.mqttService.unsafePublish(this.topics[1], "off", {qos: 0, retain: false})
    }
    
  }

  doorClick(){
    
  }
}
