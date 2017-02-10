---
title: User Guide
---

## index

* [Workspace](#workspace)
  - [Widgets](#widgets)
* [Settings](#settings)
  - [General](#general)
  - [Account](#account)
* [Keyboard Shortcuts](#keyboard-shortcuts)
* [Contour ShuttleXpress](#contour-shuttlexpress)

---

## Workspace

### Widgets

![](https://raw.githubusercontent.com/cncjs/cncjs/master/media/widgets.png)

#### Visualizer Widget

This widget visualizes a G-code file and simulates the tool path.

#### Connection Widget

This widget lets you establish a connection to a serial port.

#### Axes Widget

This widget shows the XYZ position. It includes jog controls, homing, and axis zeroing.

#### Console Widget

This widget lets you read and write data to the CNC controller connected to a serial port.

#### G-code Widget

This widgets shows the current status of G-code commands.

#### Grbl Widget

This widet shows the Grbl state and provides Grbl specific features.

Set `$10=2` for Grbl v1.1d (or `$10=15` for Grbl v0.9) to see planner buffer and receive buffer in queue reports.

![](https://cloud.githubusercontent.com/assets/447801/20649442/5912660e-b4fb-11e6-8ff8-60b2602f5d79.png)

#### Smoothie Widget

This widget shows the Smoothie state and provides Smoothie specific features.

#### TinyG widget

This widget shows the TinyG state and provides TinyG specific features.

#### Laser Widget

This widget allows you control laser intensity and turn the laser on/off.

#### Probe Widget

This widget helps you use a touch plate to set your Z zero offset.

#### Spindle Widget

This widget provides the spindle control.

#### Webcam Widget

This widget lets you monitor a webcam.

Checkout [FAQ](https://cnc.js.org/docs/faq/) to learn how to setup and configure webcam streaming with Raspberry Pi.

---

## Settings

### General

### Account

![image](https://cloud.githubusercontent.com/assets/447801/20375707/d036adbe-acbb-11e6-8b3f-514c06e7c9e4.png)

---

## Keyboard Shortcuts
These are the current keys used in the cnc (from v0.15.3).<br>
<kbd>!</kbd> - Feed Hold<br>
<kbd>~</kbd> - Resume<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>h</kbd> - Homing<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>u</kbd> - Unlock<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>r</kbd> - Reset<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>x</kbd> - Select/Deselect X Axis<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>y</kbd> - Select/Deselect Y Axis<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>z</kbd> - Select/Deselect Z Axis<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>=</kbd> - Switch Jog Distance<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>[</kbd> - Jog Backward<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>]</kbd> - Jog Forward<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>7</kbd> - Shuttle Backward (Fastest)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>6</kbd> - Shuttle Backward (Faster)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>5</kbd> - Shuttle Backward (Fast)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>4</kbd> - Shuttle Backward (Normal)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>3</kbd> - Shuttle Backward (Slow)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>2</kbd> - Shuttle Backward (Slower)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>1</kbd> - Shuttle Backward (Slowest)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>0</kbd> - Shuttle Stop<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>1</kbd> - Shuttle Forward (Slowest)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>2</kbd> - Shuttle Forward (Slower)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>3</kbd> - Shuttle Forward (Slow)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>4</kbd> - Shuttle Forward (Normal)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>5</kbd> - Shuttle Forward (Fast)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>6</kbd> - Shuttle Forward (Faster)<br>
<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>7</kbd> - Shuttle Forward (Fastest)<br>

---

## Contour ShuttleXpress
You can use the ShuttleXpress jog dial to work with a CNC controller. The ShuttleXpress has five programmable buttons, a 10 counts jog dial (the inner wheel), and a 15-position shuttle wheel (the outer wheel) that returns to center when released.

![](https://raw.githubusercontent.com/cncjs/cncjs/dev/media/ShuttleXpress.jpg)

To work with cnc, configure three buttons to select/deselect X/Y/Z axis, and another one button to switch the distance value. Set turn jog dial left (CCW) to jog backward/down, and set turn jog right (CW) to jog forward/up.

### ShuttleXpress Settings

#### Buttons
* Button 2 - Select/Deselect X Axis<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>x</kbd>
* Button 3 - Select/Deselect Y Axis<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>y</kbd> 
* Button 4 - Select/Deselect Z Axis<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>z</kbd> 
* Button 5 - Switch Jog Distance (1, 0.1, 0.01, 0.001, or a custom value)<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>=</kbd> 

#### Jog Wheel
* Turn Jog Left<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>[</kbd> 
* Turn Jog Right<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>]</kbd> 

#### Shuttle Wheel

Adjust the keystroke repeat rate to **10 times per second** for all Shuttle Zones except the Shuttle Zone 0.

* Shuttle Zone -7<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>7</kbd>
* Shuttle Zone -6<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>6</kbd>
* Shuttle Zone -5<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>5</kbd>
* Shuttle Zone -4<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>4</kbd>
* Shuttle Zone -3<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>3</kbd>
* Shuttle Zone -2<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>2</kbd>
* Shuttle Zone -1<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>1</kbd>
* Shuttle Zone 0<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>0</kbd>
* Shuttle Zone 1<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>1</kbd>
* Shuttle Zone 2<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>2</kbd>
* Shuttle Zone 3<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>3</kbd>
* Shuttle Zone 4<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>4</kbd>
* Shuttle Zone 5<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>5</kbd>
* Shuttle Zone 6<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>6</kbd>
* Shuttle Zone 7<br>
  <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>command</kbd> + <kbd>7</kbd>

#### Reduce humming sound when accelerating and decelerating
If you'd hear a strange humming noise during acceleration and deceleration, try to increase the max feed rate and the acceleration speed, and make sure it will not miss steps. Use '$'-commands to tweak Grbl system settings, like below:
```
> $$
   :    :
$110=2500.000 (x max rate, mm/min)
$111=2500.000 (y max rate, mm/min)
$112=500.000 (z max rate, mm/min)
$120=250.000 (x accel, mm/sec^2)
$121=250.000 (y accel, mm/sec^2)
$122=50.000 (z accel, mm/sec^2)
   :    :
ok
> $110=2500.000
ok
> $120=250.00
ok
```
In the general case, higher acceleration (mm/sec^2) can significantly reduce humming sound when accelerating and decelerating, but you may need to adjust various settings with your CNC machine. To adjust ShuttleXpress specific settings, click on the <kbd><img src="https://cdn.rawgit.com/cncjs/cncjs/master/media/font-awesome/black/svg/cog.svg" width="16" title="Edit" /></kbd> button at the top of the Axes widget.

![](https://raw.githubusercontent.com/cncjs/cncjs/master/media/widgets/axes-settings.png)
* Feed Rate Range: 100-2500 mm/min (default: 500-2000 mm/min)
  - Defines the minimum feed rate for Shuttle Zone +1 and -1
  - Defines the maximum feed rate for Shuttle Zone +7 and -7
* Repeat Rate: 60Hz - 1Hz (default: 10Hz)
  - The repeat rate should be equal to your keystroke repeat rate for each Shuttle Zones. 
* Distance Overshoot: 1x - 1.5x (default: 1x)
  - Defines the overshoot of the travel distance
