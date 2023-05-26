const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: "tasks" }],
});
UserSchema.plugin(validator);
module.exports = mongoose.model("users", UserSchema);
