const express = require("express");
const destinations = express.Router();
const cors = require("cors");
const docClient = require("../db");

//const config = require("../config");

//const Amenity = require("../models/destinations");
destinations.use(cors());

destinations.get("/getDestinations", (req, res) => {
  //const docClient = new AWS.DynamoDB.DocumentClient();
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "destinations";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = destinations;
