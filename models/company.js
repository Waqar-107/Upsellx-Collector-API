const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({}, {timestamps: true});

module.exports = mongoose.model("company", CompanySchema);
