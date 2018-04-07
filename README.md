# oscAutomataPD
Headless puredata patches running on a raspberry pi and controlled from any device browser :-)

An experimental ongoing project to control puredata on a raspberry pi from any browser. 
You can use any device conected to the same network or creating your own acces point . 
( I used https://github.com/billz/raspap-webgui wich is very easy to setup and usefull ) 

you will need:
- git clone https://github.com/CarloCattano/oscAutomataPD.git
- cd oscAutomataPD
- npm install socket.io nexusui express http dgram osc-min
- change line 41 on index.html and replace the ip with your pi IP : const socket = io('yourIP:8000');
- To run the pd patch from terminal open a terminal and write the following commands.
  This command is for my own setup using external audio soundcard and 1 midi controller:
    - pd -nogui -r 44100 -verbose -audioadddev MobilePre -audiobuf 32 -midiaddindev /dev/midi2 main.pd
    **you should be fine with:  pd -nogui main.pd 
    (check pd -h for a detailed list of commands)

-Then in another terminal : node app.js 
            this will start the server

-Connect a device to the same WiFi network and browse to [yourPiIP:8000] 
  you should see the UI and be able to control the patch.
  **Tested with firefox and chrome from android and iOS devices.

This is an open project and I encourage you to give me a hand if you can , since I have limited time and skills

Currently :
-Adding GPIO control to send digital control voltages out from the Pi pins , controled from pd . Using PDWiringPi
https://github.com/garthz/pdwiringPi (done)
-Adding Abl_link~ Ableton Link to Syncronize with other LINK enabled devices on a network with puredata. (done)
-Now using RaspAp to create an independent Wifi-Hotspot from the Pi to Acces LINK and UI control  (done)
https://github.com/billz/raspap-webgui


Current Bugs:
-Arpegiator sliders dont work on mobile for some reason 
  (blames nexusUI instead of his own lack of knowledge)
-...

Im using the excelent Automatonism modules for puredata . https://www.automatonism.com/the-software/  An amazing resource of well done abstractions with a modular approach to get sounding in no time.
