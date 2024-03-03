const jwt = require('jsonwebtoken');
const AdminLogin = require('../models/adminLogin');
const bcrypt = require('bcryptjs');
// Admin Login //
const Login = async(req, res)=>{
    console.log("req", req.body);
    const userExists = await AdminLogin.findOne({userId: req.body.userId});
    if(!userExists){
        return res.json({message: "Invalid User", success: false});
    }
    else{
     const password=  userExists.password === req.body.password;
      if(password){

      
      // bcrypt.compare(req.body.password, userExists.password, async (err, result) => {
      //   if (result) {
       // Token
       const token = await jwt.sign({ uid: userExists._id, uname: userExists.name}, process.env.SECRET_KEY, {  expiresIn: '180d' });
       console.log(token);
           if (token) {
             res.json({
               token: token,
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
 module.exports = {Login}