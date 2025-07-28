const express = require('express')
const route = express.Router();
const User = require('../model/userModal')
const {jwtAuthMiddleWare,generateJwtToken} = require('../jwt')

route.post('/signup',async(req,res)=>{
    try {
        const data = req.body;
        const user = new User(data);
        let response = await user.save();
        const payloads={
            id : response.id,
            username:response.username,
            email:response.email
        };
        const token = generateJwtToken(payloads);
        user.token = token ;
        response = await user.save()
    } catch (error) {
      res.status(500).json({
      messsage: "Server Error",
      error:error
    });
    console.log(error);
    
    }
})
route.post("/login",async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        console.log(user);
        if(!user || !await user.comparePassword(password)){
            res.status(401).send({messsage:"user not exist"})
        }
    } catch (error) {
       res.status(500).json({
      messsage: "Server Error",
      error:error
    }); 
    }
})
route.delete('/delete',jwtAuthMiddleWare,async(req,res)=>{
    try {
        const userId = user.id;
        await User.findByIdAndDelete(userId);
    } catch (error) {
        res.status(500).json({
      messsage: "Server Error",
      error:error
    }); 
    }
})
route.patch('/',jwtAuthMiddleWare,async (req,res)=>{
    try {
        const {prevpassword,currentpassword}= req.body;
        const userId = user.id;
        const user = User.findById(userId);
        if(!await user.comparePassword(prevpassword)){
            res.status(401).send({messsage:"user not exist"})
        }
        user.password = currentpassword;
        await user.save();
        res.status(200).json({message:"Password Changed Successfully"})
    } catch (error) {
        res.status(500).json({
      messsage: "Server Error",
      error:error
    }); 
    }
})

module.exports = route ; 