// the index in db is the one that creates the connection,
// then exports that connection to any other file that wants to use it

const config = require("../config");
const AWS = require("aws-sdk");

AWS.config.update(config.aws_local_config);
const dynamoDocClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDocClient;
