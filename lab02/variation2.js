//Fool-Proof code to blink led 10 times when a switch is pressed.
//If the user tries to press led again when it is blinking no action will be taken.
//Author: Gopal Krishan Aggarwal in partnership with Sanjeev Khare :D
var b = require('bonescript');

var led = "P9_14";
var inputPin = "P8_12";
var time = 500; //in ms
var count = 0; //Stores how many times LED has currently blinked since the time switch was pressed which initiated blinking.
var retInterval;
b.pinMode(led, b.OUTPUT);
b.pinMode(inputPin, b.INPUT);
var toggleGoingOn = 0;

var state = b.LOW;
b.digitalWrite(led, state);

b.attachInterrupt(inputPin, true, b.FALLING, blink);

function blink(obj) {
    if (!obj.attached) {
        if (!toggleGoingOn) {
            toggleGoingOn = 1;
            retInterval = setInterval(toggle, time);
            console.log("Button Pressed and starting blinking led 10 times");
        }
        else console.log("Toggle already going on. No action will be taken.");
    }
}

function toggle() {
    count++;
    if (count <= 10 * 2) {
        state = state == b.HIGH ? b.LOW : b.HIGH;
        b.digitalWrite(led, state);
    }
    else {
        count = 0;
        clearInterval(retInterval);
        toggleGoingOn = 0;
    }
}
