var b = require('bonescript');

var inputPin = "P9_33";
//var outputPin = "P9_14";

//b.pinMode(outputPin, b.ANALOG_OUTPUT);
loop();

function loop() {
    var value = b.analogRead(inputPin);
    console.log(value.toFixed(3));
    //b.analogWrite(outputPin, value);
    setTimeout(loop, 100);
}

