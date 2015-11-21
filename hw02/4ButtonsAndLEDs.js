/**********************************
 * Author: Gopal Krishan Aggarwal
 * ID    : B13121
 * Updated on : 21 Nov, 2015 (made the program more concise)
 * ******************************/
var b = require('bonescript');

var ledPin = ["P9_12", "P9_15", "P9_23", "P9_25"];
var switchPin = ["P8_8", "P8_10", "P8_12", "P8_14"];

var ledState = [];  //Stores current state of each ledPin

for (var i = 0; i < ledPin.length; i++) {
    b.pinMode(ledPin[i], b.OUTPUT);
    b.pinMode(switchPin[i], b.INPUT, 7, 'pulldown');
    b.attachInterrupt(switchPin[i], true, b.CHANGE, interruptCallback);
    ledState[i] = b.HIGH; //Turning each LED on inititally
    b.digitalWrite(ledPin[i], ledState[i]);
}
function interruptCallback(obj) {
    var i;
    if (!obj.attached) {
        i = switchPin.indexOf(obj.pin.key);
        ledState[i] = ledState[i] === b.HIGH ? b.LOW : b.HIGH;
        b.digitalWrite(ledPin[i], ledState[i]);
        console.log("Button attached to " + obj.pin.key + " pressed/released!");
    }
}
