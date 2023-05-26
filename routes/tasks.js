const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
// user controllers
const TaskController = require("../controllers/task-controllers");
router.post("/", TaskController.addNewTask);
router.post("/allTasks", TaskController.getTasks);
router.delete("/:taskId", TaskController.deleteTasks);
router.patch("/:taskId", TaskController.editTasks);
router.put("/:taskId", TaskController.doneTask);
router.get("/:taskId", TaskController.getTaskById);
module.exports = router;
