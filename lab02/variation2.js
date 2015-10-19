var b = require('bonescript');

var leds = ["P9_13", "P9_12"];
var inputPin = ["P8_8", "P8_9"];

for(var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
}
for(var i in inputPin){
b.pinMode(inputPin[i], b.INPUT);
}

var state = b.LOW;
var state1 = b.LOW;

for(var i in leds) {
    b.digitalWrite(leds[i], state);
}

setInterval(me, 100);


me(){
	b.attachInterrupt(inputPin[0], true, b.CHANGE, blink0);
	b.attachInterrupt(inputPin[1], true, b.RISING, blink1);
}

function blink0(x){
for (i in 1 to 10){
	setTimeout(toogle(0), 100*i);
}
}


function blink1(x){
for (i in 1 to 10){
	setTimeout(toogle(1), 100*i);
}
}

function toogle(i) {
    if(state[i] == b.LOW) 
        state[i] = b.HIGH;
    else state[i] = b.LOW;
     b.digitalWrite(leds[i], state);
}

