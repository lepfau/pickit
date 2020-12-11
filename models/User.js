const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  image: String,
  items: {
    type: [{ type: Schema.Types.ObjectId, ref: "item" }], // NEEDS TO BE CHECKED
  },
  friends: {
    type: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
