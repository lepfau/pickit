const express = require("express");
const router = express.Router();
const ItemModel = require("./../models/Item");

/* GET home page */
router.get("/", async (req, res, next) => {
  res.render("roulette", {
    script: "rouletteScript",
  });
});

router.get("/api", async function (req, res) {
  try {
    res.status(200).json(await ItemModel.findOne());
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

// new approach from frank
// findOne where edouard is not in the reaction array
// render page with this item
// add event listener to like/dislike buttons: saves user/reaction to reaction (items db)
// when get a response back, make another call to get another item and display it

// ** rewrite function and roulette.hbs with right classes to only need to refill in the item details
