var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const todoRoute = require("./todos");

router.use("/todos", todoRoute);

/* GET home page. */
router
	.route("/")
	.get(userController.getOneById) //user dashboard
	.delete(userController.deleteById) //delete user's own account
	.patch(userController.updatebyId); //update changes 

module.exports = router;
