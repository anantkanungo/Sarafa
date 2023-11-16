const Catalog = require('../models/catalog');

// Add Item Into Catalog
const CreateCatalog = async (req, res) => {
    const { category, designCode, description, quantity, size, weight, tunch } = req.body;
    const result = await Catalog({ category, designCode, description, quantity, size, weight, tunch, image: req.file.filename });
    console.log("result", result);
    const data = await result.save();
    console.log("data", data);
    if (data) {
        res.json({ result: data, message: "Item Added Into Catalog...", success: true });
    }
    else {
        res.json({ message: "error", success: false });
    }
}

//Get Item From Catalog
const GetCatalog = async(req, res)=>{
    const getItem = await Catalog.find({});
    if(getItem){
        res.json({result: getItem, success: true})
    } else{
        res.json({message: "Not Found", success: true})

    }
}


module.exports = { CreateCatalog , GetCatalog};