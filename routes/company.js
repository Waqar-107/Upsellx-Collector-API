const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");

router.get("/api/get_data", companyController.scrapeCompanyData);
module.exports = router;
