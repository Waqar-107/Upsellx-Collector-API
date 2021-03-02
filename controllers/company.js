const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const CompanyModel = require("../models/company");

const {SUCCESS, INTERNAL_SERVER_ERROR, BAD_REQUEST} = require("../util/errors");
const error_message = require("../util/error_message");

const {getSocialLinks, getWebPage, getSelfInfo} = require("../util/parser");

/**
 * @swagger
 * /api/get_data:
 *   get:
 *     deprecated: false
 *     tags:
 *       - Company Information
 *     summary: Scrapes the data of the company from the url passed
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: url of the website of the company. this code has been tested using, https://chaldal.com/
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   ref: '#/components/schemas/company'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.scrapeCompanyData = async function (req, res) {
	const companyUrl = req.query.url;

	if (!companyUrl) {
		res.status(BAD_REQUEST).json({message: "company website url missing"});
		return;
	}

	const companyData = await CompanyModel.findOne({websiteUrl: companyUrl});
	if (companyData) {
		res.status(SUCCESS).json({company: companyData});
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

	// scrape and look for information in the compaanies site
	const companyInfo = await getSelfInfo(companyDOM.dom);
	newCompanyData.title = companyInfo.title;
	newCompanyData.about = companyInfo.about;
	newCompanyData.phone = companyInfo.phone;
	newCompanyData.email = companyInfo.email;

	// save own DOM
	newCompanyData.dataSrc = [
		{
			name: "myself",
			url: companyUrl,
			webResponse: companyDOM.webResponse,
		},
	];

	// parse the dom, look for social media links
	// when found, fetch them and save in the database
	// these can be scraped later
	const socialLinks = await getSocialLinks(companyDOM.dom);
	for (let key in socialLinks) {
		let socialDom = await getWebPage(socialLinks[key]);
		newCompanyData.dataSrc.push({
			name: key,
			url: socialLinks[key],
			webResponse: socialDom.webResponse,
		});
	}

	// save the data in the database
	newCompanyData.save((err, docs) => {
		if (err) {
			res.status(INTERNAL_SERVER_ERROR).json({message: "server crashed while saving data"});
		} else res.status(SUCCESS).json(docs);
	});
};
