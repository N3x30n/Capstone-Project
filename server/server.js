const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
let app = express()

app.use(express.json())
app.use(cors())

const {getZipcode, getSpecs, addRestaurant, spinWheel, removeRestaurant} = require('./controller')
const {seed} = require('./sequelizeSeed')

//Database Seed
app.post('/api/seed', seed)
// seed()


//Website functionality
app.get('/api/map', getZipcode)
app.get('/api/spec', getSpecs)
app.post('/api/map',addRestaurant)
app.get('/api/wheel', spinWheel)
app.delete('/api/map/:id', removeRestaurant)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))