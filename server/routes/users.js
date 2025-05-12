var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");


router.get("/", (req, res) => {
	res.json({res : 'hello'})
});

module.exports = router;
