const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const {SUCCESS, INTERNAL_SERVER_ERROR, BAD_REQUEST, DATA_NOT_FOUND} = require("../util/errors");
const error_message = require("../util/error_message");

exports.scrape_company_data = async function (req, res) {
	const company_url = req.query.url;

	res.status(SUCCESS).json({msg: "success"});
};
