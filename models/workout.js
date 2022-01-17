const {DataTypes} = require("sequelize")
const db = require("../db")

const Review = db.define("review", {
    gymName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Review;
