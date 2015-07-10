# nAnimation
generic javascript animation library

## Overview

I needed a generic animation wrapper so I created `nAnimation`. All it does is pull from various libraries that already exist online.

 1. requestAnimationFrame from https://gist.github.com/paulirish/1579671
 2. a cool animation wrapper by Dmitri Lau (http://www.sitepoint.com/simple-animations-using-requestanimationframe/)
 3. jQuery's easing functions from https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

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
