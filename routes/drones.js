const express = require("express");
const Drone = require("../models/Drone.model");
const router = express.Router();

// List Drones
router.get("/", (req, res) => {
  Drone.find()
    .then((drones) => res.render("drones/list", { drones }))
    .catch((err) => console.log("Error fetching drones:", err));
});

// Create Drone (Form)
router.get("/create", (req, res) => {
  res.render("drones/create-form");
});

// Create Drone (POST)
router.post("/create", (req, res) => {
  Drone.create(req.body)
    .then(() => res.redirect("/drones"))
    .catch((err) => console.log("Error creating drone:", err));
});

// Update Drone (Form)
router.get("/:id/edit", (req, res) => {
  Drone.findById(req.params.id)
    .then((drone) => res.render("drones/update-form", { drone }))
    .catch((err) => console.log("Error finding drone:", err));
});

// Update Drone (PUT)
router.post("/:id/edit", (req, res) => {
  Drone.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.redirect("/drones"))
    .catch((err) => console.log("Error updating drone:", err));
});

// Delete Drone
router.post("/:id/delete", (req, res) => {
  Drone.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/drones"))
    .catch((err) => console.log("Error deleting drone:", err));
});

module.exports = router;

