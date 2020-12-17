const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const protectRoute = require("./../middlewares/protectRoute")

router.use(protectRoute);


//ROUTERS ALL TO BE REPLACED WITH AJAX/AXIOS, JUST CODED THEM IN ORDER TO BE ABLE TO DO VIEWS/CSS
// router.get("/", async (req, res) => {
//   const users = await UserModel.find({
//     _id: { $ne: [req.session.currentUser._id] },
//   });
//   res.render("friendsAll", { users, script: "friendsScript" });
// });

router.get("/", async (req, res) => {
  res.render("friendsAll", {
    script: "friendsScript",
  });
});

// router.get("/api", async function (req, res) {
//   try {
//     res
//       .status(200)
//       .json(
//         await UserModel.find({
//           _id: { $ne: [req.session.currentUser._id] }
//         })
//       );
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

router.get("/friends/api", async function (req, res) {



  const exp = new RegExp(req.query.search);
  try {
    res
      .status(200)
      .json(await UserModel.find({ _id: req.session.currentUser.friends, username: { $regex: exp } }));
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/api/delete", async function (req, res) {
  console.log(req.body);
  try {
    res.json(
      await UserModel.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        { $pull: { friends: req.body.id } }
      )
    );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/nonfriends/api", async function (req, res) {
  const exp = new RegExp(req.query.search);
  const currentUser = await UserModel.findById({ _id: req.session.currentUser._id });
  currentUser.friends.push(req.session.currentUser._id);
  console.log(currentUser.friends);
  try {
    res.status(200).json(
      await UserModel.find({
        _id: { $nin: currentUser.friends },
        username: { $regex: exp }
      })
    );
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message);
  }
});

router.get("/search/api", async (req, res, next) => {
  // req.body (posted infos)
  // req.params (variable/dynamique part of a route path)
  // req.query (access infos from for with get method)
  try {
    console.log(req.query); // query strings
    const exp = new RegExp(req.query.search); // creating a regular expression
    const matchedUsers = await UserModel.find({ username: { $regex: exp } });

    res.json(
      matchedUsers
    )
  } catch (err) {
    next(err);
  }
});

router.post("/api/add", async function (req, res) {
  console.log(req.body);
  try {
    res.json(
      await UserModel.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        { $push: { friends: req.body.id } }
      )
    );
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// router.patch("/nonfriends/api/add", async function (req, res) {
//   try {
//     res
//       .json(
//         await UserModel.findByIdAndUpdate(req.session.currentUser._id, { $push: { friends: req.body } }, { new: true })
//       )
//   }
// })



// router.get("/add/:id", async (req, res, next) => {
//   const friend = await UserModel.findById(req.params.id);
//   const currentUser = await UserModel.findById(req.session.currentUser._id);
//   currentUser.friends.push(friend);
//   currentUser.save();
//   console.log(currentUser);
//   res.redirect("/friends")
// });

module.exports = router;
