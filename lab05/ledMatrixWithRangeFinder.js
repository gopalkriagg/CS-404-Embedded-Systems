/*******************************************************************************
 * Author: Gopal Krishan Aggarwal
 * I have extended rangeFinder.js to display results the proximity warning display on 8X8 i2c LED Matrix
 * As object gets closer green coloured bars on LED gets higher. If objects gets very closer red coloured
 * bars start rising!
 * Does not produce very accurate result for very small distances (<20cm)
 * Date: 22 October, 2015
 * ****************************************************************************/
var b = require('bonescript');
var rangeFinderPin = "P9_40";
var analogVoltage = 0;
var reading = 0;
var distanceInches = 0;
var m = 191.0; // m in y = mx + c
var c = -10.0; // c in y = mx + c

//Following few(~6)lines for LED Matrix
var port = '/dev/i2c-2' //Specifies which i2c-bus
var matrix = 0x70; //Address of LED Matrix hw on the i2c bus
b.i2cOpen(port, matrix);
b.i2cWriteByte(port, 0x21); //Starts oscillator
b.i2cWriteByte(port, 0x81); //Disp on, blink off
b.i2cWriteByte(port, 0xe7); //Full brightness


var time = 100;

/* Check the sensor values every time milliseconds*/
setInterval(read, time);

function read() {
    reading = b.analogRead(rangeFinderPin);
    analogVoltage = reading * 5.0; // ADC Value converted to voltage (Accidentally took it as 5. Should have been 3.3!)
    console.log('x.value = ' + analogVoltage);
    distanceCm = analogVoltage * m + c; //m and c calculated through regression on data in same folder
    console.log("There is an object " + distanceCm.toFixed(3) + " cm away.");
    updateLedMatrix(distanceCm);
}


var greenLedWriteValue = 0;
var redLedWriteValue = 0;
var ledMatrixValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var greenDist = 0;
var redDist = 0;
function updateLedMatrix(dist) {
    if(dist > 200.0) {
        greenDist = 200.0; //If distance greater than 100 cm assume greenDist is 100 cm
    }
    else if(dist < 30.0) {
        greenDist = 30.0; //If distance less than 30 cm assume greenDist is 30 cm
    }
    else greenDist = dist;
    
    if(dist > 50.0) {
        redDist = 50.0;
    }
    else if(dist < 10) {
        redDist = 10;
    }
    else redDist = dist;
    greenLedWriteValue = Math.pow(2, Math.round(-4.117e-2 * greenDist + 9.235)) - 1; //Calculated by taking y = 8 at x = 30 and y = 1 at x = 100 (linearly)
    redLedWriteValue   = Math.pow(2, Math.round(-0.2 * redDist + 10)) - 1; //Calculated by taking y = 8 at x = 10 and y = 0 at x = 50 (linearly)
    for (var i = 0; i < 15; i += 2) {
        ledMatrixValue[i] = greenLedWriteValue;
        ledMatrixValue[i+1] = redLedWriteValue;
    }
    b.i2cWriteBytes(port, 0x00, ledMatrixValue);
}
