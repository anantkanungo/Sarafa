const express = require("express");
const { Login } = require("../controllers/adminLogin");
const { CreateUser } = require("../controllers/createUser");
const { UserLogin } = require("../controllers/userLogin");
const router = express.Router();


// POST Request || admin login 
router.post('/adminlogin', Login);
// POST Request || Add User 
router.post('/adduser', CreateUser);
// POST Request || user login 
router.post('/userlogin', UserLogin);
// POST Request || add product
router.post('/placeorder', PlaceOrder)
// GET Requst || get all products in admin panel
router.get('/allorders', GetAllOrder)

module.exports = router;
