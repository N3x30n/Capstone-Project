require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.CONNECTION_STRING)



module.exports = {
    getZipcode: (req,res) => {
        let {zipcode} = req.params
        console.log(zipcode)
        sequelize.query(`
        SELECT Latitude, Longitude, City FROM ZIPCodes
        WHERE ZipCode = '${zipcode}';
        `).then((dbRes) => {
            console.log(dbRes[0])
         res.status(200).send(dbRes[0])
        })
    },
    getSpecs: (req,res) => {
    
        res.status(200).send(req.params.specs)
    },
    addRestaurant: (req,res) => {

    },
    spinWheel: (req,res) => {

    },
    removeRestaurant: (req,res) => {

    }
}