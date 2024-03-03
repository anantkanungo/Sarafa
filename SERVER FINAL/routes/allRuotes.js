const express = require("express");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
const { Login } = require("../controllers/adminLogin");
const { CreateUser } = require("../controllers/createUser");
const {otpUpdates, GenerateOtp, UserLogin } = require("../controllers/userLogin");
const {KarigerTask, WorkshopTask , OrderStatus, Admin_WorkshopTask, Admin_KarigerTask, WorkshopAssignTask} = require("../controllers/assignTask");
const { GetAllOrder, PlaceOrder, PendingOrders, CartOrder } = require("../controllers/order");
const { Admin_GetAllOrder,Admin_AllOrder, Admin_GetOrder, Admin_DelOrder ,Admin_UpdateStatus } = require("../controllers/adminOrder");
const { CustomerList, DistributorList, WorkshopList, KarigerList, CustomerDel, DistributorDel, KarigerDel, WorkshopDel, KarigerInWrkList, Admin_ShopsofDistributor, ShopsofDistributor  } = require("../controllers/userList");
const { authMiddleware } = require("../middleware/authMiddleware");
// const uploadMiddleware = require('../middleware/uploadMiddleware');
const { CreateCatalog,AddMultiple, GetAllCatalog , UpdateCatalog , GetCatalog,DeleteCatalog ,AddCatCategory, GetCatCategory, UpdateCatCategory} = require("../controllers/adminCatalog");
const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const s3 = new AWS.S3({
  endpoint: process.env.DO_ENDPOINT,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});


// Create multer upload instance
const upload = multer({
  storage: new multerS3({
    s3: s3,
    bucket: 'ngjewel',
    acl: 'public-read',
    key: function (req, file, cb) {
    let folderPath= '';
      if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mpeg') {
        folderPath = 'audio/';
      } else if(file.mimetype === 'image/jgp' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        if(file.fieldname === 'galleryImage' || file.fieldname === 'cameraImage'){
          folderPath = 'images/'; // your folder name
        } else if(file.fieldname === 'catalog'){
          folderPath = 'catalog/';
        }
      }
      else{
        console.log("check the file type ")
      }
      const key = folderPath + Date.now() + file.originalname;
      cb(null, key);
    }
  })
});


//// ADMIN PANEL ////
// POST Request || admin login 
router.post('/adminlogin', Login);
// POST Request || Add User 
router.post('/adduser', CreateUser);
// GET Request || OTP-Updates
router.get('/otp-updates',otpUpdates );
// POST Request || Add item into catalog in admin panel
router.post('/addcatalog',upload.fields([
  {name: 'catalog', maxCount: 12}
]),authMiddleware, CreateCatalog);
// POST Request || Add multiple item into catalog in admin panel
router.post('/multicatalog',upload.fields([
  {name: 'catalog', maxCount: 12}
]),authMiddleware, AddMultiple);
// Get Request || get catalog
router.get('/getcatalog/:id',authMiddleware, GetCatalog);
// Put Request || update  a particular order
router.put('/update/catalog/:id',authMiddleware, UpdateCatalog);
// Delete Request || delete catalog category
router.delete('/delete/catalog/:delId',authMiddleware,DeleteCatalog);
// Get Request || get catalog list
router.get('/getallcatalog',authMiddleware,GetAllCatalog);
// Post Request || post catalog category
router.post('/addcatalog/category',upload.single('catalog'),authMiddleware,AddCatCategory);
// Get Request || get catalog category
router.get('/getallcatalog/category',authMiddleware,GetCatCategory);
// Put Request || update catalog category
router.put('/update/category/:id',authMiddleware,UpdateCatCategory);
// Delete Request || delete catalog category
// router.delete('/delete/category/:delId',DeleteCatalog);
// Get Request || get orders
router.get('/getallorders',authMiddleware, Admin_GetAllOrder);
router.get('/allorders/:id',authMiddleware, Admin_AllOrder);

// Get Request || get order
router.get('/getallorders/:id',authMiddleware, Admin_GetOrder);
// Put Request || update  a particular order
router.put('/update/order/:id',authMiddleware, Admin_UpdateStatus);
// Delete Request || delete a particular order
router.delete('/delete/order/:delId',authMiddleware, Admin_DelOrder);
// Get Request || get all customers
router.get('/customer/list',authMiddleware,CustomerList);
// Delete Request || delete particular customer
router.delete('/customer/delete/:delId',authMiddleware, CustomerDel)
// Get Request || get all distributors
router.get('/distributor/list',authMiddleware, DistributorList);
// Delete Request || delete particular customer
router.delete('/distributor/delete/:delId',authMiddleware, DistributorDel)

router.get('/distributor/shops/:id',authMiddleware, Admin_ShopsofDistributor);

// Get Request || get all workshops
router.get('/workshop/list',authMiddleware, WorkshopList);
router.get('/workshop/kariger/:id',authMiddleware, KarigerInWrkList);

router.get('/workshop/alltask/:id',authMiddleware, Admin_WorkshopTask);
router.get('/kariger/alltask/:id',authMiddleware, Admin_KarigerTask);
// Delete Request || delete particular customer
router.delete('/workshop/delete/:delId',authMiddleware, WorkshopDel )
// Get Request || get all kariger
router.get('/kariger/list',authMiddleware, KarigerList);
// Delete Request || delete particular customer
router.delete('/kariger/delete/:delId',authMiddleware, KarigerDel )

//// CUSTOMER PANEL ////
// PUT Request || get otp 
router.put('/getotp', GenerateOtp);
// POST Request || user login 
router.post('/userlogin', UserLogin);
// POST Request || add order
router.post('/placeorder', upload.fields([
  {name: 'audio', maxCount: 2},
  {name: 'cameraImage', maxCount: 12},
  {name: 'galleryImage', maxCount: 12}

]), authMiddleware, PlaceOrder);
// POST Request || order from cart
router.post('/cartorder',
 authMiddleware, CartOrder);
// GET Request || get all orders in cutomer panel
router.get('/allorders', authMiddleware, GetAllOrder);
// GET Request || get all pending orders in cutomer panel
router.get('/pendingorders', authMiddleware, PendingOrders);

// kariger //
router.get('/kariger/task', authMiddleware, KarigerTask);
router.put('/update/task/:id', authMiddleware, OrderStatus);

// workshop //
router.get('/workshop/task', authMiddleware, WorkshopTask);
router.put('/assign/task', authMiddleware, WorkshopAssignTask);

router.get('/distributor/shops',authMiddleware, ShopsofDistributor);


module.exports = router;
