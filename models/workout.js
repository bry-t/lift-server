const {DataTypes} = require("sequelize")
const db = require("../db")

const Workout = db.define("workout", {
    title: {
        type: DataTypes.STRING(100),
        allownull: false,
    },
    typeOfWorkout: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allownull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Workout;