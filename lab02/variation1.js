//The top LED (connected to leds[0] turns on with either switch is pressed.
//Both LEDs turn on when both switched are simultaneously pressed.
//Prints on the console how many switches currently pressed. (Beware: Debouncing not done!)
//Author: Gopal Krishan Aggarwal and Sanjeev Khare

var b = require('bonescript');
var leds = ["P9_14", "P9_12"];
var inputPin = ["P8_12", "P8_14"];
var semaphore = [0, 0]; //Stores the state of each button(whether pressed or not)
var state = [b.LOW, b.LOW]; //Stores the state of each LED
for (var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
}

for (var i in inputPin) {
    b.pinMode(inputPin[i], b.INPUT);
    b.attachInterrupt(inputPin[i], true, b.CHANGE, switchLedState);
}

for (var i in leds)
    b.digitalWrite(leds[i], state[i]);

function switchLedState(x) {
    if (x.pin.key == inputPin[0])
        semaphore[0] = x.value;
    else semaphore[1] = x.value;
    if (semaphore[0] && semaphore[1]) {
        for (var i in leds)
            state[i] = b.HIGH;
        console.log("Both buttons are pressed");
    }
    else if (semaphore[0] || semaphore[1]) {
        //When either of the switch is pressed/released the top LED's state (state[0]) gets
        //updated independently of which switch was pressed
        state[0] = b.HIGH;
        state[1] = b.LOW;
        console.log("Only one button is pressed");
    }
    else {
        state[0] = state[1] = b.LOW;
        console.log("None of the buttons are pressed");
    }

    for (var i in leds)
        b.digitalWrite(leds[i], state[i]);
}
