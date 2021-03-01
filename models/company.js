const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         websiteUrl:
 *           type: string
 *           descriptions: url of the personal website of the company
 *         name:
 *           type: string
 *           descriptions: name of the company
 *         phone:
 *           type: array
 *           descriptions: phone numbers of the company
 *           items:
 *             type: string
 *         email:
 *           type: array
 *           descriptions: emails of the company
 *           items:
 *             type: string
 *         address:
 *           type: string
 *         about:
 *           type: string
 *         data_src:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of the source. for example, facebook, instagram, twitter etc
 *               url:
 *                 type: string
 *               webResponse:
 *                 type: string
 *                 description: the contents fetched from the url that can be scraped and data can be extracted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: current-date
 *       required:
 *         - websiteUrl
 */
const CompanySchema = new Schema(
	{
		websiteUrl: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: false,
		},

		phone: [
			{
				type: String,
				required: true,
			},
		],

		email: [
			{
				type: String,
				required: true,
			},
		],

		address: {
			type: String,
			required: false,
		},

		about: {
			type: String,
			required: false,
		},

		dataSrc: [
			{
				name: {
					type: String,
					required: true,
				},

				url: {
					type: String,
					required: true,
				},

				webResponse: {
					type: String,
					required: true,
				},
			},
		],
	},
	{timestamps: true}
);

module.exports = mongoose.model("company", CompanySchema);
