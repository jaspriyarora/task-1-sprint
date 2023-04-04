const five = require('johnny-five');
const board = new five.Board();
const SerialPort = require('serialport');

const port = new SerialPort('<YOUR_SERIAL_PORT>', {
  baudRate: 9600
});

const forwardPin1 = 5;
const forwardPin2 = 11;
const backwardPin1 = 6;
const backwardPin2 = 10;

board.on('ready', () => {
  const motors = new five.Motors([
    { pins: [forwardPin1, forwardPin2] },
    { pins: [backwardPin1, backwardPin2] }
  ]);

  function forward() {
    motors.forward(Speed);
  }

  function backward() {
    motors.reverse(Speed);
  }

  function left() {
    motors[0].forward(Speed);
    motors[1].stop();
  }

  function right() {
    motors[0].stop();
    motors[1].forward(Speed);
  }

  function stop() {
    motors.stop();
  }

  port.on('open', () => {
    console.log('Serial port open');
  });

  port.on('data', (data) => {
    const val = data.toString().trim();
    console.log(val);

    if (val === 'forward') {
      stop();
      forward();
    } else if (val === 'backward') {
      stop();
      backward();
    } else if (val === 'left') {
      stop();
      left();
    } else if (val === 'right') {
      stop();
      right();
    } else if (val === 'stop') {
      stop();
    }
  });
});
