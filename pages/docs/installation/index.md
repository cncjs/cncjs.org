---
title: Installation
contributors:
  - cheton
  - AustinSaintAubin
  - MitchBradley
  - thijstriemstra
---

## index

* [Raspberry Pi Setup Guide](#raspberry-pi-setup-guide)
* [Getting Started](#getting-started)
* [Git Installation](#git-installation)
* [Docker Images](#docker-images)

---

## Raspberry Pi Setup Guide

We have a dedicated setup guide for setting up Node.js, NVM, CNC.js, Autostart with pm2, all tested on the Raspberry Pi. Go to https://github.com/cncjs/cncjs/wiki/Setup-Guide:-Raspberry-Pi-%7C-Install-Node.js-via-Package-Manager-*(Recommended)* for more details.

---

## Getting Started

### Node.js Installation

Node.js 8 is recommended. You can install [Node Version Manager](https://github.com/creationix/nvm) to manage multiple Node.js versions. If you have `git` installed, just clone the `nvm` repo, and check out the latest version:
```
git clone https://github.com/creationix/nvm.git ~/.nvm
cd ~/.nvm
git checkout `git describe --abbrev=0 --tags`
cd ..
. ~/.nvm/nvm.sh
```

Add these lines to your `~/.bash_profile`, `~/.bashrc`, or `~/.profile` file to have it automatically sourced upon login: 
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

Once installed, you can select Node.js versions with:
```
nvm install 8
nvm use 8
```

### Installation

Install cncjs as a non-root user, or the [serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport) module may not install correctly on some platforms like Raspberry Pi.
```
npm install -g cncjs
```

If you're going to use sudo or root to install cncjs, you need to specify the `--unsafe-perm` option to run npm as the root account.
```
sudo npm install --unsafe-perm -g cncjs
```

It's recommended that you run the [RaspberryPi OS](https://www.raspberrypi.com/software/operating-systems/).

Check out [https://cnc.js.org/docs/installation/](https://cnc.js.org/docs/installation/) for other installation methods.

### Upgrade

Run `npm install -g cncjs@latest` to install the latest version. To determine the version, use `cnc -V`.

### Usage

Run `cncjs` to start the server, and visit `http://yourhostname:8000/` to view the web interface. Pass `--help` to `cnc` for more options.

```
pi@rpi3$ cncjs -h

  Usage: cncjs [options]
  
  Options:

    -h, --help                          output usage information
    -V, --version                       output the version number
    -p, --port                          set listen port (default: 8000)
    -l, --host                          set listen address or hostname (default: 0.0.0.0)
    -b, --backlog                       set listen backlog (default: 511)
    -c, --config <filename>             set config file (default: ~/.cncrc)
    -v, --verbose                       increase the verbosity level
    -m, --mount [<url>:]<path>          set the mount point for serving static files (default: /static:static)
    -w, --watch-directory <path>        watch a directory for changes
    --access-token-lifetime <lifetime>  access token lifetime in seconds or a time span string (default: 30d)
    --allow-remote-access               allow remote access to the server
    --controller <type>                 specify CNC controller: Grbl|Smoothie|TinyG|g2core (default: '')

  Examples:

    $ cncjs -vv
    $ cncjs --mount /pendant:/home/pi/tinyweb
    $ cncjs --watch-directory /home/pi/watch
    $ cncjs --access-token-lifetime 60d  # e.g. 3600, 30m, 12h, 30d
    $ cncjs --allow-remote-access
    $ cncjs --controller Grbl
```

Instead of passing command line options for `--watch-directory`, `--access-token-lifetime`, and `--allow-remote-access`, you can create a `~/.cncrc` file that contains the following configuration in JSON format:
```json
{
    "watchDirectory": "/path/to/dir",
    "accessTokenLifetime": "30d",
    "allowRemoteAccess": false,
    "controller": ""
}
```

To troubleshoot issues, run:
```
cncjs -vvv
```

### Configuration File

The configuration file <b>.cncrc</b> contains settings that are equivalent to the cnc command-line options. The configuration file is stored in user's home directory. To find out the actual location of the home directory, do the following:

* Linux/Mac
  ```sh
  echo $HOME
  ```

* Windows
  ```sh
  echo %USERPROFILE%
  ```

Check out an example configuration file [here](https://github.com/cncjs/cncjs/blob/master/examples/.cncrc).

### File Format
```json
{
  "ports": [
     {
       "comName": "/dev/ttyAMA0",
       "manufacturer": ""
     }
  ],
  "baudrates": [115200, 250000],
  "watchDirectory": "/path/to/dir",
  "accessTokenLifetime": "30d",
  "allowRemoteAccess": false,
  "controller": "",
  "state": {
    "checkForUpdates": true
  },
  "commands": [
    {
      "title": "Update (root user)",
      "commands": "sudo npm install -g cncjs@latest --unsafe-perm; pkill -a -f cncjs"
    },
    {
      "title": "Update (non-root user)",
      "commands": "npm install -g cncjs@latest; pkill -a -f cncjs"
    },
    {
      "title": "Reboot",
      "commands": "sudo /sbin/reboot"
    },
    {
      "title": "Shutdown",
      "commands": "sudo /sbin/shutdown"
    }
  ],
  "events": [],
  "macros": [],
  "users": []
}
```

---

## Git Installation

If you prefer to use Git instead of `npm install`, You can create a local clone of the repository on your computer and sync from GitHub. Type the following commands to install and run `cncjs`:
```
git clone https://github.com/cncjs/cncjs.git
cd cncjs
git checkout master
npm install
npm run prepublish
./bin/cncjs
```

To update your local copy with latest changes, use:
```
git checkout master
git pull origin master
npm install
npm run prepublish
./bin/cncjs
```

This is the fastest method to bring your local copy up-to-date.

---

## Docker Image Installation (x64 only)

Alternatively, you can install and run a Docker image within a Docker container. The first installation may take a long time to complete, but further updates will be much faster.

To install and set up cncjs, take the following steps:

<b>Step 1:</b> Enter the following command to retrieve the latest version of the image:
```
docker pull cncjs/cncjs:latest
```

<b>Step 2:</b> Use the `docker run` command to create the Docker container and run the server, like so:
```
docker run --privileged -p 8000:8000 --rm --name cncjs cncjs/cncjs:latest
```
By default a container is not allowed to access any devices, but a "privileged" container is given access to all devices on the host.

<b>Step 3:</b> If everything works fine, you should be able to view the web interface at `http://yourhostname:8000/`.

### Docker Images

https://hub.docker.com/r/cncjs/cncjs/tags/

### Tips

If you run into issues and need to restart the Docker container, use the following commands to first stop the Docker application, and then start it up again:
```
docker stop cncjs
docker start cncjs 
```

To view a list of all containers that are currently running in your Docker environment, use:
```
docker ps
```

To view all the images you have pulled into your Docker environment, use:
```
docker images
```

To delete containers in your Docker environment, use:
```
docker rm CONTAINER_ID
```

To delete images in your Docker environment, use:
```
docker rmi IMAGE_ID
```

To view the container in your terminal, use:
```
docker attach cncjs
```
