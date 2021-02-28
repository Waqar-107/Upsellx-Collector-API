const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/user/registration", userController.registration);
router.post("/user/login", userController.login);

module.exports = router;
