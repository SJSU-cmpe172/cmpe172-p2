const express = require("express");
const jobs = express.Router();
const cors = require("cors");

const docClient = require("../db");

jobs.use(cors());

jobs.get("/getJobs", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "jobs";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

jobs.post("/create", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ReturnValues = "UPDATED_NEW";
  params.UpdateExpression =
    "set #jobs = list_append(if_not_exists(#jobs, :empty_list), :job)";
  params.ExpressionAttributeNames = {
    "#jobs": "jobs"
  };
  params.ExpressionAttributeValues = {
    ":job": [req.body],
    ":empty_list": []
  };

  docClient.update(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send("added job id# " + req.body.id);
    }
  });
});

module.exports = jobs;
