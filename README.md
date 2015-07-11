# nAnimation

a generic javascript animation library

## Overview

There are a lot of great JavaScript animation libraries but all of them were either too complex or bulky for my needs. They all offered a host/slew of features that I didn't need. So I set out to write something simpler for myself. I ended up with `nAnimation`.

In actuallity, it doesn't really do any kind of animation. All it does is let you run a **function** an **X** # of times for a **Y** duration using an **optional easing function**. The function can then do whatever you need/want. At each frame/call the function is passed one paramater: a `rate`. The `rate` is a number between `0` and `1` and represents the `% complete` for each frame/call. (However, it is possible that some of the easing functions will result in a number larger then 1 during the duration.) The rate will always be `0` at the first frame/call and 1 at the last frame/call.

You can, in turn, use `rate` to do anything, including animations. For example, if the function sets the width of an element to be `rate * width` then the element will grow from `0` to `width` over the duration.

## Credits

I didn't really actually create anything special; I was able to piece together different things I found online to do what I need. The resources I used:

 1. `requestAnimationFrame` from https://gist.github.com/paulirish/1579671
 2. a cool animation wrapper by Dmitri Lau (http://www.sitepoint.com/simple-animations-using-requestanimationframe/)
 3. `jQuery`'s easing functions from https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

## How To Use

### To Start An Animation

    nAnimate.start([duration in milliseconds], [function to call with the % complete], [(optional) name of the easing function to use]);

For example:

    nAnimate.start(1000, function(rate)
    {
        element.style.width = 100 + (rate * 200) + "px";
    });
    
    nAnimate.start(2000, function(rate)
    {
        element.style.height = 100 + (rate * 200) + "px";
    }, "easeInQuart");
  
### To Start An Animation

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

Check the `example.html` file for an example and to see how each easing function looks.
