const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const CompanyModel = require("../models/company");

const {SUCCESS, INTERNAL_SERVER_ERROR, BAD_REQUEST, DATA_NOT_FOUND} = require("../util/errors");
const error_message = require("../util/error_message");

const got = require("got");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

exports.scrape_company_data = async function (req, res) {
	const company_url = req.query.url;

	const company_data = await CompanyModel.findOne({website_url: company_url});
	if (company_data) {
		res.status(SUCCESS).json({msg: "success", company_data});
	}

	// fetch data, analyze and save it
	else {
		got(company_url)
			.then((response) => {
				const dom = new JSDOM(response.body);
				console.log(dom.window.document.querySelector("title").textContent);
			})
			.catch((err) => {
				res.status(INTERNAL_SERVER_ERROR).json({message: "error fetching site :" + err});
			});

		res.status(DATA_NOT_FOUND).json({msg: "looking"});
	}
};
