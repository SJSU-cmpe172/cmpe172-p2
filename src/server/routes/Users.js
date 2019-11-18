const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const docClient = require("../db");

users.use(cors());

process.env.SECRET_KEY = "secret";

//REGISTER
users.post("/register", (req, res) => {
  const today = new Date();
  let userData = {
    idNum: req.body.username,
    privilege: req.body.privilege,
    created: today
  };
  let buffer;
  let params1 = {};
  params1.TableName = "hotel";
  params1.Key = { hotelid: 1 };
  params1.ProjectionExpression = "staff";
  docClient.get(params1, (err, data) => {
    if (err) {
      console.log(err);
    }
    buffer = data.Item.staff;
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i].idNum === userData.idNum) {
        res.send("user already exists");
      }
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      userData.password = hash;
    });

    let params2 = {};
    params2.TableName = "hotel";
    params2.Key = { hotelid: 1 };
    params2.ReturnValues = "UPDATED_NEW";
    params2.UpdateExpression =
      "set #staff = list_append(if_not_exists(#staff, :empty_list), :staff)";
    params2.ExpressionAttributeNames = {
      "#staff": "staff"
    };
    params2.ExpressionAttributeValues = {
      ":staff": [userData],
      ":empty_list": []
    };

    docClient.update(params2, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send("added staff named " + req.body.username);
      }
    });
  });
});

/*
  let params2 = {};
  params2.TableName = "hotel";
  params2.Key = { hotelid: 1 };
  params2.ReturnValues = "UPDATED_NEW";
  params2.UpdateExpression =
    "set #staff = list_append(if_not_exists(#staff, :empty_list), :staff)";
  params2.ExpressionAttributeNames = {
    "#staff": "staff"
  };
  params2.ExpressionAttributeValues = {
    ":staff": [userData],
    ":empty_list": []
  };

  docClient.update(params2, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send("added staff named " + req.body.username);
    }
  });
  */

//LOGIN
users.post("/login", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "rooms";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < data.Item.rooms.length; i++) {
        if (data.Item.rooms[i].roomNum === req.body.username) {
          if (
            bcrypt.compareSync(req.body.password, data.Item.rooms[i].password)
          ) {
            const token = jwt.sign(
              { roomNum: data.Item.rooms[i].roomNum },
              process.env.SECRET_KEY,
              {
                expiresIn: 1440
              }
            );
            console.log("login success " + token);
            res.send(token);
          }
          break;
        }
      }
    }
  });
});

users.post("/staffLogin", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "staff";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < data.Item.staff.length; i++) {
        if (data.Item.staff[i].idNum === req.body.staffId) {
          if (
            bcrypt.compareSync(req.body.password, data.Item.staff[i].password)
          ) {
            const token = jwt.sign(
              {
                staffId: data.Item.staff[i].idNum,
                privilege: data.Item.staff[i].privilege
              },
              process.env.SECRET_KEY,
              {
                expiresIn: 1440
              }
            );
            console.log("login success " + token);
            res.send(token);
          }
          break;
        }
      }
    }
  });
});

users.get("/allStaff", (req, res) => {
  let params = {};
  params.TableName = "hotel";
  params.Key = { hotelid: 1 };
  params.ProjectionExpression = "staff";

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  /*
  User.findOne({
    where: {
      id: decoded.username
    }
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
    */
});

module.exports = users;
