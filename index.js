const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// route imports
const userRoutes = require("./routes/users");
const catRoutes = require("./routes/categories");
const taskRoutes = require("./routes/tasks");
const url =
  "mongodb+srv://book-a-tutorDB:reactive_007@cluster0.2art5.mongodb.net/todo-list";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log("error occured while connecting to database", err);
  });
app.use("/api/users", userRoutes);
app.use("/api/categories", catRoutes);
app.use("/api/tasks", taskRoutes);
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
