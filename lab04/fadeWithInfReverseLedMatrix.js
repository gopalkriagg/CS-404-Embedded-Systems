#!/usr/bin/env node
/**************************************************************************
 * Added functionality to control max. brightness to infiniteReversalLedMatrix.js
 * The following program writes 3 different patterns both in straight and 
 * inverse oriented forms each for 'time' milliseconds and this loops goes on
 * infinetely. I wrote a function to invert any pattern!
 * Author: Gopal Krishan Aggarwal with inputs from existing Prof. Yoder's code
 * Date: 20 Oct, 2015
 **************************************************************************/


var b = require('bonescript');
var port = '/dev/i2c-2' //Specifies which i2c-bus
var matrix = 0x70; //Address of LED Matrix hw on the i2c bus
var time = 1000;
var potPin = "P9_33";
var potValue = 0;
var brightness = 0;
var smile = //LED pattern for smiling
    [0x00, 0x3c, 0x00, 0x42, 0x28, 0x89, 0x04, 0x85,
        0x04, 0x85, 0x28, 0x89, 0x00, 0x42, 0x00, 0x3c
    ];

var reverseSmile = reversePattern(smile.slice()); //Slice is used to create a copy of object referenced by smile!
var frown = //LED pattern for frowning
    [0x3c, 0x00, 0x42, 0x00, 0x85, 0x20, 0x89, 0x00,
        0x89, 0x00, 0x85, 0x20, 0x42, 0x00, 0x3c, 0x00
    ];
var reverseFrown = reversePattern(frown.slice());

var neutral = //LED pattern for neutral face :-|
    [0x3c, 0x3c, 0x42, 0x42, 0xa9, 0xa9, 0x89, 0x89,
        0x89, 0x89, 0xa9, 0xa9, 0x42, 0x42, 0x3c, 0x3c
    ];
var reverseNeutral = reversePattern(neutral.slice());

b.i2cOpen(port, matrix);
b.i2cWriteByte(port, 0x21); //Starts oscillator
b.i2cWriteByte(port, 0x81); //Disp on, blink off
b.i2cWriteByte(port, 0xe7); //Full brightness

setInterval(setBrightness, 1000); //LEDMatrix adjusted to new brightness every 1 sec.

function setBrightness() {
    potValue = b.analogRead(potPin);
    brightness = 0xe0 + 15*potValue;
    console.log("PotValue is " + potValue.toFixed(3) + "\nBrightness is " + brightness.toFixed(3));
    b.i2cWriteByte(port, brightness);
    
}
doFrown(); //Starts the show

function doFrown() {
    b.i2cWriteBytes(port, 0x00, frown);
    setTimeout(doReverseFrown, time);
}

function doReverseFrown() {
    b.i2cWriteBytes(port, 0x00, reverseFrown);
    setTimeout(doNeutral, time)
}

function doNeutral() {
    b.i2cWriteBytes(port, 0x00, neutral);
    setTimeout(doReverseNeutral, time);
}

function doReverseNeutral() {
    b.i2cWriteBytes(port, 0x00, reverseNeutral);
    setTimeout(doSmile, time)
}

function doSmile() {
    b.i2cWriteBytes(port, 0x00, smile);
    setTimeout(doReverseSmile, time);
}

function doReverseSmile() {
    b.i2cWriteBytes(port, 0x00, reverseSmile);
    setTimeout(doFrown, time)
}

/******************************************************
 * In the process of making this function I learnt how to pass objects to functions
 * in javascript and why obj[x] >> 1 is better (here) than obj[x]/2 in js.
 ******************************************************/
function reversePattern(obj) {
    var temp = 0;
    for (var x in obj) {
        temp = 0;
        for (var i = 0; i < 8; i++) {
            temp = (obj[x] % 2) + temp * 2;
            obj[x] = obj[x] >> 1;
        }
        obj[x] = temp;
    }
    return obj;
}