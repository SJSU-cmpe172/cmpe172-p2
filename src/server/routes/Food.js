const express = require("express");
const food = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

food.use(cors());

process.env.SECRET_KEY = "secret";

var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-1",
  accessKeyId: "695435062401",
  secretAccessKey: "FHilrLfaQvy8Ss6oRv+bCZsPNuaaiautZjNN+Ihc",
  endpoint: 'http://localhost:8000'
});
var documentClient = new AWS.DynamoDB.DocumentClient();

food.get("/menu", (req, res) => {
  console.log(Date.now(), 'getMenu');
  var params = {
    AttributesToGet: ['food'],
    TableName: 'hotel'
  };
  documentClient.scan(params, function(err, data) {
    if (err) console.log(err);
    else { 
      console.log(data); 
      res.json(data.Items[0].food);
    };
  });
});

food.post("/login", (req, res) => {
  
});

food.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
});

module.exports = food;
