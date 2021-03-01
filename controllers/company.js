const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const CompanyModel = require("../models/company");

const {SUCCESS, INTERNAL_SERVER_ERROR, BAD_REQUEST, DATA_NOT_FOUND} = require("../util/errors");
const error_message = require("../util/error_message");

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {getSocialLinks, getWebPage} = require("../util/parser");

exports.scrape_company_data = async function (req, res) {
	const companyUrl = req.query.url;

	const companyData = await CompanyModel.findOne({websiteUrl: companyUrl});
	if (companyData) {
		res.status(SUCCESS).json({msg: "success", company_data});
		return;
	}

	let newCompanyData = new CompanyModel();
	newCompanyData.websiteUrl = companyUrl;

	// fetch data, analyze and save it
	const company_dom = await getWebPage(companyUrl);
	if (!company_dom) {
		res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
		return;
	}

	const socialLinks = await getSocialLinks();
	socialLinks.foreach((val) => {
		console.log(val);
	});

	res.status(DATA_NOT_FOUND).json({msg: "looking"});
};
