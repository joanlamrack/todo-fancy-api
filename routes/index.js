const express = require("express");
const router = express.Router();
const userRoute = require("./users");
const authRoute = require("./auths");

router.use("/api/me", userRoute);
router.use("/api/auth", authRoute);

/* GET home page. */
router.get("/api", function(req, res) {
	res.send("This Api Works!");
});

module.exports = router;
