const Customer = require("../models/customer");
const Workshop = require("../models/workshop");
const Kariger = require("../models/kariger");
const Distributor = require("../models/distributor");

const CustomerList = async (req, res) => {
    const isMatch = await Customer.find({});
    if (isMatch) {
        res.json({ data: isMatch, success: true });
    } else {
        res.json({ message: "Not Found", success: false })
    }
}
const CustomerDel = async (req, res) => {
    try {
        const isMatch = await Customer.findByIdAndDelete(req.params.delId);
        if (isMatch) {
            res.json({ data: isMatch, message: "Deleted", success: true })
        } else {
            res.json({ message: 'error', success: false })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting', success: false });
    }
}

/// Workshop ////
const WorkshopList = async (req, res) => {
    const isMatch = await Workshop.find({});
    if (isMatch) {
        res.json({ data: isMatch, success: true });
    } else {
        res.json({ message: "Not Found", success: false })
    }
}
// kariger list of a particular workshop
const KarigerInWrkList = async (req, res) => {
    // console.log("req", req)
    let isMatch = await Workshop.find({ _id: req.params.id }).populate('kariger').exec();
    // console.log("isMatch", isMatch);
    if (isMatch) {
      res.json({ data: isMatch, success: true })
    }
    else {
      res.json({ message: error, success: false })
    }
    
}
// const KarigerInWrkList = async (req, res) => {
//     const workshop = await Workshop.findOne({_id: req.params.id}).populate('kariger').exec();
//     if (workshop && workshop.kariger.length > 0) {
//         res.json({ data: workshop.kariger, success: true });
//     } else {
//         res.json({ message: "No Kariger found", success: false })
//     }
//     console.log("karigerlist", workshop ? workshop.kariger : null);
//  }
const WorkshopDel = async (req, res) => {
    try {
        const isMatch = await Workshop.findByIdAndDelete(req.params.delId);
        if (isMatch) {
            res.json({ data: isMatch, message: "Deleted", success: true })
        } else {
            res.json({ message: 'error', success: false })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting', success: false });
    }
}
const KarigerList = async (req, res) => {
    const isMatch = await Kariger.find({}).populate('workshop').exec();
    if (isMatch) {
        res.json({ data: isMatch, success: true });
    } else {
        res.json({ message: "Not Found", success: false })
    }
}

const KarigerDel = async (req, res) => {
    try {
        const isMatch = await Kariger.findByIdAndDelete(req.params.delId);
        if (isMatch) {
            res.json({ data: isMatch, message: "Deleted", success: true })
        } else {
            res.json({ message: 'error', success: false })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting', success: false });
    }
}

//// Distributor /////
const DistributorList = async (req, res) => {
    const isMatch = await Distributor.find({});
    // console.log("isMatch", isMatch);
    if (isMatch) {
        res.json({ data: isMatch, success: true });
    } else {
        res.json({ message: "Not Found", success: false })
    }
}

const DistributorDel = async (req, res) => {
    try {
        const isMatch = await Distributor.findByIdAndDelete(req.params.delId);
        if (isMatch) {
            res.json({ data: isMatch, message: "Deleted", success: true })
        } else {
            res.json({ message: 'error', success: false })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting', success: false });
    }
}

const Admin_ShopsofDistributor = async (req, res) => {
    // console.log("req.params", req.params)
    let isMatch = await Distributor.findOne({ uid: req.params.id }).exec();
    // console.log("isMatch", isMatch);
    if (isMatch && isMatch.agent) {
        const shops = await Customer.find({agent: isMatch.agent}).exec();
        if(shops){
            res.json({ data: shops, success: true })
        }
    }
    else {
      res.json({ message: 'No match found', success: false })
    }
 }

 const ShopsofDistributor = async (req, res) => {
    // console.log("req.body", req.body)
    let isMatch = await Distributor.findOne({ uid: req.body.uid }).exec();
    // console.log("isMatch", isMatch);
    if (isMatch && isMatch.agent) {
        const shops = await Customer.find({agent: isMatch.agent}).exec();
        if(shops){
            res.json({ data: shops, success: true })
        }
    }
    else {
      res.json({ message: 'No match found', success: false })
    }
 }
module.exports = { CustomerList, WorkshopList, KarigerList, DistributorList, CustomerDel, DistributorDel, KarigerDel, WorkshopDel, KarigerInWrkList,Admin_ShopsofDistributor, ShopsofDistributor}