const { Wire, Adafruit_MLX90614 } = require('some-i2c-library');

const mlx = new Adafruit_MLX90614();

function getTemperatures(req, res) {
  const ambientTemp = mlx.readAmbientTempC();
  const objectTemp = mlx.readObjectTempC();

  res.json({ ambientTemp, objectTemp });
}

module.exports = { getTemperatures };
