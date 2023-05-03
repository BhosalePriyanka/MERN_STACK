const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const createToken = (_id) =>{
   return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
//login user
const loginUser = async(req,res)=>{
    const{email,password} = req.body

    User.login = async function (email,password){
        if(!email || !password){
            throw Error("All field are required")
        }
    
        const user = await User.findOne({email}) // return email including all data
       
     
        if(!user){
            throw Error('Incorrect Email')
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            throw Error('Incorrect Password')
        }
    return user
    
    }
    try{
        const user = await User.login(email,password)
        //create token
        const token = createToken(user._id)
        res.json({email,token})
    }
    catch(error){
       res.json({error:error.message})
    }
}


//singup user
const signupUser = async(req,res)=>{
    const{email,password} = req.body

//static signup method

User.signup = async function(email,password){

    if(!email || !password){
        throw Error("All field are required")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const exist = await User.findOne({email})
    if(exist){
        throw Error('Email id already in use')
    }

    const salt = await bcrypt.genSalt(10) 
    const hash = await bcrypt.hash(password,salt)
    const user= await this.create({email, password:hash})
    return user
}

    try{
        const user = await User.signup(email,password)
        //create token
        const token = createToken(user._id)
        res.json({email,token})
    }
    catch(error){
       res.json({error:error.message})
    }
}
module.exports = {loginUser,signupUser}