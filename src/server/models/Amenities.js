const Sequelize = require("sequelize");

const db = require("../db/db");

module.exports = db.sequelize.define(
    "amenity",
    {
        itemName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
          },
        itemUrl: {
            type: Sequelize.STRING,
            allowNull: false
          }
    },
    {
        timestamps: false
    }
)