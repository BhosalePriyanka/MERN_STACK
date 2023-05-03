const express = require('express')
const Workout = require('../models/workoutModel')
const router = express.Router()
const {createWorkout,getWorkouts,getWorkout,delWorkout,updateWorkout}= require('../conrollers/workoutController')
const requireAuth = require('../middleware/requireAuth')

//Auth middleware
 router.use(requireAuth)

//get all workout
router.get('/',getWorkouts)

//get single workout
router.get('/:id',getWorkout)

//create workout
router.post('/',createWorkout)


//delete workout
router.delete('/:id',delWorkout)

//update workout
router.patch('/:id',updateWorkout)




module.exports = router