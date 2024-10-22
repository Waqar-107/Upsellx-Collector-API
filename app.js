const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swagger = require("./util/swaggerSpec");
const cors = require("cors");

dotenv.config();

const companyRoutes = require("./routes/company");

mongoose.set("useCreateIndex", true);

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

let DB_URL = `mongodb+srv://waqar:${process.env.DB_PASS}@metigy.usap5.mongodb.net/upsellx_collectors_api?retryWrites=true&w=majority`;
mongoose.connect(DB_URL, options, (err) => {
	if (!err) {
		console.log("Successfully connected to database");
	} else {
		console.log("Error occurred during database connection. err:", err);
	}
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// set the docs
swagger(app);

app.get("/", (req, res) => {
	res.send("hello metigy");
});
app.use(companyRoutes);

let port = process.env.PORT;
const server = app.listen(port, () => {
	console.log("Server started at port " + port);
});
