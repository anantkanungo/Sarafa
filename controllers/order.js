const AddOrder = require('../models/addOrder');

const PlaceOrder = async(req, res)=>{
    const {category,description,quantity, size, weight, tunch, urgent} = req.body;
    const result = await AddOrder({category ,description ,quantity, size, weight, tunch, urgent});
    console.log("result", result);
    const data = await result.save();
    console.log("data",data);
    if (data) {
        res.json({result: data, message: "Order Placed...", success: true });
      }
      else {
        res.json({ message: "error", success: false });
      }
}

const GetAllOrder = async(req, res)=>{
  const allorders = await AddOrder.find({});
  // console.log(allorders);
  if(allorders){
    res.json({result: allorders , success: true})
  }
  else{
    res.json({message: error, success: false})
  }
}

const PendingOrders =async (req, res)=>{
  // const id = req.body.uid;
  let today = new Date();
  let thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
  // const pendingOrders = await AddOrder.findById(id)
  // .populate('createdBy')
  // .exec();
  const pendingOrders = await AddOrder.findById( ({createdAt: {$gte: thirtyDaysAgo }}));
  if(pendingOrders){
    res.json({result: pendingOrders , success: true})
  }
  else{
    res.json({message: error, success: false})
  }
}


 module.exports = {PlaceOrder,GetAllOrder, PendingOrders};
