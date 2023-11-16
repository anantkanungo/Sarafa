const express = require("express");
const multer = require('multer');
const { Login } = require("../controllers/adminLogin");
const { CreateUser } = require("../controllers/createUser");
const { UserLogin } = require("../controllers/userLogin");
const { GetAllOrder, PlaceOrder, PendingOrders } = require("../controllers/order");
const { authMiddleware } = require("../middleware/authMiddleware");
const { CreateCatalog, GetCatalog } = require("../controllers/catalog");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ "-"+ file.originalname)
    }
})

const upload = multer({ storage });

// POST Request || admin login 
router.post('/adminlogin', Login);
// POST Request || Add User 
router.post('/adduser', CreateUser);
// POST Request || user login 
router.post('/userlogin', UserLogin);
// POST Request || add order
router.post('/placeorder', upload.single('design'), PlaceOrder);
// GET Request || get all orders in cutomer panel
router.get('/allorders', GetAllOrder);
// GET Request || get all pending orders in cutomer panel
router.get('/pendingorders', PendingOrders);
// POST Request || Add item into catalog in admin panel
router.post('/addcatalog', upload.single('design'), CreateCatalog);
// Get Request || get catalog list
router.get('/getcatalog',GetCatalog);


module.exports = router;
