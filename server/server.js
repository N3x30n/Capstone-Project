const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {SERVER_PORT} = process.env
let app = express()



app.use(express.json())
app.use(cors())

const {getZipcode, getSpecs, addRestaurant, spinWheel, removeRestaurant} = require('./controller')
const {seed} = require('./sequelizeSeed')

//Database Seed
app.post('/seed', seed)
// seed()


//Website functionality
app.get('/zipcode/:zipcode', getZipcode)
// getZipcode()
app.get('/spec/:specs', getSpecs)
app.post('/map',addRestaurant)
app.get('/wheel', spinWheel)
app.delete('/map/:id', removeRestaurant)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))