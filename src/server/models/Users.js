const Sequelize = require("sequelize");

const db = require("../db/db");

module.exports = db.sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    privilege: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);
