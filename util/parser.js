const got = require("got");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {isBangladeshiPhone} = require("../validator/checker");

exports.getSelfInfo = async (dom) => {
	let selfInfo = {
		phone: [],
		email: [],
	};

	//---------------------------------------------------------------------------
	// title
	selfInfo.title = dom.window.document.querySelector("title").text;

	//---------------------------------------------------------------------------
	// try to get phone numbers
	// first try using by class with names `number` and `phone`
	let numbers = dom.window.document.getElementsByClassName("number");
	for (let i = 0; i < numbers.length; i++) {
		let phone = numbers[i].textContent.split("-").join("");
		if (isBangladeshiPhone(phone)) selfInfo.phone.push(phone);
	}

	numbers = dom.window.document.getElementsByClassName("phone");
	for (let i = 0; i < numbers.length; i++) {
		let phone = numbers[i].textContent.split("-").join("");
		if (isBangladeshiPhone(phone)) selfInfo.phone.push(phone);
	}

	//---------------------------------------------------------------------------
	// try to get email addresses
	// try using class that has email in it
	let emails = dom.window.document.getElementsByClassName("email");
	for (let i = 0; i < emails.length; i++) {
		let email = emails[i].textContent;
		selfInfo.email.push(email);
	}

	return selfInfo;
};

exports.getSocialLinks = async (dom) => {
	let socialLinks = {};
	let requiredSocialLinks = {
		facebook: "facebook",
		instagram: "instagram",
		youtube: "youtube",
		twitter: "twitter",
		pinterest: "pinterest",
		googlePlayStore: "play.google.com",
		appleStore: "itunes.apple.com",
	};

	let keys = Object.keys(requiredSocialLinks);

	await dom.window.document.querySelectorAll("a").forEach((val) => {
		for (let i = 0; i < keys.length; i++) {
			if (val.href.includes(requiredSocialLinks[keys[i]])) {
				socialLinks[keys[i]] = val.href;
				break;
			}
		}
	});

	return socialLinks;
};

exports.getWebPage = async (url) => {
	let dom, webResponse;
	await got(url)
		.then((response) => {
			dom = new JSDOM(response.body);
			webResponse = response.body;
		})
		.catch((err) => {
			console.log("error fetching", err);
		});

	return {dom, webResponse};
};
