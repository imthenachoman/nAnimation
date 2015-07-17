/* nAnimation
 * ----------------------------------------------------------------------------
 * generic javascript animation library
 * 
 * version : 1.0
 * author  : Anchal Nigam
 * e-mail  : imthenachoman@gmail.com
 * url     : https://github.com/imthenachoman/nAnimation
 * 
 * Copyright (c) 2015 Anchal Nigam
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 * ----------------------------------------------------------------------------
 * Compressed using packer by Dean Edwards (http://dean.edwards.name/packer/) 
 * 
 * requestAnimationFrame - https://gist.github.com/paulirish/1579671
 * animations - http://www.sitepoint.com/simple-animations-using-requestanimationframe/
 * jquery easing functions - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 */

var nAnimate = (function()
{
    // default easing
    var defaultEasing = "easeOutQuad",
    // keep track of all the animations started so we can stop them
        animationCounter = 0,
        animationIDTracker = {},
        // https://gist.github.com/paulirish/1579671
        lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];
    
    var rAF = window.requestAnimationFrame, cAF = window.cancelAnimationFrame;
    
    // https://gist.github.com/paulirish/1579671
    for(var x = 0; x < vendors.length && !rAF; ++x)
    {
        rAF = window[vendors[x]+'RequestAnimationFrame'];
        cAF = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    
    rAF = rAF || function(callback, element)
    {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function()
        {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    
    cAF = cAF || function(id)
    {
        clearTimeout(id);
    };
    
    // jquery's easing functions - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
    var easingFunctions = {
        easeInQuad: function(t, b, c, d)
        {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function(t, b, c, d)
        {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(t, b, c, d)
        {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function(t, b, c, d)
        {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function(t, b, c, d)
        {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function(t, b, c, d)
        {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function(t, b, c, d)
        {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function(t, b, c, d)
        {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function(t, b, c, d)
        {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function(t, b, c, d)
        {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function(t, b, c, d)
        {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(t, b, c, d)
        {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function(t, b, c, d)
        {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(t, b, c, d)
        {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(t, b, c, d)
        {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function(t, b, c, d)
        {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function(t, b, c, d)
        {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function(t, b, c, d)
        {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function(t, b, c, d)
        {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function(t, b, c, d)
        {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function(t, b, c, d)
        {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function(t, b, c, d)
        {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c))
            {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function(t, b, c, d)
        {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c))
            {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function(t, b, c, d)
        {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c))
            {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function(t, b, c, d, s)
        {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function(t, b, c, d, s)
        {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function(t, b, c, d, s)
        {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function(t, b, c, d)
        {
            return c - easingFunctions.easeOutBounce(d - t, 0, c, d) + b;
        },
        easeOutBounce: function(t, b, c, d)
        {
            if ((t /= d) < (1 / 2.75))
            {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < (2 / 2.75))
            {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if (t < (2.5 / 2.75))
            {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function(t, b, c, d)
        {
            if (t < d / 2) return easingFunctions.easeInBounce(t * 2, 0, c, d) * .5 + b;
            return easingFunctions.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };
    
    // http://www.sitepoint.com/simple-animations-using-requestanimationframe/
    var animate = {
        // stop/cancel a running animation
        "stop" : function(id)
        {
            cAF(animationIDTracker[id]);
            delete animationIDTracker[id];
        },
        /*
         * start an animation
         * duration       - how long the animation should take in ms
         * action         - a function to call at each frame
         *                  the function is called with a rate paramater that is a number between 0 and 1 to indicate % complete
         * easingFunction - (optional) a string with the name of the easing function to use
         */
        "start" : function(duration, action, easingFunction)
        {
            // get a new animation ID
            var currentAnimationID = animationCounter++;
            // when we are starting
            var start = +new Date();
            // each frame
            var step = function()
            {
                // the amount of time since the start
                var elapsed = +new Date() - start;
                // if it's been more time since the duration then we're done
                if(elapsed >= duration)
                {
                    action(1);
                    animate.stop(currentAnimationID);
                }
                // we're not done
                else
                {
                    // find the % complete and call the action function
                    action(easingFunctions[easingFunction || defaultEasing](elapsed, 0, 1, duration));
                    // request another frame
                    animationIDTracker[currentAnimationID] = rAF(step);
                }
            };
            // start it
            step();
            
            // return the ID
            return currentAnimationID;
        },
        // returns an array of all the available easing functions
        "easingFunctions" : function()
        {
            var ret = [];
            for(easingName in easingFunctions)
            {
                ret.push(easingName);
            }
            return ret;
        }
    };
    return animate;
})();

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
