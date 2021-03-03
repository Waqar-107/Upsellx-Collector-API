# Upsellx-Collector-API

# How to Run

1. Clone the repository.
2. In the root directory of the project open the terminal(git bash in my case, I am on Windows 10).
3. Build a docker image by, `docker build -t metigy_assignment .`. Point to be noted, you can call your image whatever you want. I am calling it **metigy_assignment**.
4. Run the app by, `docker run -d -e PORT='5000' -e DB_PASS='<secret>' -p 5000:5000 metigy_assignment`.

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
