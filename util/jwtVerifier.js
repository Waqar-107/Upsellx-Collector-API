const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const UserTokenModel = require("../models/userToken");

exports.verifyJwt = async function (data, cb) {
	let tokenString = data.token.split(" ")[1];

	let token = await UserTokenModel.find({token: tokenString}).exec();

	if (!token || (token && token.length == 0)) cb("jwt expired", {});
	else {
		jwt.verify(tokenString, process.env.SECRET, async (err, decode) => {
			if (!err) {
				let user = await UserModel.findOne({phone: decode.phone}).exec();
				cb(null, user);
			} else {
				cb("jwt verification error", {});
			}
		});
	}
};
