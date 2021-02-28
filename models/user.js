const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *           uniqueItems: true
 *         avatar:
 *           type: string
 *         verified:
 *           type: boolean
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - phone
 *         - password
 */
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
			unique: true,
		},

		avatar: {
			type: String,
			required: false,
		},

		verified: {
			type: Boolean,
			default: false,
		},

		password: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

//  triggers
UserSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model("user", UserSchema);
