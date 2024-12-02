const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
// Route for Register

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: true,
        message: "user already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashCode = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashCode;
    const newUser = await User(req.body);
    await newUser.save(); // saves the data in the database

    res.send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req,res) => {
  try {
    const userExists = await User.findOne({email: req.body.email});

    if(!userExists){
      return res.send({
        success : false,
        message : "You are not register, Register first"
      })
    }

    const validPass = await bcrypt.compare(req.body.password, userExists.password);

    if(!validPass){
      return res.send({
        success: false,
        message : "Incorrect Password"
      })
    }

    const Token = jwt.sign({userId: userExists._id}, `${process.env.SECRET_KEY}`,{expiresIn:  "1d"});
    return res.send({
      success: true,
      message: "You login succesfully",
      user : userExists,
      token: Token
    })
  } catch (error) {
    console.log(error);
  }
})


router.get("/get-current-user", authMiddleware, async (req,res)=>{
  const user = await User.findById(req.body.userId).select('-password')
  console.log(user);

  res.send({
    success:  true,
    message: 'User Autherized for Protected Route',
    data: user,
  })
})

module.exports = router;
