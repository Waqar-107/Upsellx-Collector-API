# Upsellx-Collector-API

# How to Run

1. Clone the repository.
2. In the root directory of the project open the terminal(git bash in my case, I am on Windows 10).
3. Build a docker image by, `docker build -t metigy_assignment .`. Point to be noted, you can call your image whatever you want. I am calling it **metigy_assignment**.
4. Run the app by, `docker run -d -e PORT='5000' -e DB_PASS='<secret>' -p 5000:5000 metigy_assignment`.
5. The model and controllers have documentation too. You can check them in `localhost:5000/api-docs`.
6. You can test it using `postman`.
7. You can also test it using the documentation. It's been written using `swagger` so you can send request from the browser too. But I would recommend `postman`

# Challenges

The challenge is to create an API where we will pass the personal website of a company and the API will scrape data from the website and other sources, save them in the database and return the response as json. Also, if once scraped the API will return the saved data from the database. The main challanges are

- Fetch the webpage of the company and analyze the DOM for data.
- Save the data in the database for future use.

# How I have Approached the Problem

- I have used a Node.js backend. I have a route, `/api/get_data` that is a `get method` and takes a `query parameter` `url`. The `url` is the website of the company whose information we want.

- First, the database is checked, whether the particular website has been scraped or not. If yes then the saved data is returned. Otherwise the site is fetched.

- After fetching the website, the response is fed to `JSDOM` which helps to analyze the DOM. Basically I have looked for contact informations, title, about, social media links, etc.

- After getting the available social media links, the pages are fetched and the responses are saved in the database.

- `Play Store` and `Apple Store` links are also looked so that we can get insights about the usage of their app, if they have any.

- Finally, the informations are saved in the database and response is returned to the client.

# System Diagram

<img src="https://raw.githubusercontent.com/Waqar-107/Upsellx-Collector-API/master/assets/architecture.png?token=AF5TPCBJIRSWDMXAUB2FGO3AJBUDM" height="200px" width="350px" alt=""/>

The backend will be running using docker. When the client will send a request the backend will first look for it in the database, which is a NoSQL database. If found, it will be returned. Else it will fetch data and save. Here I have used `MongoDB Atlas` for NoSQL database.

# Schema

The following schema is followed to save the information.

```js
	{
		websiteUrl: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: false,
		},

		phone: [
			{
				type: String,
				required: true,
			},
		],

		email: [
			{
				type: String,
				required: true,
			},
		],

		address: {
			type: String,
			required: false,
		},

		about: {
			type: String,
			required: false,
		},

		title: {
			type: String,
			required: true,
		},

		dataSrc: [
			{
				name: {
					type: String,
					required: true,
				},

				url: {
					type: String,
					required: true,
				},

				webResponse: {
					type: String,
					required: true,
				},
			},
		],
	},
```

# Sample Request and Response

API Endpoint: `localhost:5000/api/get_data?url=https://demosite.com`

Response:

<img src="https://raw.githubusercontent.com/Waqar-107/Upsellx-Collector-API/master/assets/sample_response.PNG?token=AF5TPCDOQ6JHOKWHADI3GXTAJBVDC" height="300px" width="450px" alt=""/>

# Sources to Look for Data

1. Social media like, facebook, instagram, twitter etc.
2. YouTube channel.
3. AppStores like Google Play Store.
4. Sites like Pinterest for photos.

# Improvements That Can be Done

1. Implementation of serverless architecture.
2. It takes a long time to response when the site is searched for the first time, this should be optimized.
3. Analyzer of diffrent social media pages can be implemented.
