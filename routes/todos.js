var express = require("express");
var router = express.Router();
const todoController = require("../controllers/todoController");

/* GET home page. */
//get All todos by users
router
	.route("/")
	.get(todoController.getAllTaskByUserId)
	.post(todoController.create);

router
	.route("/:todoId")
	.get(todoController.getOneById)
	.patch(todoController.updatebyId)
	.delete(todoController.deleteById);

module.exports = router;
