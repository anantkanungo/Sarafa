const User = require('../models/user');
const Broker = require('../models/broker');
const Customer = require('../models/customer');
const Kariger = require('../models/kariger');
const Workshop = require('../models/workshop');

// Add User into db
const CreateUser = async (req, res) => {
const userExists = User.findOne({userId: req.body.userId});
if (userExists){
    res.json({message : "User Already registered"})
}
else{
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        req.body.password = hash;
        let userData = new User({
            userId : req.body.userId,
            password: req.body.password,
            role: req.body.role
        });
        userData.save()
        .then(()=>{
            const userDetails = userData.role === 'customer'
            ? new Customer ({
                userId : userData._id,
                name : req.body.name,
                address : req.body.address
            })
            : userData.role=== 'broker'
            ? new Broker({
                userId : userData._id,
                name : req.body.name,
                address : req.body.address
            })
            : userData.role=== 'workshop'
            ? new Workshop({
                userId : userData._id,
                name : req.body.name,
                address : req.body.address
            })
            : new Kariger({
                userId : userData._id,
                name : req.body.name,
                workshop : req.body.workshop,
                address : req.body.address
            })
            userDetails.save().then(() => {
                // Token
                const token = jwt.sign({ "uid": userData._id }, process.env.SECRET_KEY, { expiresIn: '1hr' });
    
                if (token) {
                  res.json({
                    token: token,
                    role: userData.role,
                    message: "Signup Successfully",
                    success: true
                  })
                }
                else {
                  res.json({ message: "Error", success: false });
                }
              })
            })
        })
    }
}

module.exports = {CreateUser};