//Following code takes input from switch connected at inputPin and toggles the
//states of all the LEDs mentioned in the array whenever pressed
//Note that it is slightly different from asked problems. In this it toggles
//the state of LEDs rather than just turning them on
var b = require('bonescript');

var leds = ["USR0", "USR1", "USR2", "USR3", "P9_12"];
var inputPin = "P8_12";

for (var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
}
b.pinMode(inputPin, b.INPUT, 7, 'pulldown');

var state = b.LOW;
for (var i in leds) {
    b.digitalWrite(leds[i], state);
}

b.attachInterrupt(inputPin, true, b.RISING, interruptCallback);
setTimeout(detach, 60000);

function interruptCallback(x) {
    console.log("In interruptCallback");
    toggle();
}

function toggle() {
    console.log("In toggle");
    if (state == b.LOW)
        state = b.HIGH;
    else state = b.LOW;
    for (var i in leds) {
        b.digitalWrite(leds[i], state);
    }
}

function detach() {
    b.detachInterrupt(inputPin);
    console.log("Interrupt Detached!");
}
