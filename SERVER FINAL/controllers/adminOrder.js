const AddOrder = require('../models/addOrder');
const Kariger = require('../models/kariger');
const Workshop = require('../models/workshop');
// Get All Orders 
const Admin_GetAllOrder = async (req, res) => {
  console.log(req.body);
  const allorders = await AddOrder.find({}).populate('createdBy');
  // console.log(allorders);
  if (allorders) {
    res.json({ data: allorders, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

// Get All Orders of a particular customer
const Admin_AllOrder = async (req, res) => {
  console.log(req.params.id);
  const allorders = await AddOrder.find({ createdBy: req.params.id });
  // console.log(allorders);
  if (allorders) {
    res.json({ data: allorders, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

const Admin_GetOrder = async (req, res) => {
  console.log("req.params", req.params);
  const order = await AddOrder.find({ _id: req.params.id });
  // console.log(allorders);
  if (order) {
    res.json({ data: order, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}


const Admin_UpdateStatus = async (req, res) => {
  console.log("req.body", req.body);
  let order;
  let  updatedKariger;
  try {
    let w_name, wname, k_name, kname;
try {
 w_name = await Workshop.find({ _id: req.body.workshop });
 console.log("wname", w_name);
 wname = w_name[0].name;
 console.log("w_name[0].name", w_name[0].name);

 if (req.body.kariger !== "") {
   k_name = await Kariger.find({ _id: req.body.kariger });
   console.log("kname", k_name);
   kname = k_name[0].name;
   console.log("k_name[0].name", k_name[0].name);
 }

  order = await AddOrder.findOneAndUpdate({ _id: req.body.order }, {
   $set: {
     statusIs: "processing",
     kariger: kname || "",
     workshop: wname
   }
 },
 { new: true } 
 );
 console.log("order", order);

    
    const workshop = await Workshop.findOneAndUpdate({ _id: req.body.workshop }, {
      $push: {
        task: order
      },
    });
 
    console.log("data", workshop, );

  const { kariger = "" } = req.body;
  
  if (!kariger) {
    return;
  } else {
    updatedKariger = await Kariger.findOneAndUpdate(
     { _id: kariger },
     {
       $push: {
         task: order
        },
        $set: {
          statusIs: "busy"
        }
      }
      );
    } 
    console.log("data", updatedKariger, workshop, order);
  }catch (error) {
      console.error(error);
     }
      
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during the process.', message: error });
  }
  }
const Admin_DelOrder = async (req, res) => {
  // console.log("delete", req.params.delId);
  try {
    const order = await AddOrder.findByIdAndDelete(req.params.delId);
    // console.log("allorders", order);
    if (order) {
      res.json({ data: order, message: "Order Deleted", success: true })
    } else {
      res.json({ message: 'error', success: false })
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the order', success: false });
  }
}
module.exports = { Admin_GetAllOrder, Admin_AllOrder, Admin_UpdateStatus, Admin_DelOrder, Admin_GetOrder }