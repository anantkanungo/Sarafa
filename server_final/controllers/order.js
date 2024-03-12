const AddOrder = require('../models/addOrder');
const Distributor = require('../models/distributor');
const Customer = require('../models/customer');

const PlaceOrder = async (req, res) => {
  const data = req.body;
   let username = data.uname;

  if (username.includes(" ")) {
    var uname = username.replace(/ /g, "").toUpperCase().slice(0, 4);
  } else{
     uname = username.toUpperCase().slice(0, 4);
  }
  let randomNumbers = [];
  while (randomNumbers.length < 4) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
  }

  // Step 4: Concatenate the username and the random numbers to form the order ID
  const orderId = uname + randomNumbers.join('');

  // console.log("data", data);
  // console.log("uid", req.body.uid);
  // console.log("aaaa", req.body);

  // Retrieve uploaded files
  let imagefiles = Array.isArray(req.files.cameraImage) ? req.files.cameraImage : [req.files.cameraImage];
  imagefiles = imagefiles.concat(Array.isArray(req.files.galleryImage) ? req.files.galleryImage : [req.files.galleryImage]);
  // let imagefiles =[...req.files.cameraImage , ...req.files.galleryImage];
  let audiofiles = req.files.audio;
  // console.log("imagefiles", imagefiles);
  let images = [];
  let audio = [];
  // let images =  imagefiles.map(file => `${file.location}`);
  // let audio =  audiofiles.location;
  // Validate file types 
  if (Array.isArray(imagefiles)) {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const files = imagefiles
      .filter(file => file !== undefined && imageTypes.includes(file.mimetype))
      .map(file => `${file.location}`);
    // console.log("imagefiles", files);
    images.push(...files);
  }

  if (Array.isArray(audiofiles)) {
    const audioType = ['audio/mp3', 'audio/mpeg'];
    const files = audiofiles
      .filter(file => audioType.includes(file.mimetype))
      .map(file => `${file.location}`);
    // console.log("audiofiles", files);
    audio.push(...files);

  }


  // console.log("images", images);
  // const results = await Promise.all(data.map(item => new AddOrder(
  //   {
  try {
    const result = await AddOrder({
      createdBy: data.uid,
      orderId: orderId,
      category: data.category,
      description: data.description,
      quantity: data.quantity,
      size: data.size,
      weight: data.weight,
      tunch: data.tunch,
      statusIs: data.statusIs,
      urgent: data.urgent,
      image: images,
      audio: audio,
    });
    // console.log("result", result);

    const order = await result.save();
    // console.log("order", order);

    if (order) {
      // res.json({ data: order, message: "Order Placed...", success: true });
      res.status(200).json({ data: order, message: "Order Placed...", success: true });
    }
    else {
      res.json({ message: error, success: false, });
    }
  } catch (error) {
    console.log("error", error);
  }
}

// Get All Orders by a particular customer
const GetAllOrder = async (req, res) => {
  // console.log(req.body);
  // let query =  await AddOrder.find({ createdBy: req.body.uid }).populate('createdBy').sort({timestamp: -1 });
  // let allorders = query.exec();
  let allorders = await AddOrder.find({ createdBy: req.body.uid }).populate('createdBy').sort({ 'message.timestamp': -1 }).exec();
  // console.log(allorders);
  if (allorders) {
    res.json({ data: allorders, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}
// Get Distributors Orders
const GetDistOrder = async (req, res) => {
  // console.log(req.body);
  // let query =  await AddOrder.find({ createdBy: req.body.uid }).populate('createdBy').sort({timestamp: -1 });
  // let allorders = query.exec();
  let isMatch = await Distributor.find({agent : req.body.agent});
  // console.log(isMatch);
  if (isMatch) {
    let customer = await Customer.find({agent : req.body.agent})
    res.json({ data: customer, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

// Get All Pending Orders by a particular customer
const PendingOrders = async (req, res) => {
  let today = new Date();
  let thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
  const pendingOrders = await AddOrder.find({ $and: [{ createdBy: req.body.uid }, { createdAt: { $gte: thirtyDaysAgo } }, { statusIs: "pending" }] })
    .sort({ _id: -1 })
    .populate('createdBy')
    .exec();
  if (pendingOrders) {
    res.json({ result: pendingOrders, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

// Get All Cart Orders by a particular customer
const CartOrder = async (req, res) => {
  const uid = req.body.uid;
  // console.log("req.body", req.body);
  let username = req.body.uname;

  if (username.includes(" ")) {
    var uname = username.replace(/ /g, "").toUpperCase().slice(0, 4);
  } else{
     uname = username.toUpperCase().slice(0, 4);
  }
  let randomNumbers = [];
  while (randomNumbers.length < 4) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
  }

  // Step 4: Concatenate the username and the random numbers to form the order ID
  const orderId = uname + randomNumbers.join('');
  // const orderId = req.body.uname.slice(0, 4) + req.body.uid.slice(0, 3);
  const data = Array.isArray(req.body) ? req.body : [req.body];
  // console.log("data", data);
  // console.log("uid", req.body.uid);


  // Retrieve uploaded files
  // let imagefiles = Array.isArray(req.files.cameraImage) ? req.files.cameraImage : [req.files.cameraImage];
  // let imagefiles = Array.isArray(req.files.galleryImage) ? req.files.galleryImage : [req.files.galleryImage];
  // let imagefiles =[...req.files.cameraImage , ...req.files.galleryImage];

  // let images = [];
  // Validate file types 
  // if (Array.isArray(imagefiles)) {
  //   const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  //   const files = imagefiles
  //     .filter(file => file !== undefined && imageTypes.includes(file.mimetype))
  //     .map(file => `${file.location}`);
  //   console.log("imagefiles", files);
  //   images.push(...files);
  // }




  // console.log("images", images);


  let items = data.map(item => {
    if (item && Object.keys(item).length > 0) {
      // console.log("itemSet", item);
      return {
        createdBy: uid,
        orderId: orderId,
        category: item.category,
        description: item.description,
        quantity: item.quantity,
        size: item.size,
        weight: item.weight,
        tunch: item.tunch,
        statusIs: item.statusIs,
        urgent: item.urgent,
        image: item.image,
      }
    };
  });
  // console.log("dataItem", items);
  const orders = await AddOrder.insertMany(items);
  // console.log("Orders Added!", orders);
  if (orders) {
    res.status(200).json({ data: orders, message: "Orders Placed...", success: true });
  }
  // .then((orders) => {
  //   console.log("Orders Added!", orders);
  //   res.status(200).json({ data: orders, message: "Orders Placed...", success: true });
  // }).catch(err => res.status(400).json("Error: " + err));

}
// const results = await Promise.all(data.map(item => new AddOrder(
//   {
// try {
//   const results = await AddOrder.insertMany(data.map(item => (
//     console.log("itemssss", item.item),
//     {

//       createdBy: uid,
//       category: item.item.category,
//       description: item.item.description,
//       quantity: item.item.quantity,
//       size: item.item.size,
//       weight: item.item.weight,
//       tunch: item.item.tunch,
//       statusIs: item.item.statusIs,
//       urgent: item.item.urgent,
//       image: images,
//       audio: audio,
//     }
//   )));
//   res.status(200).json({ data: results, message: "Orders Placed...", success: true });
//   console.log("results", results);
// } catch (error) {
//   console.log("error", error);
// }


module.exports = { PlaceOrder, GetAllOrder, PendingOrders, CartOrder, GetDistOrder };