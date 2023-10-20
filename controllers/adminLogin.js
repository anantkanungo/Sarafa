const AdminLogin = require('../models/adminLogin');

// Admin Login //
const Login = async(req, res)=>{
    const userExists = await AdminLogin.findOne({userId: req.body.userId});
    if(!userExists){
        return res.json({message: "Invalid User", success: false});
    }
    else{
        res.json({ message: "Login Successfully...", success: true});
    }

}
 module.exports = {Login}