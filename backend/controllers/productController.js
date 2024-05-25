const admin = require("firebase-admin");
const uuid = require("uuid");
const serviceAccount = require("../config/sharequill-t13-firebase-adminsdk-2ecq3-9d5d7d91de.json");

const ProductsModel = require("../models/productsModel");

exports.productsHomePage = async (req, res) => {
  try {
    const existingProducts = await ProductsModel.find();
    if (existingProducts) {
      console.log("[FETCH] Displaying products for Home Page");
      res.status(200).json(existingProducts);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.postSpecs = async (req, res) => {
  try {
    const postData = req.body;
    console.log("USER ID", req.user._id);
    console.log("POST DATA", postData.type);
    const productInstance = new ProductsModel({ ...postData, user: req.user._id, type: postData.type});
    await productInstance.save();
    res.json({ message: "Form data received successfully!" });
  } catch (error) {
    console.error("[ERROR] ", error);
    res.status(400).json({ message: error.message });
  }
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://sharequill-t13.appspot.com/",
});

exports.postImages = async (req, res) => {
  // Access the uploaded file from req.file
  const images = req.files;
  const bucket = admin.storage().bucket();
  const directoryName = `${uuid.v4()}/`;

  try {
    const uploadPromises = images.map((image) => {
      const imageBuffer = image.buffer;
      const imageFileName = directoryName + image.originalname;

      const file = bucket.file(imageFileName);
      return file.save(imageBuffer, { contentType: image.mimetype });
    });

    await Promise.all(uploadPromises);

    const downloadUrlsPromises = images.map(async (image) => {
      const imageFileName = directoryName + image.originalname;
      const [url] = await bucket
        .file(imageFileName)
        .getSignedUrl({ action: "read", expires: "01-01-2030" });
      return url;
    });

    const downloadUrls = await Promise.all(downloadUrlsPromises);

    console.log("[FIREBASE] All images uploaded to Firebase Storage");

    res.json({ imageUrl: downloadUrls });
  } catch (error) {
    console.error("[ERROR] Error Uploading Images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filterType = async (req, res) => {
  const { category } = req.params;
  try {
    const productsInType = await ProductsModel.find({
      type: { $regex: new RegExp('^' + category.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i') },
    });
    console.log(`[FETCH] Displaying products for ${productsInType}`);
    res.json(productsInType);
  } catch (error) {
    console.error("[ERROR] ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
