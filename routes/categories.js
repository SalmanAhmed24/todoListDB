const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const CategoryController = require("../controllers/cat-controllers");
router.post("/", CategoryController.addNewCategory);
router.get("/allCategories", CategoryController.getCategories);
module.exports = router;
