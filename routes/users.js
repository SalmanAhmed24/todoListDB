const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const UserController = require("../controllers/user-controllers");
router.post("/", UserController.addNewUser);
router.post("/login", UserController.loginUser);
module.exports = router;
