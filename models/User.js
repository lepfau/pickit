const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  image: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png",
  },
  items: {
    type: [{ type: Schema.Types.ObjectId, ref: "item" }], // NEEDS TO BE CHECKED
  },
  friends: {
    type: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
