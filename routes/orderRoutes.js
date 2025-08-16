const express = require("express");
const route = express.Router();
const Order = require("../model/orderModel");
const { jwtAuthMiddleWare, generateJwtToken } = require("../jwt");
const Product =require('../model/productModel')
const User = require('../model/userModal')
route.get("/", async (req, res) => {
  try {
    const order = await Order.find().sort({_id : -1})
    res.status(200).json({messsage:"Welcome",data:order})
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
    });
  }
});

route.post("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID);

    const data = req.body;
    data.contactNumber = user.contactNumber;
    data.coustomerName = user.username;
    data.city = user.city;
    data.street = user.street;
    data.deliveryDescription = user.deliveryDescription;

    const { items } = req.body;
    for (const element of items) {
      const product = await Product.findById(element.id);
      if (!product) {
        return res.status(404).json({ message: `Product ${element.id} not found` });
      }
      if (product.availableStock < element.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.productName}` });
      }
      
      
      product.availableStock -= element.quantity;
      await product.save();
    }

    const order = new Order(data);
    const response = await order.save();

    res.status(200).json({
      message: "Order saved successfully!",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});


route.patch('/',async (req,res)=>{
  try {
    const {id,...updatedData} = req.body;
    const order = await Order.findByIdAndUpdate(id,updatedData,{
      new:true,
    })
    res.status(200).json({
      message:"Data updated Successfully ",
      data:order
    })
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
    });
  }
})
route.delete('/',async (req,res)=>{
  try {
    const {id} = req.body; 
    await Order.findByIdAndDelete(id);
    res.status(200).json({
      message:"Data deleted Successfully ",
    
    })
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
    });
  }
})
module.exports = route ;