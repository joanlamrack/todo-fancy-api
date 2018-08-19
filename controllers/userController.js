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
					message: "success",
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

	static fbLogin(req, res) {
		//console.log("entered FB login", req.body);
		let { accessToken, userID } = req.body;
		AuthHelper.getFacebookCredential(accessToken)
			.then(result => {
				result = JSON.parse(result);
				//console.log(result);
				User.findOne({ email: result.email })
					.then(userFound => {
						if (userFound) {
							res.status(200).json({
								message: "login success",
								token: AuthHelper.createToken({ id: userFound._id.valueOf() })
							});
						} else {
							return User.create({
								email: result.email,
								name: result.name,
								fb_id: userID,
								password: AuthHelper.createHashPass(result.email + "12345678")
							});
						}
					})
					.then(newUser => {
						res.status(200).json({
							message: "New User created",
							token: AuthHelper.createToken({ id: newUser._id.toString() })
						});
					})
					.catch(err => {
						res.status(400).json(err);
					});
			})
			.catch(err => {
				res.status(400).json(err);
			});
	}

	static verifyToken(req, res) {
		let id = AuthHelper.decodeToken(req.body.token).id;
		User.findById(ObjectId(id))
			.then(userFound => {
				if (userFound) {
					res.status(200).json({
						message: "OK"
					});
				} else {
					res.status(204).json({
						message: "NK"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}

	static login(req, res) {
		User.findOne({ email: req.body.email })
			.exec()
			.then(user => {
				if (
					user &&
					AuthHelper.compareSync(
						req.body.email + req.body.password,
						user.password
					)
				) {
					let token = AuthHelper.createToken({
						id: user._id.toString()
					});
					res.status(200).json({
						message: "Login Success",
						token: token
					});
				} else {
					res.status(404).json({
						message: "Wrong Email or Password"
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

	static updatebyId(req, res) {
		User.findOneAndUpdate({ _id: ObjectId(req.params.userId) }, req.body)
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
