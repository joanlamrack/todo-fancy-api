require("dotenv").config();
const cors = require('cors')
const express = require("express");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");


//Set db disini

let mongoDB = `mongodb://${process.env.MONGODBHOST}:${process.env.MONGOPORT}/usertodo`;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));



app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use("/", routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status).json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	});
});

app.listen(3000, () => {
	console.log("connected!");
});

module.exports = app;