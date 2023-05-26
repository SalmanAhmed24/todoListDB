const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, require: true },
  endTime: { type: String, require: true },
  category: {
    name: { type: String, required: true },
    colorCode: { type: String, required: true },
  },
  description: { type: String, required: true },
  status: { type: Boolean },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
});

module.exports = mongoose.model("tasks", taskSchema);
