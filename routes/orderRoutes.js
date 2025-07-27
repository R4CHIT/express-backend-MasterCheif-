const express = require("express");
const route = express.Router();
const Order = require("../model/orderModel");

route.get("/", async (req, res) => {
  try {
    const order = await Order.find()
    res.status(200).json({messsage:"Welcome",data:order})
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
    });
  }
});

route.post("/", async (req, res) => {
  try {  
    const data = req.body;
    const order = new Order(data);
    const response = await order.save();
    res.status(200).json({
      message: "Product data Saved o yes",
      data:response
    });
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
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