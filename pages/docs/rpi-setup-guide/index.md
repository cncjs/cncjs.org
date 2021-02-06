---
title: Raspberry Pi Setup Guide
contributors:
  - AustinSaintAubin
---

# Raspberry Pi Setup Guide

The instructions for setting up CNCjs on a Raspberry Pi are given at [Raspberry Pi Setup Guide][https://github.com/cncjs/cncjs/wiki/Setup-Guide:-Raspberry-Pi-%7C-Install-Node.js-via-Package-Manager-%2A(Recommended)%2A]

The rest of this page lists some optional extra features that you might want to use.  They are not required for normal operation.

----------------------------------------

# [TinyWeb Console for 320x240 LCD Display](https://github.com/cncjs/cncjs/wiki/User-Guide#tinyweb-console-for-320x240-lcd-display)
```
# Remove Older Downloads
rm -r cncjs-pendant-tinyweb*

# Download TinyWeb Example
wget https://github.com/cncjs/cncjs-pendant-tinyweb/releases/download/latest/cncjs-pendant-tinyweb-1.0.0-613f598.zip

# Extract Archive & Delete
unzip cncjs-pendant-tinyweb*.zip -d /home/pi/
rm -r cncjs-pendant-tinyweb*.zip

# Move / Rename Tinyweb Directory
mv /home/pi/cncjs-pendant-tinyweb* /home/pi/tinyweb

# How-to Start CNCjs w/ the tiny web interface mounted at /tinyweb
cncjs -m /tinyweb:/home/pi/tinyweb/src

# Start CNCjs (on port 8000, /w Tinyweb) with PM2
pm2 stop cncjs  # stop pervious instance
pm2 delete cncjs  # delete pervious instance
pm2 start $(which cncjs) -- --port 8000 -m /tinyweb:/home/pi/tinyweb/src
pm2 save # Set current running apps to startup
```

----------------------------------------

# [Wireless Setup](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=139866
https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=139486

```
# Bring Wireless Up
sudo ifup wlan0

# Scan for wireless networks
sudo iwlist wlan0 scan

# Open the wpa-supplicant configuration file in nano:
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
# ----------
network={
  ssid="YOUR_SSID"
  scan_ssid=1
  psk="YOUR_PASSKEY"
  mode=0
  proto=WPA2
  key_mgmt=WPA-PSK
  pairwise=CCMP
  group=CCMP
  auth_alg=OPEN
  id_str="raspi"
  priority=1
}
# ----------

# Restart Interface
sudo ifdown wlan0
sudo ifup wlan0

# Check Interface for IP
ifconfig wlan0
```

----------------------------------------

# MJPEG-Streamer Install & Setup
- https://github.com/jacksonliam/mjpg-streamer
- http://raspberrypi.stackexchange.com/questions/36734/compile-mjpg-streamer-error

```
# Update & Install Tools
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential libjpeg8-dev imagemagick libv4l-dev cmake -y

# Clone Repo in /tmp
cd /tmp
git clone https://github.com/jacksonliam/mjpg-streamer.git
cd mjpg-streamer/mjpg-streamer-experimental

# Make
make
sudo make install

# Run
/usr/local/bin/mjpg_streamer -i "input_uvc.so -r 1280x720 -d /dev/video0 -f 30 -q 80" -o "output_http.so -p 8080 -w /usr/local/share/mjpg-streamer/www"
```

# MJPEG-Streamer Auto Start

## Manager Script
```
nano /home/pi/mjpg-streamer.sh
```
Add the below code to ( /home/pi/mjpg-streamer.sh )
```
#!/bin/bash
# chmod +x mjpg-streamer.sh
# Crontab: @reboot /home/pi/mjpg-streamer.sh start

MJPG_STREAMER_BIN="/usr/local/bin/mjpg_streamer" # "$(dirname $0)/mjpg_streamer"
MJPG_STREAMER_WWW="/usr/local/share/mjpg-streamer/www"
MJPG_STREAMER_LOG_FILE="$(dirname $0)/mjpg-streamer.log"
RUNNING_CHECK_INTERVAL="2" # how often to check to make sure the server is running (in seconds)
HANGING_CHECK_INTERVAL="3" # how often to check to make sure the server is not hanging (in seconds)

VIDEO_DEV="/dev/video0"
FRAME_RATE="30"
QUALITY="60"
RESOLUTION="VGA"  # 1920x1080, 1280x720, 640x480 (VGA, SVGA), 176x144, 160x120, 352x288, 320x240 (QVGA)
PORT="8080"
YUV="yes"

INPUT_OPTIONS="-r ${RESOLUTION} -d ${VIDEO_DEV} -f ${FRAME_RATE} -q ${QUALITY}"
if [ "${YUV}" == "true" ]; then
	INPUT_OPTIONS+=" -y"
fi

OUTPUT_OPTIONS="-p ${PORT} -w ${MJPG_STREAMER_WWW}"

# ==========================================================
function running() {
    if ps aux | grep ${MJPG_STREAMER_BIN} | grep ${VIDEO_DEV} >/dev/null 2>&1; then
        return 0

    else
        return 1

    fi
}

function start() {
    if running; then
        echo "already started"
        return 1
    fi

    export LD_LIBRARY_PATH="$(dirname $MJPG_STREAMER_BIN):."

	echo "Starting:  ${MJPG_STREAMER_BIN} -i \"input_uvc.so ${INPUT_OPTIONS}\" -o \"output_http.so ${OUTPUT_OPTIONS}\""
    ${MJPG_STREAMER_BIN} -i "input_uvc.so ${INPUT_OPTIONS}" -o "output_http.so ${OUTPUT_OPTIONS}" >> ${MJPG_STREAMER_LOG_FILE} 2>&1 &

    sleep 1

    if running; then
        if [ "$1" != "nocheck" ]; then
            check_running & > /dev/null 2>&1 # start the running checking task
            check_hanging & > /dev/null 2>&1 # start the hanging checking task
        fi

        echo "started"
        return 0

    else
        echo "failed to start"
        return 1

    fi
}

function stop() {
    if ! running; then
        echo "not running"
        return 1
    fi

    own_pid=$$

    if [ "$1" != "nocheck" ]; then
        # stop the script running check task
        ps aux | grep $0 | grep start | tr -s ' ' | cut -d ' ' -f 2 | grep -v ${own_pid} | xargs -r kill
        sleep 0.5
    fi

    # stop the server
    ps aux | grep ${MJPG_STREAMER_BIN} | grep ${VIDEO_DEV} | tr -s ' ' | cut -d ' ' -f 2 | grep -v ${own_pid} | xargs -r kill

    echo "stopped"
    return 0
}

function check_running() {
    echo "starting running check task" >> ${MJPG_STREAMER_LOG_FILE}

    while true; do
        sleep ${RUNNING_CHECK_INTERVAL}

        if ! running; then
            echo "server stopped, starting" >> ${MJPG_STREAMER_LOG_FILE}
            start nocheck
        fi
    done
}

function check_hanging() {
    echo "starting hanging check task" >> ${MJPG_STREAMER_LOG_FILE}

    while true; do
        sleep ${HANGING_CHECK_INTERVAL}

        # treat the "error grabbing frames" case
        if tail -n2 ${MJPG_STREAMER_LOG_FILE} | grep -i "error grabbing frames" > /dev/null; then
            echo "server is hanging, killing" >> ${MJPG_STREAMER_LOG_FILE}
            stop nocheck
        fi
    done
}

function help() {
    echo "Usage: $0 [start|stop|restart|status]"
    return 0
}

if [ "$1" == "start" ]; then
    start && exit 0 || exit -1

elif [ "$1" == "stop" ]; then
    stop && exit 0 || exit -1

elif [ "$1" == "restart" ]; then
    stop && sleep 1
    start && exit 0 || exit -1

elif [ "$1" == "status" ]; then
    if running; then
        echo "running"
        exit 0

    else
        echo "stopped"
        exit 1

    fi

else
    help

fi
```

## Start on Boot
```
# Make Executable
chmod +x /home/pi/mjpg-streamer.sh

# Open Cron Job
crontab -e

# Add line
@reboot /home/pi/mjpg-streamer.sh start
```

----------------------------------------

# FFMpeg
http://www.jeffreythompson.org/blog/2014/11/13/installing-ffmpeg-for-raspberry-pi/
```
# Run as Sudo
sudo -i

# INSTALL H264 SUPPORT
cd /usr/src
git clone https://code.videolan.org/videolan/x264.git
~~git clone git://git.videolan.org/x264~~
cd x264
./configure --host=arm-unknown-linux-gnueabi --enable-static --disable-opencl
make
sudo make install

# INSTALL FFMPEG (This may take a REALLY long time, so be patient.)
cd /usr/src
git clone https://github.com/FFmpeg/FFmpeg.git
cd FFmpeg
sudo ./configure --arch=armel --target-os=linux --enable-gpl --enable-libx264 --enable-nonfree
make
sudo make install
```

# Recored Stream w/ ffmpeg
```
# [Varables]
source_stram="http://xcarve:8080/?action=stream"
destination_directory="/home/pi/Videos"
destination_file="xcarve-recording_$(date +'%Y%m%d_%H%M%S').mpeg"

# Recored Stream w/ ffmpeg
ffmpeg -i "${source_stram}" "${destination_directory}/${destination_file}"
```

----------------------------------------

# [Raspberry Pi Shutdown Button & LED Script](https://twitter.com/AustinStAubin/status/798058374059335680)
Gracefully shutdown the Raspberry Pi using a hardware button.
- http://www.banggood.com/Power-Symbol-Latching-Switch-LED-Light-Push-Button-SPST-p-1064278.html
- https://cad.onshape.com/documents/94796d1c35c5a20444b82aa2/w/23a4445409a14a7f19bbd918/e/306a16744c5d0f265eb26f3c

NOTE: Jumping pins 5 & 6 (grounding GPIO3) will power on the RPi. So I altered the script to use GPIO3, rather than pin 40. Now I can use the same button to turn on and off the Pi!

[![Power Button Image](https://pbs.twimg.com/media/CxNE1T4UsAElq88.jpg)](https://twitter.com/AustinStAubin/status/798058374059335680)

## Python Script
```
sudo touch /root/shutdown_button_pi.py  # Create File
sudo chmod +x /root/shutdown_button_pi.py  # Make Executable
sudo nano /root/shutdown_button_pi.py  # Edit File
```

## Python Script: Interrupts & While Loop [For LED Button] (AWEOMENESSS!!!)

```
#!/usr/bin/env python
# Instll Python3 #sudo apt-get install python3
# Usage: sudo /usr/bin/python /root/shutdown_button_pi.py
# Install: sudo crontab -e
#          @reboot sudo /usr/bin/python3 /root/shutdown_button_pi.py > /root/shutdown_button_pi.log 2>&1

# Import the modules to send commands to the system and access GPIO pins
from subprocess import call
import RPi.GPIO as gpio
import time
#import os  # used to run shell commands to os

# Pins
button_pin = 7
led_pin = 11  # (3) comes on when pi starts, (11) shuts off when pi powers down.

# Define a function to keep script running
def loop():
    #input()  # (more efficient) but does not work with cron job
    while True:
        time.sleep(1)

# Define a function to blink LED
def blink_led(interations):
    for interation in range(interations):
        gpio.output(led_pin,gpio.HIGH)
        time.sleep(.5)
        gpio.output(led_pin,gpio.LOW)
        time.sleep(.5)
        gpio.output(led_pin,gpio.HIGH)

# Define a function to run when an interrupt is called
def shutdown(pin):
    # turn off led while pressed
    gpio.output(led_pin,gpio.LOW)

    #start counting pressed time
    pressed_time=time.monotonic()
    while gpio.input(button_pin): #call: is button still pressed
        # Get Button Pressed Time
        if time.monotonic()-pressed_time >= 3:
            #os.system("echo long press, powering down") #os.system("sudo reboot")
            blink_led(3)
            call('halt', shell=False)
            break

    # Turn LED back on
    gpio.output(led_pin,gpio.HIGH)

# Setup GPIO
gpio.setmode(gpio.BOARD) # Set pin numbering to board numbering

# Create Button Interrupt
gpio.setup(button_pin, gpio.IN) # Set up pin 7 as an input
gpio.add_event_detect(button_pin, gpio.RISING, callback=shutdown, bouncetime=200) # Set up an interrupt to look for button presses

# Setup Power LED
gpio.setup(led_pin, gpio.OUT, initial=1)

loop() # Run the loop function to keep script running
```

## Set to Executable
```
sudo chmod +x  /root/shutdown_button_pi.py
```

## Run Script & Test
```sudo python3 /root/shutdown_button_pi.py```

## Autostart Script
```
# Run Crontab
sudo crontab -e

# Now, enter the line:
@reboot sudo /usr/bin/python3 /root/shutdown_button_pi.py > /root/shutdown_button_pi.log 2>&1
```
