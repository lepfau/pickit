const express = require("express");
const router = express.Router();
const UserModel = require("./../models/user");

//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
router.get("/", async (req, res) => {
  res.render("friendsAll");
});

module.exports = router;
