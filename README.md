# nAnimation
generic javascript animation library

http://imthenachoman.github.io/nAnimation/

## Table of Contents

 1. [Overview](#overview)
 2. [Credits](#credits)
 3. [How To Use](#how-to-use)
	 1. [CDN](#cdn)
	 2. [To Start An Animation](#to-start-an-animation)
	 3. [To End An Animation](#to-end-an-animation)
	 4. [To Get An Array Of The Available Easing Functions](#to-get-an-array-of-the-available-easing-functions)
 4. [Example](#example)

## Overview

There are a lot of great JavaScript animation libraries but all of them were either too complex or bulky for my needs. They all offered a host/slew of features that I didn't need. So I set out to write something simpler for myself. I ended up with `nAnimation`.

`nAnimation` doesn't really do any kind of animation; it lets you run a **function** an **X** # of times for a **Y** duration using an **optional easing function**. The function is called on each frame and can do whatever you need/want. At each frame/call the function is passed one paramater: a `rate`. The `rate` is a number between `0` and `1` and represents the `% complete` for each frame/call. (However, it is possible that some of the easing functions will result in a number larger then 1 ***during*** the duration.) The rate will always be `0` at the first frame/call and 1 at the last frame/call.

You can, in turn, use `rate` to do anything, including animations. For example, if the function sets the `width` of an element to be `rate * width` then the element will grow from `0` to `width` over the duration.

## Credits

I didn't really actually create anything special; I was able to piece together different things I found online to do what I need. The resources I used:

 1. `requestAnimationFrame` from https://gist.github.com/paulirish/1579671
 2. a cool animation wrapper by Dmitri Lau (http://www.sitepoint.com/simple-animations-using-requestanimationframe/)
 3. `jQuery`'s easing functions from https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 4. Robert Penners easing equations from http://robertpenner.com/easing/

## How To Use

### CDN

 - http://imthenachoman.github.io/nAnimation/nAnimation.1.0.min.js
 - http://imthenachoman.github.io/nAnimation/nAnimation.1.0.js

### To Start An Animation

    nAnimate.start([duration in milliseconds], [function to call with the % complete], [(optional) name of the easing function to use]);

For example:

    nAnimate.start(1000, function(rate)
    {
        // grow the div width from 100 to 300
        element.style.width = 100 + (rate * 200) + "px";
    });
    
    nAnimate.start(2000, function(rate)
    {
        element.style.height = 100 + (rate * 200) + "px";
    }, "easeInQuart");
  
### To End An Animation

`nAnimate.start` will return an `ID`. Use the `ID` to cancel.

    nAnimate.stop([ID]);

For example:

    var ID = nAnimate.start(1000, function(rate)
    {
        element.style.width = 100 + (rate * 200) + "px";
    });
    
    nAnimate.stop(ID);
  
### To Get An Array Of The Available Easing Functions

    nAnimate.easingFunctions();

For example:

    var easingFunctions = nAnimate.easingFunctions();

## Example

Check http://jsfiddle.net/imthenachoman/q1tdx8s4/ or the `example.html` file for an example and to see how each easing function looks.
