---
title: Raspberry Pi Setup Guide
contributors:
  - AustinSaintAubin
---

We recommend that you use a [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or [Raspberry Pi 2](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) because of the performance requirements of the Node.js application. If you a buying a raspberry pi, [buy a Raspberry Pi 3](https://www.amazon.com/Raspberry-Pi-RASP-PI-3-Model-Motherboard/dp/B01CD5VC92) or latest model.

#### Recommed Software (for a full web capatable CNC software stack):
* [jscut](http://jscut.org/jscut.html) (converts SVG files to CNC cutting paths)
* [Kiri:Moto](https://grid.space/kiri/?sm:CAM) (converts 3D models to 3D mesh CNC cutting paths)

## Raspberry Pi Install: System Preparation
### Install NOOBS & RASPBIAN on your Raspberry Pi
 - https://www.raspberrypi.org/downloads/noobs/

### Configure Raspberry Pi
 - https://www.raspberrypi.org/documentation/linux/usage/users.md
 - https://www.raspberrypi.org/documentation/configuration/raspi-config.md

```
# Change User Passwords
sudo passwd pi
sudo passwd root

sudo raspi-config
# Change Timezone
# Change Hostname
# Change Boot Option: Boot to CLI (No GUI)
```

### Updates & Upgrade System
```
# Update System
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
# sudo rpi-update. # Update Raspberry Pi kernel and firmware, [is already done with 'apt-get update / upgrade'](github.com/cncjs/cncjs/issues/97)

# Install Build Essentials & GIT
sudo apt-get install -y build-essential git

# Install Useful Tools (Optional)
sudo apt-get install htop iotop nmon lsof screen -y
```

#### **PAUSE HERE!!!, decide on which method to use:**
 - [Install Node.js via Package Manager](#install-nodejs-via-package-manager) *(Recommended)*
 - [Install Node.js via Node Version Manager (NVM)](#install-install-nodejs-via-node-version-manager-nvm)
 - [Install Node.js Manually](#install-nodejs-manually)
 - Additional Configuration Options
	 - [Wireless Setup](#wireless-setup)

---------

### [Install Node.js via Package Manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
```
# Install Node.js via Package Manager & Add Package Source
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs  # npm nodejs-legacy #(Installed with nodesource)
```

### Update Node Package Manager (NPM)
```
# Update Node Package Manager (NPM)
sudo npm install npm@latest -g

# Get Version info
echo "[NPM] ============"; which npm; npm -v;
echo "[NODE] ============"; which node; node -v
```

~~### Install Node.JS Serial Port application first (OPTIONAL)
```npm install serialport```~~

### Install CNC.js
```sudo npm install -g cncjs --unsafe-perm```

### Install [Production Process Manager [PM2]](http://pm2.io)
```
# Install PM2
sudo npm install -g pm2

# Setup PM2 Startup Script
# sudo pm2 startup  # To Start PM2 as root
pm2 startup  # To start PM2 as pi / current user
  #[PM2] You have to run this command as root. Execute the following command:
  sudo su -c "env PATH=$PATH:/usr/bin pm2 startup linux -u pi --hp /home/pi"

# Start CNC.js (on port 8000) with PM2
pm2 start $(which cnc) -- --port 8000

# Set current running apps to startup
pm2 save

# Get list of PM2 processes
pm2 list
```

### Iptables (allow access to port 8000 from port 80)
```
# Iptables (allow access to port 8000 from port 80)
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8000

# Make Iptables Persistent
sudo apt-get install iptables-persistent -y

# How-to: Save & Reload Rules
#sudo netfilter-persistent save
#sudo netfilter-persistent reload

# How-to: Manually Save Rules
#sudo sh -c "iptables-save > /etc/iptables/rules.v4"
#sudo sh -c "ip6tables-save > /etc/iptables/rules.v6"

# Run this if issues to reconfigure iptables-persistent
# sudo dpkg-reconfigure iptables-persistent
```

### Reboot to test
```sudo reboot```

#### **You're Done, STOP HERE!!!**
The information below is a breakdown of the process above with different / additional options as part of a separate process.

-----------

## [Install Install Node.js via Node Version Manager (NVM)](https://github.com/creationix/nvm)
### [Install Node Version Manager (NVM)](https://github.com/creationix/nvm)

```
# Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash

# Rerun Profile script to start NVM
source ~/.bashrc  # Rerun profile after installing nvm
```

### [Install Node.js via NVM](https://nodejs.org)
Installing an ARM-version of Node has become very easy:

```
# Install Node.js using Node Version Manager
nvm install 4  # Installs Node v4, (nvm install stable) installs Latest version of node
nvm use 4  # Sets Node to use v4
```

### [Update Node Package Manager (NPM)](https://docs.npmjs.com/getting-started/installing-node)
```npm install npm@latest -g```

To make sure it ran correctly, run ``npm -v``, ``nvm --version``, & ``node -v``. It should return the current versions.

```
# Output Node Related Version Info
echo "[NPM] ============"; which npm; npm -v;
echo "[NVM] ============"; nvm --version; nvm ls
echo "[NODE] ============"; which node; node -v
```

~~### Install Node.JS Serial Port application first (OPTIONAL)
```npm install serialport```~~

### Install CNC.js
```npm install -g cncjs```

### Allow access to port 8000 from port 80
```
# Allow access to port 8000 from port 80
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8000

# Make Iptables Persistent
sudo apt-get install iptables-persistent -y

# How-to: Save & Reload Rules
#sudo netfilter-persistent save
#sudo netfilter-persistent reload

# How-to: Manually Save Rules
#sudo sh -c "iptables-save > /etc/iptables/rules.v4"
#sudo sh -c "ip6tables-save > /etc/iptables/rules.v6"

# Run this if issues to reconfigure iptables-persistent
# sudo dpkg-reconfigure iptables-persistent
```


## Auto Start Options

### Install [Production Process Manager [PM2]](http://pm2.io)
```
# Install Production Process Manager [PM2]
npm install pm2 -g

# Start CNC.js (on port 8000) with PM2
pm2 start /home/pi/.nvm/versions/node/v4.5.0/bin/cnc -- --port 8000

# Setup PM2 Startup Script
pm2 startup debian
#[PM2] You have to run this command as root. Execute the following command:
sudo su -c "env PATH=$PATH:/home/pi/.nvm/versions/node/v4.5.0/bin pm2 startup debian -u pi --hp /home/pi"

# Set current running apps to startup
pm2 save

# Get list of PM2 processes
pm2 list
```

### Auto Start on Boot with cron (Alternative)
```
# Open crontab
crontab -u pi -e

# Paste the following into Cron Tab [ NOTE: which cnc  # used to find location of application ]
@reboot env PATH=$PATH:/home/pi/.nvm/versions/node/v4.5.0/bin /home/pi/.nvm/versions/node/v4.5.0/bin/cnc >> $HOME/cncjs.log 2>&1
```

#### **You're Done, STOP HERE!!!**

---------

### Install Node.js Manually
Information on how to install Node.js on Raspberry Pi 1 or ARM6 devices

```
# Install Node.js [Manually] 
wget https://nodejs.org/dist/v4.5.0/node-v4.5.0-linux-armv6l.tar.xz
tar -xvf node-v4.5.0-linux-armv6l.tar.xz 
cd node-v4.5.0-linux-armv6l
sudo cp -R * /usr/local/
```
Resume install at [Update Node Package Manager (NPM)](#update-node-package-manager-npm)

---------

## Maintaining your Software Stack w/ Updates & Upgrades
### Updates & Upgrade System
```
# Update System
sudo apt-get update
sudo apt-get upgrade -y  # Should also update Node.js if you used method #1
sudo apt-get dist-upgrade -y
# sudo rpi-update. # Update Raspberry Pi kernel and firmware, [is already done with 'apt-get update / upgrade'](github.com/cncjs/cncjs/issues/97)
```

### Update Node Package Manager (NPM)
```
# Update Node Package Manager (NPM)
sudo npm install npm@latest -g

# Get Version info
echo "[NPM] ============"; which npm; npm -v;
echo "[NODE] ============"; which node; node -v
```

### Update CNC.js
```
# Stop CNC.js in PM2 
pm2 stop cnc

# Update CNC.js
sudo npm update -g cncjs --unsafe-perm  # If fails, then reinstall CNC.js ( sudo npm uninstall -g cncjs; sudo npm install -g cncjs --unsafe-perm ) | https://github.com/cncjs/cncjs/issues/78

# Restart CNC.js in PM2
pm2 start cnc
```

### [Update Production Process Manager [PM2]](http://pm2.keymetrics.io/docs/usage/update-pm2/)
```
# First make sure that you save all your processes:
pm2 save

Then install the latest PM2 version from NPM:
sudo npm install pm2 -g

And finally update the in-memory PM2 process:
pm2 update
```

---------

# [TinyWeb Console for 320x240 LCD Display](https://github.com/cncjs/cncjs-pendant-tinyweb/)

```
# Remove Older Downloads
rm *tinyweb.zip

# Download TinyWeb Example
wget https://github.com/cncjs/cncjs-pendant-tinyweb/releases/download/latest/cncjs-pendant-tinyweb-1.0.0-613f598.zip

# Extract Achieve
unzip *tinyweb.zip -d /home/pi/

# How-to Start CNC.js w/ mounted TinyWeb
#cnc -m /tinyweb:/home/pi/tinyweb

# Start CNC.js (on port 8000) with PM2 w/ mounted TinyWeb
pm2 stop cnc  # stop pervious instance
pm2 delete cnc  # delete pervious instance
pm2 start $(which cnc) -- --port 8000 -m /tinyweb:/home/pi/tinyweb
pm2 save # Set current running apps to startup
```

---------

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

---------
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

## Run Script & Test
```sudo python3 /root/shutdown_button_pi.py```

## Autostart Script
```
# Run Crontab
sudo crontab -e

# Now, enter the line:
@reboot sudo /usr/bin/python3 /root/shutdown_button_pi.py > /root/shutdown_button_pi.log 2>&1
```
