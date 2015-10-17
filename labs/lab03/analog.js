/****************************************************
 * Objective:   Read analog values from a potentiometer
 * Authors:     Gopal Krishan Aggarwal and Sanjeev Khare
 ****************************************************/

var b = require('bonescript');

var inputPin = "P9_33";
var time = 100; //in milliseconds

setInterval(loop, time);

function loop() {
    var value = b.analogRead(inputPin);
    console.log("Value from potentiometer is %d", value.toFixed(3));
}

