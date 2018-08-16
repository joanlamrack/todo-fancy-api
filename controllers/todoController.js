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
			.exec()
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

	//pasang middleware buat check apakah object id ini ada di dalam referensi user
	static deleteById(req, res) {
		Todo.deleteById(ObjectId(req.params.userId))
			.exec()
			.then(deleteResponse => {
				res.status(200).json({
					message: "User successully deleted",
					data: deleteResponse
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static updatebyId(req, res) {
		Todo.findByIdAndUpdate(
			{ _id: ObjectId(req.params.todoId) },
			{ changes: req.body.changes }
		)
			.exec()
			.then(response => {
				res.status(200).json({
					message: "To do Successfully created",
					data:response
				});
			})
			.catch(err=>{
				res.status(400).json({
					message:err.message,
					data:err
				})
			});
	}
}

module.exports = TodoController;
