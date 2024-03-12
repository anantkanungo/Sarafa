const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Array to keep track of OTPs
let arr = [];

const otpUpdates = (req, res) => {
  const currentDate = new Date();

  const filteredArr = arr.filter((obj) => {
      const expiresAtDate = new Date(obj.expiresAt);
      return currentDate < expiresAtDate;
  });
  
  // console.log(arr[0]);
  // console.log("hello");
  // console.log("arrr", filteredArr);
  res.json({ data: filteredArr });
//  console.log("arr", arr);
};

const broadcastOtp = (userData) => {
  // console.log("hello");
 arr.push(userData);
};
// Array to keep track of connected clients
// let clients = [];

// const otpUpdates = (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   clients.push(res);

//   // req.on('close', () => {
//   //    clients = clients.filter(client => client !== res);
//   // });
// };
// const broadcastOtp = (otp) => {
//   clients.forEach(client => {
//     client.write(`data: ${JSON.stringify({ otp })}`);
//     client.write('\n\n');
//   });
// };
//Otp //
const GenerateOtp = async (req, res) => {
  const userExists = await User.findOne({ userId: req.body.userId });
  // console.log("userExists", userExists);
  if (!userExists) {
    return res.json({ message: "Invalid User", success: false });
  }
  else {
    function generateOtp(length) {
      let otp = ''
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString()
      }
      return otp;
    }
     // Store OTP in the database with expiration time
     const expirationTime = new Date();
     expirationTime.setMinutes(expirationTime.getMinutes() + 10);

    // const hash = await bcrypt.hash(generateOtp(6), 10);
    userData = await User.findOneAndUpdate({ userId: req.body.userId }, {
      $set: {
        password: generateOtp(6),
        expiresAt: expirationTime,
        device_info: req.body.device_info
      }
    },
      { new: true }
    );

    // console.log("otp", userData);
    if (userData) {
      broadcastOtp(userData); // Broadcast the OTP to all connected clients
      res.json({ data: userData, success: true, message: 'OTP generated and broadcasted.' });
      // res.json({ data: getotp, success: true })
    }
    else {
      res.json({ message: error, success: false })
    }
  }
}

// User Login //
const UserLogin = async (req, res) => {
  const userExists = await User.findOne({ $and:[{ userId: req.body.userId }, { password: req.body.password }, {expiresAt: { $gt: new Date() }}]});
  // const users = await userRepository.findOne({ where: { id: user.id, otp_expire_time: MoreThanOrEqual(time), otp: otp } });
  // console.log("userExists", userExists);
  if (!userExists) {
    return res.json({ message: "Invalid User", success: false });
  }
  else {

    // bcrypt.compare(req.body.password, userExists.password, async (err, result) => {
    if (userExists) {
      // Token
      const token = await jwt.sign({ uid: userExists._id, uname: userExists.name }, process.env.SECRET_KEY, { expiresIn: '100hr' });
      // console.log(token);
      // console.log(userExists.name);
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

module.exports = { otpUpdates, GenerateOtp, UserLogin }