const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    let check = await Product.findOne({ title: title });
    // console.log(check)
    if (check) {
      return res.status(400).json({ err: "Title Already Exists" });
    }
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Product Failed");
  }
};
