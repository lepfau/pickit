const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
});

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
