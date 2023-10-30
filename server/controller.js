require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.CONNECTION_STRING)

let restaurantObj = []
module.exports = {
    getZipcode: (req,res) => {
        let {zipcode} = req.params
        console.log(zipcode)
        sequelize.query(`
        SELECT Latitude, Longitude, City FROM ZIPCodes
        WHERE ZipCode = '${zipcode}';
        `).then((dbRes) => {
            // console.log(dbRes[0])
         res.status(200).send(dbRes[0])
        })
    },
    getSpecs: (req,res) => {
        
        res.status(200).send(req.params.specs)
    },
    addRestaurant: (req,res) => {
        let restaurant = req.body.jsonObj[0]
        console.log(restaurant)
        restaurantObj.push(restaurant)
        // globalId++
        // res.status(200).send(restaurantObj)
        // let index = restaurantObj.findIndex(restaurantObj => restaurantObj.id === +req.params.id)
        console.log(restaurantObj)
        res.status(200).send(restaurantObj)
    },
    spinWheel: (req,res) => {
        if(restaurantObj.length === 8){
            res.status(200).send(restaurantObj)
        } else {
            restaurantObj = []
            res.status(400).send('sadly not 8 :c')
        }
    }
}