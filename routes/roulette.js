const express = require("express");
const router = express.Router();
const ItemModel = require("./../models/Item");
const UserModel = require("./../models/User");

/* GET home page */
router.get("/", async (req, res, next) => {
  res.render("roulette", {
    script: "rouletteScript",
  });
});

router.get("/api", async function (req, res) {
  const currentUser = await UserModel.findOne(req.session.currentUser._id);
  const rouletteItem = await ItemModel.findOne({
    $and: [
      { user: { $in: currentUser.friends } },
      { likes: { $nin: currentUser._id } },
      { dislikes: { $nin: currentUser._id } },
    ],
  });
  const rouletteItemUser = await UserModel.findById(rouletteItem.user);
  console.log(rouletteItem);
  console.log(rouletteItemUser);
  // console.log(currentUser);
  try {
    res.status(200).json({ item: rouletteItem, user: rouletteItemUser });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/like/:itemId", async (req, res, next) => {
  try {
    const itemToUpdate = await ItemModel.findById(req.params.itemId);
    itemToUpdate.likes.push({ _id: req.session.currentUser._id });
    itemToUpdate.save();
    res.redirect("/roulette");
  } catch (err) {
    next(err);
  }
});

router.get("/dislike/:itemId", async (req, res, next) => {
  try {
    const itemToUpdate = await ItemModel.findById(req.params.itemId);
    itemToUpdate.dislikes.push({ _id: req.session.currentUser._id });
    itemToUpdate.save();
    res.redirect("/roulette");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// new approach from frank
// findOne where edouard is not in the reaction array
// render page with this item
// add event listener to like/dislike buttons: saves user/reaction to reaction (items db)
// when get a response back, make another call to get another item and display it

// ** rewrite function and roulette.hbs with right classes to only need to refill in the item details
