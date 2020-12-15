require("dotenv").config();
require("./../config/mongo");

const UserModel = require("./../models/User");

const users = [
  {
    username: "echen",
    firstName: "Elisa",
    lastName: "Chen",
    email: "elisachen@gmail.com",
    password: "12345",
    image:
      "https://longcrendonfc.co.uk/wp-content/uploads/2018/10/facebook-profile-blank-face-300x225.jpeg",
    items: [],
    friends: [],
  },
  {
    username: "kpavlova",
    firstName: "Kate",
    lastName: "Pavlova",
    email: "kpavlova@gmail.com",
    password: "56789",
    image:
      "https://longcrendonfc.co.uk/wp-content/uploads/2018/10/facebook-profile-blank-face-300x225.jpeg",
    items: [],
    friends: [],
  },
  {
    username: "epfau",
    firstName: "Edouard",
    lastName: "Pfauwadel",
    email: "epfauwadel@gmail.com",
    password: "812892",
    image:
      "https://longcrendonfc.co.uk/wp-content/uploads/2018/10/facebook-profile-blank-face-300x225.jpeg",
    items: [],
    friends: [],
  },
];

//empty database
UserModel.deleteMany()
  .then(async () => {
    //insert robots in db
    await UserModel.insertMany(users);
    console.log("ok: 3 users has been inserted");
  })
  .catch((err) => {
    console.log(err);
  });
