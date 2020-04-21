#!/usr/bin/env python
import paho.mqtt.client as mqtt
import os
import subprocess
import time

def handle(client, userdata, message):
    topic = str(message.topic)
    print("handle")
    message = str(message.payload.decode("utf-8"))
    if(topic == "/htl/4ahif/house/front/door/camera"):
        print("cam")
        if (message == "on"):
            print("on")
            os.system("sudo service motion start")
            #subprocess.run(["ls","-la"])
            #subprocess.run(["sudo","service","motion","start"])
            print("stream on")
        elif (message == "off"):
            print("off")
            os.system("sudo service motion stop")
            #subprocess.run(["sudo","service","motion","stop"])
            print("stream off")
        else:
            return
    elif(topic == "/htl/4ahif/house/front/door/bell"):
        print("bell")
        if(message == "ring"):
            os.system("sudo service motion start")
            #subprocess.run(["sudo","service","motion","start"])
            print("ring")

client = mqtt.Client("haustuer")

client.connect("broker.hivemq.com", 1883)

client.subscribe("/htl/4ahif/house/front/door/camera")
client.subscribe("/htl/4ahif/house/front/door/bell")
print("test")
client.on_message = handle
client.loop_start()
print("test2")
while(1):
    #client.publish("/htl/4ahif/house/front/door/camera","on")
    time.sleep(1)
#https://www.digikey.com/en/maker/blogs/2019/how-to-use-mqtt-with-the-raspberry-pi