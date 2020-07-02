const express = require("express");
const os = require("os");
const vehiclesInfo = require("./vehiclesInfo.json");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("dist"));

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

//assuming the car information will be sent continously to the UI
app.get("/api/countdown", function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  sendFleetInfo(res);
});

app.get("/api/getAllAvailableVehicles", (req, res) =>
  res.send({
    result: vehiclesInfo,
    status: vehiclesInfo.length > 0 ? 0 : -1,
  })
);

app.post("/api/bookCab", function (req, res) {
  var user_id = req.body.id;
  var token = req.body.token;
  var location = req.body.userLocation;
  var preference = req.body.vehiclePreference;

  var nearestVehicle = findNearestVehicle(location, preference);
  res.send({ nearestVehicle });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

function getAvaiableVehicles(vehiclesInfo) {
  return vehiclesInfo.map((vehicle) => vehicle.vehicle_status === "available");
}

function getAvailablePreferredCab(vehiclesInfo) {
  return vehiclesInfo.map(
    (vehicle) =>
      vehicle.vehicle_status === "available" &&
      vehicle.vehicle_type.color === "pink"
  );
}

function sendFleetInfo(res) {
  for (let i = 0; i < vehiclesInfo.length; i++) {
    startEvent(i, vehiclesInfo[i]);
  }

  function startEvent(i, currentEvent) {
    setTimeout(function () {
      res.write("data: " + JSON.stringify(currentEvent) + "\n\n");
    }, 2000 * i);
  }
}

function calculateDistance(source, destination) {
  let latDiff = source.lattitude - destination.lattitude;
  let lngDiff = source.longitude - source.longitude;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

function findNearestVehicle(userLocation, vehiclePreference) {
  var closest = null;
  var closestDistance = Infinity;
  let availableVehicles =
    vehiclePreference === "pink"
      ? getAvailablePreferredCab()
      : getAvaiableVehicles();
  if (availableVehicles.length > 0) {
    availableVehicles.forEach(function (vehicle) {
      let distance = calculateDistance(vehicle.location, userLocation);
      vehicle.distance_from_user = distance;
    });
    return availableVehicles.reduce(
      (min, p) => (p.distance_from_user < min ? p.distance_from_user : min),
      availableVehicles[0].y
    );
  } else return "No Cabs Avaiable Nearby";
}
