const express = require("express");
const router = express.Router();
const userRoute = require("./users");
const authRoute = require("./auths");

router.use("/api/me", userRoute);
router.use("/api/auths", authRoute);

/* GET home page. */
router.get("/api", function(req, res) {
	res.send("This Api Works!");
});

router.get("/", function(req, res) {
	res.send("This Api Works!");
});

module.exports = router;
