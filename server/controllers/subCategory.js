const SubCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    let check = await SubCategory.findOne({ slug: name });
    console.log(check);
    if (check) {
      return res.status(400).json({ err: "SubCategory Already Exists" });
    }
    res.json(
      await new SubCategory({ name, parent, slug: slugify(name) }).save()
    );
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

exports.list = async (req, res) => {
  let sub = await SubCategory.find();
  console.log(sub);
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
  res.json(sub);
};

exports.read = async (req, res) => {
  let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(subCategory);
};

exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    // console.log(res.json);
    res.json(updated);
  } catch (err) {
    res.status(400).send("SubCategory update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    console.log("deleted", deleted);
    res.json(deleted);
  } catch (err) {
    res.status(400).send("SubCategory Deleted failed");
  }
};
