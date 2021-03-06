const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: String,
  description: String,
  image: {
    type: String,
    default: "https://www.eglsf.info/wp-content/uploads/image-missing.png",
  },
  price: Number,
  link: String,
  user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
  category: { type: Schema.Types.ObjectId, ref: "category" },
});

const ItemModel = mongoose.model("item", itemSchema);

module.exports = ItemModel;
