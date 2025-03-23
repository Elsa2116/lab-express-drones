// Iteration #1
const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

mongoose
  .connect("mongodb://localhost:27017/dronesDB")
  .then(() => {
    console.log("Connected to MongoDB");
    return Drone.create(drones);
  })
  .then((dronesCreated) => {
    console.log(`Seeded ${dronesCreated.length} drones`);
    mongoose.connection.close();
  })
  .catch((err) => console.log("Error seeding data:", err));
