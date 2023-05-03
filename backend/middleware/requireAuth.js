const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async(req,res,next)=>{
    //verify authtication
    const{ authorization} = req.headers; // authorization looks like bears dsdhshdwedhwekdwhd

    if(!authorization){
        return res.json({error:"Authorization required"})
    }
    const token = authorization.split(' ')[1] 
    try{
    const _id = jwt.verify(token,process.env.SECRET)
    req.user = await User.findOne({_id}).select('_id')
    next()

    }
    catch(error){
      res.json({error:"Request is not authorized"})
    }
}
module.exports = requireAuth