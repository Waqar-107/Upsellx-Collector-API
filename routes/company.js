const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");

router.get("/api/get_data", companyController.scrape_company_data);
module.exports = router;
