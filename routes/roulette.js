const express = require("express");
const router = express.Router();
const ItemModel = require("./../models/Item");

/* GET home page */
router.get("/", async (req, res, next) => {
  res.render("roulette", {
    script: "rouletteScript",
  });
});

module.exports = router;

// To-Do's
// Retrieve all the items in the database and copy them to a new array of items that we can manipulate
//  ---> itemsApi.getAllItems() already in script.js
// Pick one item from the array (in order for now is ok, randomize later)
//  ---> use a forEach function
// Render the roulette page with this item
// set event listeners for thumbs down/heart: on click:
// 1) save the user/response to the item database
// 2) pick a new item
// 3) empty page
// 4) render the page with the next item
// when there are no more items, display a message saying: no more items to judge
