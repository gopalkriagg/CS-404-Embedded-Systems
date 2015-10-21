/*******************************************************************************
 *Author: Gopal Krishan Aggarwal and Sanjeev Khare with main parts of the code borrowed from (?) 
 *Following code reads values from analog output pin of 'Ultrasonic Range Finder-Max Sonar EZ1' 
 *Linear regression between Actual distance vs analog Voltage output is used to calculate distanceCm
 *I found a better caliberation is needed to be done! (=> better m and c => better eperimental readings)
 *Does not produce very accurate result for very small distances (<20cm) 
 * ****************************************************************************/
var b = require('bonescript');
var rangeFinderPin = "P9_40";
var analogVoltage = 0;
var reading = 0;
var distanceInches = 0;
var m = 191.0; // m in y = mx + c
var c = -10.0; // c in y = mx + c
var time = 1000;

/* Check the sensor values every time milliseconds*/
setInterval(read, time);

function read() {
    reading = b.analogRead(rangeFinderPin);
    analogVoltage = reading * 5.0; // ADC Value converted to voltage
    console.log('x.value = ' + analogVoltage);
    distanceCm = analogVoltage * m + c; //m and c calculated through regression on data in same folder
    console.log("There is an object " + distanceCm.toFixed(3) + " cm away.");
}
