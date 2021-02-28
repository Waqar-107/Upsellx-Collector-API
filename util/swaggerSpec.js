const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	swaggerDefinition: {
		info: {
			title: "Express-template",
			version: "1.0.0",
			description: "A template for express",
			license: {
				name: "MIT",
				url: "https://choosealicense.com/licenses/mit/",
			},
			contact: {
				name: "Waqar Hassan Khan",
				url: "",
				email: "waqar.hassan866@gmail.com",
			},
		},

		components: {
			securitySchemes: {
				bearerAuth: {
					description: "Run the /user/login api, and cop the JWT token from the response",
					type: "apiKey",
					name: "Authorization",
					in: "header",
				},
			},
		},
		openapi: "3.0.0",
		servers: [{url: "http://localhost:5000"}],
		responses: {
			UnauthorizedError: {
				description: "Access token is missing or invalid",
			},
		},

		paths: {},
		definitions: {},
		responses: {},
		parameters: {},
	},
	apis: ["./models/*.js", "./controllers/*.js"],
	explorer: true,
};

const swaggerDocs = swaggerJSDoc(options);

const setSwagger = (app) => {
	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocs, {
			explorer: true,
		})
	);
};

module.exports = setSwagger;
