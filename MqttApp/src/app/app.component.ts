import { Component } from '@angular/core';
import * as mqtt from 'mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MqttApp';
  lightOn = false;

 /* var client = mqttt.connect('mqtt://test.mosquitto.org')

    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt')
        }
      })
    })

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })*/

  lightClick() {
    var message= "off"
    if(this.lightOn){
      message = "on"
    }
  }
}
