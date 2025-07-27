const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        unique:true,
    },
    price:{
        type:Number,
    },
    rating:{
        type:Number,
    },
    discription:{
        type:String,
    },
    image:{
        type:String,
    },
    features:{
        type:[String],
    },
    category:{
        type:String,
    }
})
const Product = mongoose.model('Product',productSchema)
module.exports = Product;