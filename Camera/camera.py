#!/usr/bin/env python
import paho.mqtt.client as mqtt
import os
import subprocess
import time

def handle(client, userdata, message):
    topic = str(message.topic)
    message = str(message.payload.decode("utf-8"))
    if(topic == "/htl/4ahif/house/front/door/camera"):
        if (message == "on"):
            print("recieved message: camera on")
            os.system("sudo service motion start")
            #subprocess.run(["ls","-la"])
            #subprocess.run(["sudo","service","motion","start"])
            print("stream is on")
        elif (message == "off"):
            print("recieved message: camera off")
            os.system("sudo service motion stop")
            #subprocess.run(["sudo","service","motion","stop"])
            print("stream is off")
        else:
            return
    elif(topic == "/htl/4ahif/house/front/door/bell"):
        print("recieved message from bell")
        if(message == "ring"):
            #subprocess.run(["sudo","service","motion","start"])
            client.publish("/htl/4ahif/house/front/door/camera", "on", 0, true)

client = mqtt.Client("haustuer")

client.connect("broker.hivemq.com", 1883)

client.subscribe("/htl/4ahif/house/front/door/camera")
client.subscribe("/htl/4ahif/house/front/door/bell")
print("connected to broker")
client.on_message = handle
client.loop_start()
print("client started")
while(1):
    time.sleep(1)
