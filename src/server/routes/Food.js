const express = require("express");
const food = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const docClient = require("../db");

food.use(cors());

process.env.SECRET_KEY = "secret";

food.get("/menu", (req, res) => {
  console.log(Date.now(), 'getMenu');
  var params = {
    AttributesToGet: ['food'],
    TableName: 'hotel'
  };
  docClient.scan(params, function(err, data) {
    if (err) console.log(err);
    else { 
      console.log(data); 
      res.json(data.Items[0].food);
    };
  });
});

module.exports = food;
