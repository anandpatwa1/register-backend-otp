const express = require('express')
const { connectDB } = require('./src/config/db')
const { errorHandler } = require("./src/middlewere/errorMiddlewere")
const app = express()
require('dotenv').config()
require('colours')

const PORT = process.env.PORT || 5000

connectDB()

// Body Parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/user', require('./src/modules/user/userRoutes'))
app.use('/api/otp', require('./src/modules/tempUser/tempRoutes'))

app.get('/', (req, res) => {
    res.send('Welcome to Quoded')
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Your PORT is runnung at ' + PORT);
})