const Todo = require("../models/todos");
const User = require("../models/users");
const ObjectId = require("mongoose").Types.ObjectId;

class TodoController {
	constructor() {}

	static create(req, res) {
		User.findById(ObjectId(req.params.userId))
			.exec()
			.then(userFound => {
				if (userFound) {
					Todo.create({
						title: req.body.title,
						deadline: req.body.deadline,
						priority: req.body.priority,
						notes: req.body.notes
					})
						.then(todoCreated => {
							userFound.userTodos.push(todoCreated._id);
							res.status(200).json({
								message: "todo successfully created",
								data: todoCreated
							});
						})
						.catch(err => {
							res.status(400).json({
								message: err.message,
								data: err
							});
						});
				} else {
					res.status(404).json({
						message: "No User Found"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static getAllTaskByUserId(req, res) {
		User.findById(ObjectId(req.params.userId))
			.populate("userTodos")
			.then(userFound => {
				if (userFound) {
					res.status(200).json({
						message: "User Found",
						data: userFound
					});
				} else {
					res.status(404).json({
						message: "User not found"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static getOneById(req, res) {
		Todo.findById(ObjectId(req.params.todoId))
			.then(todo => {
				if (todo) {
					res.status(200).json({
						message: "Todo found",
						data: todo
					});
				} else {
					res.status(404).json({
						message: "id not found"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static deleteById() {}

	static update() {}
}

module.exports = TodoController;
