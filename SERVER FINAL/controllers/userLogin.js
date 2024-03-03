const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Array to keep track of connected clients
let clients = [];

const otpUpdates = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  clients.push(res);
 
  req.on('close', () => {
     clients = clients.filter(client => client !== res);
  });
 };
const broadcastOtp = (otp) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ otp })}`);
    client.write('\n\n');
  });
};
//Otp //
const GenerateOtp = async (req, res) => {
  const userExists = await User.findOne({ userId: req.body.userId });
  // console.log("userExists", userExists);
  if (!userExists) {
    return res.json({ message: "Invalid User", success: false });
  }
  else {
    function generateOtp(length){
      let otp = ''
      for(let i = 0; i < length; i++){
        otp += Math.floor(Math.random()* 10).toString()
      }
      return otp;
    }
    // const hash = await bcrypt.hash(generateOtp(6), 10);
    getotp = await User.findOneAndUpdate({userId: req.body.userId}, {
      $set: {
        password: generateOtp(6),
        device_info: req.body.device_info
      }
    },
    { new: true } 
    );

    console.log("otp", getotp);
    if (getotp) {
      broadcastOtp(getotp); // Broadcast the OTP to all connected clients
  res.json({data: getotp, success: true, message: 'OTP generated and broadcasted.' });
      // res.json({ data: getotp, success: true })
    }
    else {
      res.json({ message: error, success: false })
    }
  }
}

// User Login //
const UserLogin = async (req, res) => {
    const userExists = await User.findOne({ password: req.body.password });
    // console.log("userExists", userExists);
    if (!userExists) {
      return res.json({ message: "Invalid User", success: false });
    }
    else {
  
      // bcrypt.compare(req.body.password, userExists.password, async (err, result) => {
        if (userExists) {
      // Token
      const token =await jwt.sign({ uid : userExists._id, uname : userExists.name }, process.env.SECRET_KEY, { expiresIn: '100hr' });
      console.log(token);
      console.log(userExists.name);
      if (token) {
  
         res.json({
          username: userExists.name,
          token: token,
          role: userExists.role,
          message: "Login Successfully",
          success: true
        })
      }
    }
      else {
        res.json({ message: "Error", success: false });
      }
    }
      // )}
  
  }
  
module.exports = {otpUpdates, GenerateOtp, UserLogin }