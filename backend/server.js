//imports
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const doctorInfoRoutes = require('./routes/doctorInfo')

//where to register the express app



//express app 
const app = express()


//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/', doctorInfoRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listen for request when cnnect to db
        app.listen(process.env.PORT, () => {
            console.log('listening for port 3000 ')
        })

    })
    .catch((error) => {
        console.log(error)
    })



//env 
process.env