const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const CompanyModel = require("../models/company");

const {SUCCESS, INTERNAL_SERVER_ERROR, BAD_REQUEST, DATA_NOT_FOUND} = require("../util/errors");
const error_message = require("../util/error_message");

exports.scrape_company_data = async function (req, res) {
	const company_url = req.query.url;

	const company_data = await CompanyModel.findOne({website_url: company_url});
	if (company_data) {
		res.status(SUCCESS).json({company_data});
	}

	// fetch data, analyze and save it
	else {
		res.status(DATA_NOT_FOUND).json(error_message.DATA_NOT_FOUND);
	}
};
