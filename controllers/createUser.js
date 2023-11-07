const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Broker = require('../models/broker');
const Customer = require('../models/customer');
const Kariger = require('../models/kariger');
const Workshop = require('../models/workshop');

// Add User into db
const CreateUser = async (req, res) => {
    const userExists = await User.findOne({ userId: req.body.userId });
    if (userExists) {
        return res.status(400).send("User Already registered");

    }
    else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            req.body.password = hash;
            let userData = new User({
                userId: req.body.userId,
                password: req.body.password,
                role: req.body.role,
                name: req.body.name,
                address: req.body.address
            });
            userData.save().then(() => {
                // Token
                const token = jwt.sign({ "uid": userData._id }, process.env.SECRET_KEY, { expiresIn: '100hr' });

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
    }

}

module.exports = {CreateUser};
