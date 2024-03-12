const Workshop = require('../models/workshop');
const Kariger = require('../models/kariger');
const AddOrder = require('../models/addOrder');


// delete task which are completed and older than 15 days of completedDate 
// const deleteCompletedTasksOlderThan15Days = async (uid) => {
//   // Calculate the date 15 days ago
//   const today = new Date();
//   // fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
//   // let fifteenDaysAgo = new Date(new Date().setDate(today.getDate() - 15));
//   //  today.setMinutes(today.getMinutes() + 3);
//   // Find and delete tasks that are completed and older than 15 days
//   await Kariger.findOneAndUpdate(
//     { uid: uid },
//     {
//       $pull: {
//         task: {
//           $in: await AddOrder.find({
//             _id: { $in: (await Task.find({ completedDate: { $lt: today } })).map(task => task._id) },
//             status: "completed"
//           }).distinct('_id')
//         }
//       }
//     }
//   );
// };
//  // Get All Task for a particular kariger
const KarigerTask = async (req, res) => {
  // console.log(req.body);

  let isMatch = await Kariger.find({ uid: req.body.uid }).populate('task').exec();
  // console.log("isMatch", isMatch);
  if (isMatch) {
    // const DeleteCompleteTask = await deleteCompletedTasksOlderThan15Days(req.body.uid);
    // console.log(DeleteCompleteTask);
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}
// $pull: {
//   task: {
//     $in: await Order.find({
//       _id: { $in: (await Task.find({ completedDate: { $lt: fifteenDaysAgo } })).map(task => task._id) },
//       status: "completed"
//     }).distinct('_id')
//   }
// }
// const deleteCompletedTasksFromWrkshp = async (uid) => {
//   // Calculate the date 15 days ago
//   const fifteenDaysAgo = new Date();
//   fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

//   // Find and delete tasks that are completed and older than 15 days
//   await Workshop.updateOne(
//      { uid: uid },
//      {
//        $pull: {
//          task: {
//           completedAt: { $lt: fifteenDaysAgo }
//          }
//        }
//      }

//   );
//  };
const WorkshopTask = async (req, res) => {
  // console.log(req.body);
  // await deleteCompletedTasksFromWrkshp(req.body.uid);

  let isMatch = await Workshop.find({ uid: req.body.uid }).populate('task').exec();
  // console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

const Admin_WorkshopTask = async (req, res) => {
  // console.log(req.body);
  let isMatch = await Workshop.find({ _id: req.params.id }).populate('task').exec();
  // console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}

const Admin_KarigerTask = async (req, res) => {
  // console.log(req.params);
  let isMatch = await Kariger.find({ _id: req.params.id }).populate('task').exec();
  // console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true })
  }
  else {
    res.json({ message: error, success: false })
  }
}
const WorkshopAssignTask = async (req, res) => {
  // console.log(req.body.order);
  // console.log(req.body.kariger);

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
  } else {
    res.json({ message: "Task Already Assigned", success: false })
  }
  // console.log("kariger", kariger);
  if (kariger) {
    res.json({ data: kariger, success: true })
  }
}
const OrderStatus = async (req, res) => {
  // console.log("req", req.req);
  // console.log("params", req.params.id);
if(req.body.statusIs == "completed"){
 var completed = Date.now();
}
  let isMatch = await AddOrder.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      statusIs: req.body.statusIs,
      completedDate: completed

    }
  },
    { new: true }
  );
  // console.log("isMatch", isMatch);
  if (isMatch) {
    res.json({ data: isMatch, success: true });
  }
  else {
    res.json({ message: error, success: false })
  }

}


module.exports = { KarigerTask, WorkshopTask, OrderStatus, Admin_WorkshopTask, Admin_KarigerTask, WorkshopAssignTask }