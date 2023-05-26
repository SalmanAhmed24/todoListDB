const mongoose = require("mongoose");
const uniqueValid = require("mongoose-unique-validator");
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  colorCode: { type: String, required: true },
});
CategorySchema.plugin(uniqueValid);
module.exports = mongoose.model("categories", CategorySchema);
