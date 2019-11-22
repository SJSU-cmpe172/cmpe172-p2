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

  docClient.scan(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

jobs.get("/getNewJobs", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "jobs";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let buffer = data.Item.jobs;
      let filtered = buffer.filter(function(buffer) {
        return buffer.status === "new";
      });

      res.send(filtered);
    }
  });
});

jobs.get("/getMyJobs", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "jobs";
  let outsideBuffer;

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let buffer = data.Item.jobs;
      outsideBuffer = data.Item.jobs;
      let filtered = buffer.filter(function(buffer) {
        return buffer.staff === req.query.staff;
      });

      res.send(filtered);
    }
  });
  console.log(outsideBuffer);
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

jobs.post("/workJob", (req, res) => {
  let params1 = {};
  params1.TableName = "hotel";
  params1.Key = { hotelid: 1 };
  params1.ProjectionExpression = "jobs";
  let buffer;
  docClient.get(params1, (err, data) => {
    if (err) {
      console.log(err);
    }
    buffer = data.Item.jobs;
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].id === req.body.jobId) {
        buffer[i].status = "working";
        buffer[i].staff = req.body.staff;
        buffer[i].dtWorked = Date.now();
        break;
      }
    }
    let params2 = {};
    params2.TableName = "hotel";
    params2.Key = { hotelid: 1 };
    params2.ReturnValues = "UPDATED_NEW";
    params2.UpdateExpression = "set #jobs = :jobs";
    params2.ExpressionAttributeNames = {
      "#jobs": "jobs"
    };
    params2.ExpressionAttributeValues = {
      ":jobs": buffer
    };

    docClient.update(params2, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send("worked job #");
      }
    });
  });
});

jobs.post("/completeJob", (req, res) => {
  let params1 = {};
  params1.TableName = "hotel";
  params1.Key = { hotelid: 1 };
  params1.ProjectionExpression = "jobs";
  let buffer;
  docClient.get(params1, (err, data) => {
    if (err) {
      console.log(err);
    }
    buffer = data.Item.jobs;
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].id === req.body.jobId) {
        buffer[i].status = "completed";
        buffer[i].dtCompleted = Date.now();
        break;
      }
    }
    let params2 = {};
    params2.TableName = "hotel";
    params2.Key = { hotelid: 1 };
    params2.ReturnValues = "UPDATED_NEW";
    params2.UpdateExpression = "set #jobs = :jobs";
    params2.ExpressionAttributeNames = {
      "#jobs": "jobs"
    };
    params2.ExpressionAttributeValues = {
      ":jobs": buffer
    };

    docClient.update(params2, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send("worked job #");
      }
    });
  });
});

module.exports = jobs;
