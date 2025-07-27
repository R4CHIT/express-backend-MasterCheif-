const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username:{
        type:String
    },
    emai:{
        type:String
    },
    contactNumber:{
        type:String
    },
    password:{
        type:String
    },
    city:{
        type:String
    },
    street:{
        type:String
    },
    deliveryDescription:{
        type:String
    },
    role:{
        type:String
    },

});

userschema.pre('save',async(next)=>{
     const user=this;
     if(!user.isModified('password')) return next();
})

const User = mongoose.model('user',userschema)
module.exports = User