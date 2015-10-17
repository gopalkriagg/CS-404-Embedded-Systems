var b = require('bonescript');

var ledPin = ["P9_12", "P9_15", "P9_23", "P9_25"];
var switchPin = ["P8_8", "P8_10", "P8_12", "P8_14"];

var ledState = [b.LOW, b.LOW, b.LOW, b.LOW];

for(var i = 0; i < ledPin.length; i++) {
    b.pinMode(ledPin[i], b.OUTPUT);
    b.pinMode(switchPin[i], b.INPUT, 7, 'pulldown');
   
    
    b.attachInterrupt(switchPin[0], true, b.FALLING, interruptCallback0);
    b.attachInterrupt(switchPin[1], true, b.FALLING, interruptCallback1);
    b.attachInterrupt(switchPin[2], true, b.FALLING, interruptCallback2);
    b.attachInterrupt(switchPin[3], true, b.FALLING, interruptCallback3);
    
    ledState[i] = b.HIGH;
    b.digitalWrite(ledPin[i], ledState[i]);
}
var i;
function interruptCallback(i) {
    ledState[i] = ledState[i]===b.HIGH? b.LOW:b.HIGH;
    b.digitalWrite(ledPin[i], ledState[i]);
    console.log("Button " + i + " pressed!");
}
function interruptCallback0() {
    interruptCallback(0);
}
function interruptCallback1() {
    interruptCallback(1);
}
function interruptCallback2() {
    interruptCallback(2);
}
function interruptCallback3() {
    interruptCallback(3);
}
