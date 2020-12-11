const express = require("express");
const router = express.Router();
const ItemModel = require("./../models/item");

//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
router.get("/", async (req, res) => {
  res.render("itemsAll");
});

// will need to be changed for :id and AJAX
router.get("/itemdetail", async (req, res) => {
  res.render("itemOneDetail");
});

router.get("/itemcreate", async (req, res) => {
  res.render("itemCreate");
});

// will need to be changed for :id and AJAX
router.get("/itemupdate", async (req, res) => {
  res.render("itemUpdate");
});

module.exports = router;
