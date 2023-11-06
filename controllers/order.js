const AddOrder = require('../models/addOrder');

const PlaceOrder = async(req, res)=>{
    const {category, image,description,quantity, size, weight, tunch } = req.body;
    const result = await AddOrder({category, image ,description ,quantity, size, weight, tunch});
    const data = await result.save();
    if (data) {
        res.json({ message: "Order Placed...", success: true });
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



 module.exports = {PlaceOrder,GetAllOrder};
