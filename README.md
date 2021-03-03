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
