#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>


const int LEDPIN = 2;

//WIFI
const char* ssid = "Honor 8X";
const char* password =  "i2e45678";

//MQTT
const char* mqtt_server = "YOUR_MQTT_BROKER_IP_ADDRESS";
WiFiClient espClient;
PubSubClient client(espClient);
void callback(char* topic, byte* message, unsigned int length);


void setup() {
  
  pinMode(LEDPIN, OUTPUT);  
  pinMode(3, INPUT);

  WiFi.begin(ssid, password);

  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  if (String(topic) == "/house/front/door/light") {
    Serial.print("Changing output to ");
    if(messageTemp == "on"){
      Serial.println("on");
      digitalWrite(LEDPIN, HIGH);
    }
    else if(messageTemp == "off"){
      Serial.println("off");
      digitalWrite(LEDPIN, LOW);
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("DoorClient")) {
      Serial.println("connected");


      client.subscribe("/house/front/door/light");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");

      delay(5000);
    }
  }
}

void loop() {

    if (!client.connected()) {
    reconnect();
  }

  client.loop();


  Serial.println("Ring one time");
  client.publish("/house/front/door/bell", "ring");


  delay(500000);
}

