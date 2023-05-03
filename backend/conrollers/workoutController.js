
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workout
const getWorkouts = async(req,res) =>{
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createAt:-1})
    res.json(workouts)
}

//get single workout
const getWorkout = async(req,res)=>{
const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)){ // 12 digits id in db
  return res.json({error:"Workout not in valid range"})
 }
const workout = await Workout.findById(id)
if(!workout){
    return res.json({error:"No such workout"})
}
res.json(workout)
}

//create a workout
createWorkout = async(req,res)=>{
    const{title,reps,load} = req.body

    // custome error message
   let emptyFields = []
    if(!title){
        emptyFields.push('title')
    } 
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
      return res.json({error:"All fileds are required",emptyFields})
    }
    //post method code
    try{
        //req.user returned from reuire auth middleware
   
        const user_id = req.user._id
        const workout = await Workout.create({title,reps,load,user_id})
        res.json(workout)
    }
    catch(error){
       res.json({error:error.message})
    }
    
}
//delete a workout
const delWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.json({error:"Workout not in valid range"})
     }
     const workout =await  Workout.findOneAndDelete({_id:id})
     if(!workout){
         return res.json({error:"No such workout avilable"})
     }
     res.json(workout)
    }


//update a workout

const updateWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.json({error:"Workout not in valid range"})
     }
     const workout = await Workout.findByIdAndUpdate({_id:id},{...req.body}) // destrucing object to get all body of document 
     if(!workout){
        res.json({error:"No any workout avilable"})
     }
     res.json(workout)
    
    }

module.exports = {createWorkout,getWorkouts,getWorkout,delWorkout,updateWorkout}