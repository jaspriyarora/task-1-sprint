const { Board, Led } = require('johnny-five');

const board = new Board({ port: "COM3" }); // Replace with the port of your Arduino board

board.on("ready", () => {
  const led = new Led(2); // Initialize LED on pin 2
  const sensor = new Sensor("A1"); // Initialize pulse oximeter sensor on analog pin A1

  sensor.on("change", () => {
    console.log(sensor.value); // Log the sensor value to the console
    
    // If sensor value is above threshold, turn on LED
    if (sensor.value > 500) {
      led.on();
    }
    else {
      led.off();
    }
  });
});
