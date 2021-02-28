const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swagger = require('./util/swaggerSpec');
const cors = require('cors');

dotenv.config();

const userRoutes = require('./routes/user');

mongoose.set('useCreateIndex', true);

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

mongoose.connect(process.env.DB_URL, options, (err) => {
	if (!err) {
		console.log('Successfully connected to database');
	} else {
		console.log('Error occurred during database connection');
	}
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// set the docs
swagger(app);

app.use(express.static('storage'));
app.use(userRoutes);

const server = app.listen(process.env.PORT, () => {
	console.log('Server started at port ' + process.env.PORT);
});
