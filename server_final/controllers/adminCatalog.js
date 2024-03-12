const Catalog = require('../models/catalog');
const CatalogMenu = require('../models/catalogMenu');
// Add Item Into Catalog

const CreateCatalog = async (req, res) => {
    try {
        // console.log("reqfile", req.file);
        const data = req.body;
        // console.log("data", data);
        let imagefiles = Array.isArray(req.files.catalog) ? req.files.catalog : [req.files.catalog];
        // console.log("imagefiles", imagefiles);
        let images = [];
        // Validate file types 
        if (Array.isArray(imagefiles)) {
            const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const files = imagefiles
                .filter(file => file !== undefined && imageTypes.includes(file.mimetype))
                .map(file => `${file.location}`);
            console.log("files", files);
            images.push(...files);
        }

        // console.log("images", images);
        // Check if images array is not empty before saving
        if (images.length > 0) {
            const result = new Catalog({
                category: data.category,
                designCode: data.designCode,
                description: data.description,
                quantity: data.quantity,
                size: data.size,
                weight: data.weight,
                tunch: data.tunch,
                image: images
            });
            // console.log("result", result);
            const catalog = await result.save();
            // Handle the response after saving, e.g., send a success message
            res.status(200).json({ message: 'Catalog created successfully', data: catalog });
        } else {
            // Handle the case when no images are uploaded, e.g., send an error message
            res.status(400).json({ message: 'No images were uploaded' });
        }
    } catch (err) {
        console.error(err);
        res.json({ message: "error", success: false });
    }

}
// Add Multiple Catalog
const AddMultiple = async (req, res) => {
    const uid = req.body.uid;
    // const data = Array.isArray(req.body) ? req.body : [req.body];
    // console.log("data", data);
    let images = [];
    // Validate file types 
    let imagefiles = Array.isArray(req.files.catalog) ? req.files.catalog : [req.files.catalog]
    if (Array.isArray(imagefiles)) {
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const files = imagefiles
            .filter(file => file !== undefined && imageTypes.includes(file.mimetype))
            .map(file => `${file.location}`);
        // console.log("files", files);
        images.push(...files);
    }

    console.log("images", images);
    if (images.length > 0) {
        let items = images.map(item => {
            if (item && Object.keys(item).length > 0) {
                console.log("item", item);
                return {
                    category: req.body.category,
                    designCode: req.body.designCode,
                    description: req.body.description,
                    quantity: req.body.quantity,
                    size: req.body.size,
                    weight: req.body.weight,
                    tunch: req.body.tunch,
                    image: item,
                }
            };
        });
        // console.log("dataItem", items);
        const result = await Catalog.insertMany(items);
        console.log("Multiple Catalog Added!", result);
        if (result) {
            res.status(200).json({ data: result, message: "Orders Placed...", success: true });
        }
    }

}
//Get All Items From Catalog
const GetAllCatalog = async (req, res) => {
    const getItem = await Catalog.find({});
    // console.log("all catalog", getItem);
    if (getItem) {
        res.json({ data: getItem, success: true })
    } else {
        res.json({ message: "Not Found", success: true })

    }
}
const AddCatCategory = async (req, res) => {
    const data = req.body
    // console.log("files",  req);
    // console.log("files1", req.files);
    // console.log("files2", req.files.catalog);

    try {
const getItem = await Catalog.find({category: req.body.category})
if(getItem){
    res.json({message: "this category is aldreay in catalogue menu"})
} else{
        const result = new CatalogMenu({
            category: data.category,
            image: req.file.location
        });
        const isMatch = await result.save();
        // console.log("addimgcat", isMatch);
        if (isMatch) {
            res.json({ data: isMatch, success: true });
        } else {
            res.json({ message: "Not Found", success: true });
        }
    }
    } catch (error) {
        console.log("error", error);
    }
    
};
const GetCatCategory = async (req, res) => {
    try {
        const isMatch = await CatalogMenu.find({})
        // console.log("getimgcat", isMatch);
        if (isMatch) {
            res.json({ data: isMatch, success: true });
        } else {
            res.json({ message: "Not Found", success: true });
        }
    } catch (error) {
        console.log("error", error);
    }
    // try {
    //  const items = await Catalog.find({}).select("category");
    //  let categories = [];
    //  items.forEach(item => {
    //    categories.push(item.category);
    //  });
    //  // Use a Set to eliminate duplicates
    //  let uniqueCategories = [...new Set(categories)];
    //  console.log("categories", uniqueCategories);
    //  if (uniqueCategories.length > 0) {
    //    // Assuming 'res' is defined somewhere above in your code
    //    res.json({ data: uniqueCategories, success: true });
    //  } else {
    //    res.json({ message: "Not Found", success: true });
    //  }
    // } catch (error) {
    //  console.log("error", error);
    // }
};

const UpdateCatCategory = async (req, res) => {
    try {
        const isMatch = await CatalogMenu.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                category: req.body.category,
                image: req.file.location
            }
        });
        // console.log("isMatch", isMatch);
        res.json({ data: isMatch, success: true })
    } catch (error) {
        console.log(error);
    }
}
const GetCatalog = async (req, res) => {
    // console.log("req.params", req.params);
    const isMatch = await Catalog.find({ _id: req.params.id });
    // console.log("data", isMatch);
    if (isMatch) {
        res.json({ data: isMatch, success: true })
    } else {
        res.json({ message: "Not Found", success: false })
    }
}
//Update Items of Catalog
const UpdateCatalog = async (req, res) => {
    // console.log("req.body", req.body);
    // console.log("req.params", req.params);

    try {
        let isMatch = await Catalog.findByIdAndUpdate(req.params.id, {
            $set: {
                image: req.body.image,
                category: req.body.category,
                designCode: req.body.designCode,
                description: req.body.description,
                quantity: req.body.quantity,
                size: req.body.size,
                weight: req.body.weight,
                tunch: req.body.tunch,
            }
        }, { new: true });
        // console.log("CatalogUpdate", isMatch);
        if (isMatch) {
            res.json({ data: isMatch, success: true })
        }
    } catch (error) {
        console.log(error);
    }
}

const DeleteCatalog = async (req, res) => {
    // console.log("delete", req.params.delId);
    try {
        const isMatch = await Catalog.findByIdAndDelete(req.params.delId);
        // console.log("allorders", order);
        if (isMatch) {
            res.json({ data: isMatch, message: "Order Deleted", success: true })
        } else {
            res.json({ message: 'error', success: false })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the order', success: false });
    }
}



module.exports = { CreateCatalog, AddMultiple, GetAllCatalog, GetCatalog, UpdateCatalog, AddCatCategory, GetCatCategory, UpdateCatCategory, DeleteCatalog };