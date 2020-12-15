const express = require("express");
const { findOne } = require("./../models/Item");
const router = express.Router();
const ItemModel = require("./../models/Item");
const CategoryModel = require("./../models/Category");
const uploader = require("./../config/cloudinary");

//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
router.get("/", async (req, res) => {
  res.render("itemsAll", {
    script: "script",
  });
});

router.get("/api", async function (req, res) {
  try {
    res.status(200).json(await ItemModel.find());
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
router.get("/detail", async (req, res) => {
  res.render("itemOneDetail");
});

router.get("/create", async (req, res) => {
  const categories = await CategoryModel.find();
  res.render("itemCreate", { categories });
});

router.get("/update/:id", async (req, res) => {
  try {
    res.render("itemUpdate", await ItemModel.findById(req.params.id));
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", uploader.single("image"), async (req, res) => {
  const newItem = { ...req.body };
  if (!req.file) newItem.image = undefined;
  else newItem.image = req.file.path;

  try {
    await ItemModel.create(newItem);
    res.redirect("/items");
  } catch (err) {
    console.log(err);
  }
});

// will need to be changed for :id and AJAX

router.post("/update/:id", uploader.single("image"), async (req, res) => {
  try {
    const itemToUpdate = { ...req.body };
    if (req.file) itemToUpdate.image = req.file.path;

    await ItemModel.findByIdAndUpdate(req.params.id, itemToUpdate);
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
