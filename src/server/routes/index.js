// the index file of the routes folder will define all the API calls that the react app will make.

const express = require("express");
// const mysql = require("mysql");
// const config = require("../config");
const Con = require("../db/index");

const router = express.Router();

router.get("/api/schools", getSchools);

module.exports = router;

function getSchools(req, res) {
  Con.query("SELECT * FROM school", function(err, data) {
    err ? res.send(err) : res.json(data);
  });
}
