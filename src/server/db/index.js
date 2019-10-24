// the index in db is the one that creates the connection, 
// then exports that connection to any other file that wants to use it

const express = require("express");
const mysql = require("mysql");
const config = require("../config");

const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
  console.log("db connected from INDEX INDEX");
  if (err) console.log(err);
});

module.exports = Connection;
