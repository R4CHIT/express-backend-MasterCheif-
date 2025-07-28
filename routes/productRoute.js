const express = require("express");
const route = express.Router();
const Product = require("../model/productModel");
route.get("/", async (req, res) => {
  try {
    const productData = await Product.find()
    res.status(200).json({message:"data fetch unsucessfully ",data:productData})
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
    });
  }
});
route.post("/", async (req, res) => {
  try {  
    const data = req.body;
    const product = new Product(data);
    const response = await product.save();
    res.status(200).json({
      message: "Product data Saved o yes",
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
    const product = await Product.findByIdAndUpdate(id,updatedData,{
      new:true,
    })
    
    res.status(200).json({
      message:"Data updated Successfully ",
      data:product
      
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
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message:"Data deleted Successfully ",
    
    })
  } catch (error) {
    res.status(401).json({
      messsage: "Server Error",
    });
  }
})

module.exports = route;
