const express = require("express");
const router = express.Router();
const userRoute = require("./users");

router.use("/api/me", userRoute);

/* GET home page. */
router.get("/api", function(req, res) {
	res.send("This Api Works!");
});

module.exports = router;
