const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Customer = require("../models/customer");
const Distributor = require("../models/distributor");
const Workshop = require("../models/workshop");
const Kariger = require("../models/kariger");

const CreateUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ userId: req.body.userId });
        if (userExists) {
            return res.status(400).send("userId Already registered");
        }
 
        // const hash = await bcrypt.hash(req.body.password, 10);
        let userData = new User({
            userId: req.body.userId,
            // password: hash,
            role: req.body.role,
            name: req.body.name,
        });
 
        await userData.save();
 
        let userDetails;
        switch(userData.role) {
            case 'customer':
                userDetails = new Customer({
                   uid: userData._id,
                   userId: req.body.userId,
                //    password: hash,
                   name: req.body.name,
                   agent: req.body.agent,
                   address: req.body.address,
                   profile: req.body.profile,
                   phone: req.body.phone,
                   broker: req.body.broker
                });
                break;
            case 'distributor':
                userDetails = new Distributor({
                   uid: userData._id,
                   userId: req.body.userId,
                //    password: hash,
                   name: req.body.name,
                   agent: req.body.agent,
                   address: req.body.address,
                   profile: req.body.profile,
                   phone: req.body.phone,
                   broker: req.body.broker
                });
                break;
            case 'workshop':
                userDetails = new Workshop({
                   uid: userData._id,
                   userId: req.body.userId,
                //    password: hash,
                   name: req.body.name,
                   address: req.body.address,
                   profile: req.body.profile,
                   phone: req.body.phone,
                   orders: req.body.orders
                });
                break;
            case 'kariger':
                userDetails = new Kariger({
                   uid: userData._id,
                   userId: req.body.userId,
                //    password: hash,
                   name: req.body.name,
                   address: req.body.address,
                   profile: req.body.profile,
                   phone: req.body.phone,
                   workshop: req.body.workshop,
                   statusIs: req.body.statusIs
                });
                break;
            default:
                return res.status(400).send("Invalid Role");
        }
 
        await userDetails.save();
 
        if (userData.role === "kariger") {
            await Workshop.findByIdAndUpdate(userDetails.workshop, {
                $push: {
                   kariger: userDetails._id
                }
            });
        }
 
        res.json({
            message: "User Added...",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.json({ message: "Error", success: false });
    }
 }
 
// Add User into db
// const CreateUser = async (req, res) => {
//     const userExists = await User.findOne({ userId: req.body.userId });
//     if (userExists) {
//         return res.status(400).send("userId Already registered");

//     }
//     else {
//         bcrypt.hash(req.body.password, 10, async (err, hash) => {
//             req.body.password = hash;
//             let userData = new User({
//                 userId: req.body.userId,
//                 password: req.body.password,
//                 role: req.body.role,
//                 name: req.body.name,
//             });
//             userData.save().then(() => {
//                 const userDetails = userData.role === "customer"
//                     ? new Customer({
//                         uid: userData._id,
//                         userId: req.body.userId,
//                         password: req.body.password,
//                         name: req.body.name,
//                         agent: req.body.agent,
//                         address: req.body.address,
//                         profile: req.body.profile,
//                         phone: req.body.phone,
//                         broker: req.body.broker
//                     })
//                     : userData.role === "distributor"
//                         ? new Distributor({
//                             uid: userData._id,
//                             userId: req.body.userId,
//                             password: req.body.password,
//                             name: req.body.name,
//                             agent: req.body.agent,
//                             address: req.body.address,
//                             profile: req.body.profile,
//                             phone: req.body.phone,
//                             broker: req.body.broker
//                         })
//                         : userData.role === "workshop"
//                             ? new Workshop({
//                                 uid: userData._id,
//                                 userId: req.body.userId,
//                                 password: req.body.password,
//                                 name: req.body.name,
//                                 address: req.body.address,
//                                 profile: req.body.profile,
//                                 phone: req.body.phone,
//                                 orders: req.body.orders
//                             })
//                             : new Kariger({
//                                 uid: userData._id,
//                                 userId: req.body.userId,
//                                 password: req.body.password,
//                                 name: req.body.name,
//                                 address: req.body.address,
//                                 profile: req.body.profile,
//                                 phone: req.body.phone,
//                                 workshop: req.body.workshop,
//                                 statusIs: req.body.statusIs
//                             });
//                 userDetails.save().then(() => {
//                     if (userData.role === "kariger") {
//                         const isMatch = Workshop.findByIdAndUpdate({ _id: req.body.workshop }, {
//                             $push: {
//                                 kariger: userDetails._id
//                             }
//                         });
//                     }
//                     // Token
//                     // const token = jwt.sign({ "uid": userData._id, }, process.env.SECRET_KEY, { expiresIn: '100hr' });
//                     console.log("isMatch", userDetails);

//                     if (userDetails) {
//                         res.json({
//                             // token: token,
//                             // role: userData.role,
//                             message: "User Added...",
//                             success: true
//                         })
//                     }
//                     else {
//                         res.json({ message: "Error", success: false });
//                     }
//                 });
//             })
//         })


//     }

//     // bcrypt.hash(req.body.password, 10, async (err, hash) => {
//     //     req.body.password = hash;
//     //     let userData = new User({
//     //         userId : req.body.userId,
//     //         password: req.body.password,
//     //         role: req.body.role
//     //     });
//     //     userData.save()
//     //     .then(()=>{
//     //         const userDetails = userData.role === 'customer'
//     //         ? new Customer ({
//     //             // userId : userData._id,
//     //             name : req.body.name,
//     //             address : req.body.address
//     //         })
//     //         : userData.role=== 'broker'
//     //         ? new Broker({
//     //             // userId : userData._id,
//     //             name : req.body.name,
//     //             address : req.body.address
//     //         })
//     //         : userData.role=== 'workshop'
//     //         ? new Workshop({
//     //             // userId : userData._id,
//     //             name : req.body.name,
//     //             address : req.body.address
//     //         })
//     //         : new Kariger({
//     //             // userId : userData._id,
//     //             name : req.body.name,
//     //             workshop : req.body.workshop,
//     //             address : req.body.address
//     //         })
//     //         userDetails.save().then(() => {
//     //             // Token
//     //             const token = jwt.sign({ "uid": userData._id }, process.env.SECRET_KEY, { expiresIn: '1hr' });

//     //             if (token) {
//     //               res.json({
//     //                 token: token,
//     //                 role: userData.role,
//     //                 message: "Signup Successfully",
//     //                 success: true
//     //               })
//     //             }
//     //             else {
//     //               res.json({ message: "Error", success: false });
//     //             }
//     //           })
//     //         })
//     //     })

// }

module.exports = { CreateUser };