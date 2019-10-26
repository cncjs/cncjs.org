---
title: CNCjs and Shapeoko
contributors:
  - eciramella
---

# Using CNCjs with a Shapeoko

## Why?
This is the first question you need to ask yourself - why?  If you're new to the world of CNC and Shapeoko and you find yourself here, you may want to try using the Carbide provided solutions for a bit until you have a degree of comfort.

At some point, you'll seek greater configurability, flexibility, and visibility into how your gcode is being processed.  If you're at this point, read on...

### PI and CNCjs - what problems does this solve?
#### Protect that expensive computer!
If you don't want to bring an expensive computer into a dusty environment, this could be the way forward.

Leveraging the inexpensive Raspberry PI platform, you can build a (relatively) cheap sending unit (ie: the computer attached to your Shapeoko that streams the gcode to the Shapeoko's board).

There are kits you can buy now that include everything you need to have a working Raspberry PI rig for $64 (for a B+ board) to $114 (for a top-of-the-line PI 4).

While you can get away with cheaper PI's, you'll get what you pay for.

#### Carbide motion won't let me do XYZ!
CNCjs is like dedicated controller allowing all manner of control, configuration, and automation!  However, some of the learning process will be on you, dear reader.

There are tons of guides explaining grbl out there, where you can learn more.  These pages are not that.

You won't be LOSING any functionality by changing to CNCjs, you just may need to LEARN more (always a good thing).

With CNCjs, it's pretty trival to add a different touch plate, see realtime how many layers are left, where the toolpath will run relative to your hold downs, etc.

## How do I use CNCjs with my Shapeoko?
There are several ways to take advantage of CNCjs, but first and foremost, let's clear the air about a few misconceptions.

### Does this mean I need to rely on the internet to use my shapeoko?
**Nope** - and you really shouldn't be operating this machine unattended or remotely.  **CNCjs is NOT connected to across public internet space!**. This is the biggest misconception floating around. You'll be connecting via your local network.

### What's a local network?
If you have wifi at home, _that_ is your local network. With **option 1** above, you'll be connecting directly to your machine at your wifi speeds to upload your gcode, zero your machine, and start the cutting.  The Raspberry PI will have a DIRECT connection to your Shapeoko via USB.

If the concept of a local area network is a new concept to you, think about your local area network like a box.  Put your computer and your Shapeoko in this one box.  This is different to how something like the standard way  Easel works.  Traversing public internet space is  like two having boxes, your Shapeoko in one, and your computer in the other.

### So how does this work?
CNCjs is both the application to stream the gcode to your Shapeoko that also has a web interface.  You'll generate your gcode in any number of ways, then, you'll need to upload it to CNCjs

There are a configurations to be considered:

1) **Raspberry PI running headless**

  Headless simply means "no monitor attached".  This may be the most basic setup.  You can follow the [Raspberry PI setup guide](../rpi-setup-guide/) and choose any one of those setup options.
  
  The net result of this setup is a service running on the Raspberry PI that you can connect to from a browser on any device to control your Shapeoko.  Computer, tablet, phone - all can connect to your Raspberry PI on port 8000.  Something like:
  
  ```http://<your Raspberry PI>:8000```
  
  With this option, you install and connect to your PI via a number of the "pendants" available. Using the [shopfloor pendant ](https://github.com/cncjs/cncjs-shopfloor-tablet) with an iPad is a great option.  Each pendant will have instructions in its Github repo.
  
  **NOTE:** Unless you go out of your way, this option will always be available regardless of what one of these setups you choose.  This is the _**DEFAULT**_ behavior.

2) **Raspberry PI with monitor, keyboard, and mouse**

  Modern versions of the Raspberry PI are viable stand alone computers.  You could simply connect a monitor, keyboard, mouse, and your Shapeoko to the PI, and leave it this way.  Then you can launch any browser on the Raspberry PI and you can just go to:
   
   ```http://localhost:8000```
  
3) **Raspberry PI with a touchscreen**

  There are a number of touchscreen options that can turn the PI into an all-in-one, or a tablet.  This is a great option if you don't want a monitor in your shop.  It allows you to disconnect and bring it with you when you leave.  [Datron](https://www.datron.com/wp-content/uploads/2019/09/DATRON-neo_Benefits-Image-1b.png) makes a fantastic touchscreen interface if you need inspiration.  With this option, you launch any browser on the Raspberry PI (or use any of the pendants) and you can just go to:
   
   ```http://localhost:8000```

### How do I get my gcode to CNCjs?

There are a few ways and you don't have to choose just one.  

#### Upload the gcode via the UI
If the toolpath is pretty basic and the file small, you can upload via the web interface.  Keep in mind, if you choose this route, when the service restarts, the gcode is gone.

#### Using the 'watch directory' flag
However, if the toolpath is complex and the resulting gcode file is large, you can transfer it to the Raspberry PI via scp, or sftp, or even a thumbdrive.  Checkout the ```-w, --watch-directory <path>``` flag to specify where uploaded files go, then in the UI, you can choose any of the files you've uploaded.