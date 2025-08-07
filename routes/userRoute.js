const express = require("express");
const route = express.Router();
const User = require("../model/userModal");
const { jwtAuthMiddleWare, generateJwtToken } = require("../jwt");

route.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const user = new User(data);
    let response = await user.save();
    const payloads = {
      id: response.id,
      username: response.username,
      email: response.email,
    };
    const token = generateJwtToken(payloads);
    user.token = token;
    response = await user.save();
    res.status(200).json({
      messsage: "Signup Successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Server Error",
      error: error,
    });
    console.log(error);
  }
});
route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user ) {
      res.status(401).send({ messsage: "user not exist"});
      return;
    }
    const payloads = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = generateJwtToken(payloads);
    res.status(200).json({
      messsage: "Login Successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Server Error",
      error: error,
    });
  }
});
route.delete("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      messsage: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Server Error",
      error: error,
    });
  }
});

route.patch("/", jwtAuthMiddleWare, async (req, res) => {
  try {
    const { prevpassword, currentpassword } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!(await user.comparePassword(prevpassword))) {
      res.status(502).json({ message: "Invalid password"});
    }
    user.password = currentpassword;
    await user.save();
    res.status(200).json({ message: "Password changed sucessfully" });
  } catch (error) {
    res.status(500).json({
      messsage: "Server Error",
      error: error,
    });
  }
});
route.patch("/user", jwtAuthMiddleWare, async (req, res) => {
  try {
    const { ...updatedData } = req.body;
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    await user.save();
    res.status(200).json({ message: "updated sucessfully", user: user });
  } catch (error) {
    res.status(500).json({
      messsage: "Server Error",
      error: error,
    });
  }
});

module.exports = route;
