/****************************************************
 * Objective:   Fade 2 Leds in reverse. 
 *              When first brightens up the other dims and vice versa
 * Authors:     Gopal Krishan Aggarwal and Sanjeev Khare
 ****************************************************/

var b = require('bonescript');

var led1 = "P9_14";
var led2 = "P9_16";
b.pinMode(led1, b.ANALOG_OUTPUT);
b.pinMode(led2, b.ANALOG_OUTPUT);

//Call function to update brightness every 10ms
setInterval(fade, 10);

// function to update brightness
var awValue = 0.01;
var awDirection = 1;
function fade() {
 awValue = awValue + (awDirection * 0.01);
 if (awValue > 1.0) {
  awValue = 1.0;
  awDirection = -1;
 }
 else if (awValue <= 0.01) {
  awValue = 0.01;
  awDirection = 1;
 }
 b.analogWrite(led1, awValue);
 b.analogWrite(led2, Math.abs(1-awValue));
}
