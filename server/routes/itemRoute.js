const router = require("express").Router();
const { CLOUD_NAME, CLOUD_API_KEY, CLOULD_API_SECRET } = require("../config");
const itemModel = require("../models/itemModel");
const { userAuth } = require("../utils/Auth");
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOULD_API_SECRET,
});

router.get("/getitems", async (req, res) => {
  try {
    let items = await itemModel.find({});
    res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
});

router.post("/additems", userAuth, async (req, res) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log(result)
    const { name, age } = req.body;
    const newItem = new itemModel({
      name,
      age,
      imagePath: result.url,
    });
    try {
      newItem.save();
      res.send(`Item added successfully : ${newItem}`);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });
});

module.exports = router;

// const fileUpload = require('express-fileupload');
// app.use(fileUpload({
//   useTempFiles: true
// }));

// router.post("/additems", userAuth, async (req, res) => {
//   const files = req.files;

//   if (!Array.isArray(files.photo)) {
//     files.photo = [files.photo];
//   }

//   const imageUrls = [];
//   for (const file of files.photo) {
//     await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
//       if (err) {
//         return res.status(400).json({ message: "Failed to upload image." });
//       }
//       imageUrls.push(result.url);
//     });
//   }

//   const { name, age } = req.body;
//   const newItem = new itemModel({
//     name,
//     age,
//     imagePaths: imageUrls,
//   });

//   try {
//     await newItem.save();
//     res.send(`Item added successfully : ${newItem}`);
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// });
