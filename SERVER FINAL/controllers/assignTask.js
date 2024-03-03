
const Workshop = require('../models/workshop');
const Kariger = require('../models/kariger');
const AddOrder = require('../models/addOrder');




//  // Get All Task for a particular kariger
const KarigerTask = async (req, res) => {
  console.log(req.body);
  let isMatch = await Kariger.find({ uid: req.body.uid }).populate('task').exec();
  console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

const WorkshopTask = async (req, res) => {
  console.log(req.body);
  let isMatch = await Workshop.find({ uid: req.body.uid }).populate('task').exec();
  console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

const Admin_WorkshopTask = async (req, res) => {
  console.log(req.body);
  let isMatch = await Workshop.find({ _id: req.params.id }).populate('task').exec();
  console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

const Admin_KarigerTask = async (req, res) => {
  console.log(req.params);
  let isMatch = await Kariger.find({ _id: req.params.id }).populate('task').exec();
  console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}
const WorkshopAssignTask = async (req, res) => {
  console.log(req.body.order);
  console.log(req.body.kariger);

  // const kariger = await Kariger.findOneAndUpdate({ _id: req.body.kariger }, {
  //   $push: {
  //     task: req.body.order
  //   },
  // },
  //   { new: true }
  // );
  let kariger = await Kariger.findById(req.body.kariger);

  if (!kariger.task.some(id => id.equals(req.body.order))) {
   kariger = await Kariger.findOneAndUpdate(
     { _id: req.body.kariger },
     { $push: { task: req.body.order } },
     { new: true }
   );
  } else{
    res.json({ message: "Task Already Assigned", success: false })
  }
  console.log("kariger", kariger);
  if (kariger) {
    res.json({ data: kariger, success: true })
  }
}
const OrderStatus = async (req, res) => {
  // console.log("req", req.req);
  console.log("params", req.params.id);

  let isMatch = await AddOrder.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      statusIs: req.body.statusIs,

    }
  },
    { new: true }
  );
  console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true });
  }
  else {
    res.json({ message: error, success: false })
  }

}


module.exports = { KarigerTask, WorkshopTask, OrderStatus, Admin_WorkshopTask, Admin_KarigerTask, WorkshopAssignTask }