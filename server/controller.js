require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.CONNECTION_STRING)



module.exports = {
    getZipcode: (req,res) => {

    },
    getSpecs: (req,res) => {

    },
    addRestaurant: (req,res) => {

    },
    spinWheel: (req,res) => {

    },
    removeRestaurant: (req,res) => {

    }
}