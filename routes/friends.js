const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");

//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
router.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.render("friendsAll", { users });
});

router.get("/search", async (req, res, next) => {
  // req.body (posted infos)
  // req.params (variable/dynamique part of a route path)
  // req.query (access infos from for with get method)
  try {
    console.log(req.query); // query strings
    const exp = new RegExp(req.query.search); // creating a regular expression
    const matchedUsers = await UserModel.find({ username: { $regex: exp } });

    res.render("friendsAll", { users: matchedUsers });
  } catch (err) {
    next(err);
  }

});




module.exports = router;

