const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         website_url:
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
 *               parsed_data:
 *                 type: string
 *                 description: the contents fetched from the url that can be scraped and data can be extracted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: current-date
 *       required:
 *         - website_url
 *         - name
 *         - phone
 */
const CompanySchema = new Schema(
	{
		website_url: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: true,
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

		data_src: [
			{
				name: {
					type: String,
					required: true,
				},

				url: {
					type: String,
					required: true,
				},

				parsed_data: {
					type: String,
					required: true,
				},
			},
		],
	},
	{timestamps: true}
);

module.exports = mongoose.model("company", CompanySchema);
