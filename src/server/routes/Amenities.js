const express = require("express");
const amenities = express.Router();
const cors = require("cors");
const docClient = require("../db");

//const config = require("../config");

//const Amenity = require("../models/Amenities");
amenities.use(cors());

amenities.get("/getItems", (req, res) => {
  //const docClient = new AWS.DynamoDB.DocumentClient();
  let params = {};
  params.TableName = "hotel_test";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "amenities";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = amenities;
