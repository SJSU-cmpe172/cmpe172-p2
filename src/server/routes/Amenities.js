const express = require("express");
const amenities = express.Router();
const cors = require("cors");

const Amenity = require("../models/Amenities");
amenities.use(cors());

amenities.get("/getItems", (req, res) => {
  Amenity.findAll()
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = amenities;
