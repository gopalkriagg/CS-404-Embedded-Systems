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

var mode  = 0;
me(){
	b.attachInterrupt(inputPin[0], true, b.RISING, start);
}

function start(x){
mode = 1;
}

function stop(x){
mode = 0;
}

setInterval(toBlinkOrNotToBlink, 100);

function toBlinkOrNotToBlink(){
if (mode === 1){
	toogle(1);

}
}


function toogle(i) {
    if(state[i] == b.LOW) 
        state[i] = b.HIGH;
    else state[i] = b.LOW;
     b.digitalWrite(leds[i], state);
}

