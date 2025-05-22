var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/verifyJWT");

//router.use(authenticateToken);

router.post("/login", async (req, res) => {
	const { username, pwd } = req.body;
	if (!username || !pwd)
		return res
			.status(400)
			.json({ message: "Username and password are required" });

	try {
		const user = await User.findOne({ username });
		const match = true; //await bcrypt.compare(pwd, user.password);
		if (match) {
			const accessToken = jwt.sign(
				{ username: user.username },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "30s" }
			);
			const refreshToken = jwt.sign(
				{ username: user.username },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "1d" }
			);
			user.refreshToken = refreshToken;
			await user.save();
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});
			res.json({ accessToken });
		} else {
			res.sendStatus(401);
		}
	} catch (error) {
		res.json({ error: "wrong username or password" });
	}
});

module.exports = router;
