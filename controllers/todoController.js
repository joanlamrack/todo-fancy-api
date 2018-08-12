const Todo = require("../models/todos");

class TodoController{
	constructor(){

	}

	static create(req,res){
		Todo.create({
			
		})
		.then()
		.catch()
	}

	static getOneById(){

	}

	static deleteById(){

	}

	static update(){

	}
}

module.exports=TodoController;