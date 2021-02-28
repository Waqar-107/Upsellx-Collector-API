const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const UserModel = require("../models/user");
const UserTokenModel = require("../models/userToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {SUCCESS, INTERNAL_SERVER_ERROR, BAD_REQUEST, DATA_NOT_FOUND} = require("../util/errors");
const error_message = require("../util/error_message");

/**
 * @swagger
 * /user/registration:
 *   post:
 *     deprecated: false
 *     tags:
 *       - user
 *     summary: Registers an user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: success
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
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.registration = async function (req, res) {
	UserModel.findOne({phone: req.body.phone}, (err, docs) => {
		if (err) res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
		if (docs)
			res.status(BAD_REQUEST).json({message: "An account exists with the provided phone number"});
		else {
			let new_user = new UserModel();
			new_user.name = req.body.name;
			new_user.phone = req.body.phone;
			new_user.password = req.body.password;

			new_user.save((err, docs) => {
				if (err) res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
				else res.status(SUCCESS).json(error_message.SUCCESS);
			});
		}
	});
};

/**
 * @swagger
 * /user/login:
 *   post:
 *     deprecated: false
 *     tags:
 *       - user
 *     summary: logs in an user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: jwt token
 *                 user:
 *                   ref: '#/components/schemas/user'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.login = async function (req, res) {
	UserModel.findOne({phone: req.body.phone}, (err, docs) => {
		if (err) res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
		else if (!docs) res.status(DATA_NOT_FOUND).json({message: "No user with this phone exists"});
		else {
			bcrypt.compare(req.body.password, docs.password, (err, result) => {
				if (err) res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
				else if (!result) res.status(BAD_REQUEST).json(error_message.BAD_REQUEST);
				else {
					const payload = {
						phone: req.body.phone,
						name: docs.name,
						rand: Math.floor(10000000 * Math.random()),
					};

					const token = jwt.sign(payload, process.env.SECRET);
					const user = docs;

					let new_token = new UserTokenModel();
					new_token.userId = user._id;
					new_token.token = token;

					new_token.save((err, docs) => {
						if (err) res.status(INTERNAL_SERVER_ERROR).json(error_message.INTERNAL_SERVER_ERROR);
						else {
							let ret = {
								user,
								token,
							};
							res.status(SUCCESS).json(ret);
						}
					});
				}
			});
		}
	});
};
