const express = require("express");
const router = express.Router();
const ItemModel = require("./../models/Item");


//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
router.get("/", async (req, res) => {
  res.render("itemsAll");
});

router.get("/api", async function (req, res) {
  try {
    res.status(200).json(await ItemModel.find());
  } catch (err) {
    res.status(500).json(err.message);
  }
});




// will need to be changed for :id and AJAX
router.get("/detail", async (req, res) => {
  res.render("itemOneDetail");
});

router.get("/create", async (req, res) => {
  res.render("itemCreate");
});

// will need to be changed for :id and AJAX
router.get("/update", async (req, res) => {
  res.render("itemUpdate");
});

module.exports = router;
