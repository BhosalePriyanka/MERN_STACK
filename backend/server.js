const express = require('express')
require('dotenv').config()
const workoutRoute = require('./routes/workoutRoute')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')
const cors = require('cors');

//express app
const app = express()

//middleware
app.use(express.json()) //all request comes in passed to req 
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use(cors());

// //tetsing
// app.get('/api/',(req,res)=>{
//     res.json({message:"hello api"})
// })

// app.get('/api/user',(req,res)=>{
//     res.json({message:"hello user"})
// })
//routes
app.use('/api/workout',workoutRoute)
app.use('/api/user',userRoute)

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
//listing to port
    app.listen(process.env.PORT,()=>{
        console.log("Connected to db & listing to port")
    })
})
.catch((err)=>{
    console.log(err)
})