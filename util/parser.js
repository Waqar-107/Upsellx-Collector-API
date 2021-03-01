const got = require("got");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

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
	let dom;
	await got(url)
		.then((response) => {
			dom = new JSDOM(response.body);
		})
		.catch((err) => {
			console.log("error fetching");
		});

	return dom;
};
