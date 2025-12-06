const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../public"));

let data = {
  R: { voltage: 231.1, current: 0.04 },
  Y: { voltage: 231.4, current: 0.04 },
  B: { voltage: 96.9, current: 0.0 }
}; 

let thresholds = {
  voltage: null,
  current: null
};

let motors = {
  motor1: "OFF",
  motor2: "OFF"
};

app.get("/api/data", (req, res) => {
  res.json({
    phases: data,
    thresholds,
    motors
  });
});

app.post("/api/set-threshold", (req, res) => {
  const { voltage, current } = req.body;
  thresholds.voltage = voltage;
  thresholds.current = current;

  res.json({ message: "Threshold updated", thresholds });
});

app.post("/api/motor-control", (req, res) => {
  const { motor, status } = req.body;

  if (motor === 1) motors.motor1 = status;
  if (motor === 2) motors.motor2 = status;

  res.json({
    message: `Motor ${motor} turned ${status}`,
    motors
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
