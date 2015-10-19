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
for (var i in inputPin){
	b.attachInterrupt(inputPin[i], true, b.CHANGE, 	toogle1);
	}
}

function toggle1(x) {
    if(state[0] == b.LOW) 
        state[0] = b.HIGH;
    else state[0] = b.LOW;
     b.digitalWrite(leds[0], state);   

}

