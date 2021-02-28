const jwtVerifier = require("../util/jwtVerifier");
const {BAD_REQUEST} = require("../util/errors");

exports.userAuth = async function (req, res, next) {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		jwtVerifier.verifyJwt({token}, (err, user) => {
			if (err) res.status(BAD_REQUEST).json({message: err});
			else {
				req.user = user;
				next();
			}
		});
	} else res.status(BAD_REQUEST).json({message: "authorization header missing"});
};
