const express = require("express");
const { findOne } = require("./../models/Item");
const router = express.Router();
const ItemModel = require("./../models/Item");
const CategoryModel = require("./../models/Category");
const uploader = require("./../config/cloudinary");

const protectRoute = require("./../middlewares/protectRoute")

router.use(protectRoute);


//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
router.get("/", async (req, res) => {
  res.render("itemsAll", {
    script: "script",
  });
});

router.get("/api", async function (req, res) {
  try {
    res
      .status(200)
      .json(
        await ItemModel.find({ user: { $in: [req.session.currentUser._id] } })
      );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/api/delete/:id", async (req, res) => {
  try {
    res.status(200).json(await ItemModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// will need to be changed for :id and AJAX

router.get("/create", async (req, res) => {
  const categories = await CategoryModel.find();
  res.render("itemCreate", { categories });
});

router.get("/:id", async (req, res) => {
  const item = await ItemModel.findById(req.params.id);
  res.render("itemOneDetail", item);
});

router.get("/update/:id", async (req, res) => {
  const item = await ItemModel.findById(req.params.id)
  // const itempop = await ItemModel.findById(req.params.id).populate("category")
  // console.log(item, itempop)
  const itemCategory = await CategoryModel.findById(item.category);
  const categories = await CategoryModel.find();
  try {
    res.render("itemUpdate", {
      item: item,
      itemcat: itemCategory,
      category: categories,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/items", async (req, res, next) => {
  // req.body (posted infos)
  // req.params (variable/dynamique part of a route path)
  // req.query (access infos from for with get method)
  try {
    console.log(req.query); // query strings
    const exp = new RegExp(req.query.search); // creating a regular expression
    const matchedItems = await ItemModel.find({ name: { $regex: exp } });

    res.render("itemsAll", { items: matchedItems });
  } catch (err) {
    next(err);
  }
});

router.post("/create", uploader.single("image"), async (req, res) => {
  const newItem = { ...req.body };
  if (!req.file) newItem.image = undefined;
  else newItem.image = req.file.path;
  newItem.user = req.session.currentUser._id;

  try {
    await ItemModel.create(newItem);
    res.redirect("/items");
  } catch (err) {
    console.log(err);
  }
});

// will need to be changed for :id and AJAX

router.post("/update/:id", uploader.single("image"), async (req, res, next) => {
  try {
    const itemToUpdate = { ...req.body };
    console.log(itemToUpdate)
    if (req.file) itemToUpdate.image = req.file.path;
    const categoryId = await CategoryModel.findOne({
      name: itemToUpdate.category,
    });
    console.log(categoryId._id);
    itemToUpdate.category = { _id: categoryId._id };

    await ItemModel.findByIdAndUpdate(req.params.id, itemToUpdate);
    res.redirect("/items");

  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
