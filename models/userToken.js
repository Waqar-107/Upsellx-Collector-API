const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         userId:
 *           $ref: '#/components/schemas/user'
 *         token:
 *           type: string
 *       required:
 *         - userId
 *         - token
 */
const UserTokenSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},

		token: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

module.exports = mongoose.model("userToken", UserTokenSchema);
