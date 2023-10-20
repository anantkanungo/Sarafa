const User = require('../models/user');

// Admin Login //
const UserLogin = async(req, res)=>{
    const userExists = await User.findOne({userId: req.body.userId});
    if(!userExists){
        return res.json({message: "Invalid User", success: false});
    }
    else{
        // Token
        const token = jwt.sign({ uid: userExists._id }, process.env.SECRET_KEY, { expiresIn: '1hr' });
    
        if (token) {
          res.json({
            token: token,
            role : userExists.role,
            message: "Login Successfully",
            success: true
          })
        }
        else {
          res.json({ message: "Error", success: false });
        }
    }

}
 module.exports = {UserLogin}