require("dotenv").config();
require("./../config/mongo");
const CategoryModel = require("./../models/Category");

const categories = [
  { name: "Clothing" },
  { name: "Furniture" },
  { name: "Decoration" },
  { name: "Books" },
  { name: "Electronics" },
];

async function insertTestCategories() {
  try {
    await CategoryModel.deleteMany();
    const inserted = await CategoryModel.insertMany(categories);
    console.log(
      `seed categories done : ${inserted.length} documents inserted !`
    );
  } catch (err) {
    console.error(err);
  }
}

insertTestCategories();
