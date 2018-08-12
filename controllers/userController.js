const User = require("../models/users");
const AuthHelper = require("../helpers/authhelper");
const ObjectId = require("mongoose").Types.ObjectId;

class UserController {
	constructor() {}

	static create(req, res) {
		let password = AuthHelper.createHashPass(
			req.body.email + req.body.password
		);
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: password
		})
			.then(result =>
				res.status(200).json({
					message: "sucess",
					data: result
				})
			)
			.catch(err =>
				res.status(400).json({
					message: err.message,
					data: err
				})
			);
	}

	static FBlogin(req,res){
		
	}

	static login(req, res) {
		let password = AuthHelper.createHashPass(
			req.body.email + req.body.password
		);
		User.findOne({ email: req.body.email, password: password })
			.exec()
			.then(user => {
				if (user) {
					let token = AuthHelper.createToken({
						id: user._id.toString()
					});
					res.status(200).json({
						message:"Login Success",
						token:token
					});
				} else {
					res.status(404).json({
						message:"Login not success"
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
		User.getOneById(req.params.userId)
			.exec()
			.then(result => {
				res.status(200).json({
					message: "success",
					data: result
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static deleteById(req, res) {
		User.deleteById(req.params.userId)
			.exec()
			.then(result => {
				res.status(200).json({
					message: "success",
					data: result
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static updatebyUpdate(req, res) {
		User.findOneAndUpdate({ _id: ObjectId(req.params.userId) })
			.exec()
			.then(result => {
				res.status(200).json({
					message: "update success",
					data: result
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}
}

module.exports = UserController;
