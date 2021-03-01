const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const CompanyModel = require("../models/company");

const {SUCCESS, INTERNAL_SERVER_ERROR} = require("../util/errors");
const error_message = require("../util/error_message");

const {getSocialLinks, getWebPage} = require("../util/parser");

exports.scrapeCompanyData = async function (req, res) {
	const companyUrl = req.query.url;

	const companyData = await CompanyModel.findOne({websiteUrl: companyUrl});
	if (companyData) {
		res.status(SUCCESS).json({msg: "success", companyData});
		return;
	}

	let newCompanyData = new CompanyModel();
	newCompanyData.websiteUrl = companyUrl;

	// fetch data, analyze and save it
	const companyDOM = await getWebPage(companyUrl);
	if (!companyDOM) {
		res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
		return;
	}

	// save own DOM
	newCompanyData.dataSrc.push({
		name: "myself",
		url: companyUrl,
		webResponse: companyDOM.webResponse,
	});

	const socialLinks = await getSocialLinks(companyDOM.dom);
	for (let key in socialLinks) {
		let socialDom = await getWebPage(socialLinks[key]);
		newCompanyData.dataSrc.push({
			name: key,
			url: socialLinks[key],
			webResponse: socialDom.webResponse,
		});
	}

	newCompanyData.save((err, docs) => {
		if (err) {
			res.status(INTERNAL_SERVER_ERROR).json({message: "server crashed while saving data"});
		} else res.status(SUCCESS).json(docs);
	});
};
