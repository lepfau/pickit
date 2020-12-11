const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  brand: String,
  description: String,
  image: String,
  price: Number,
  link: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  reaction: [
    {
      userReacting: { type: Schema.Types.ObjectId, ref: "user" },
      reaction: {
        type: String,
        enum: ["like", "dislike"],
      },
    },
  ],
  category: { type: Schema.Types.ObjectId, ref: "category" },
});

const ItemModel = mongoose.model("item", itemSchema);

module.exports = ItemModel;
