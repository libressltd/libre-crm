const Config = {
	base_url: "http://jobs.mustachee.com/",
	side_menu: [
		{
			id: "category",
			type: "CATEGORY",
			title: "Category",
			url: "http://jobs.mustachee.com/api/category",
			post_url: "http://jobs.mustache.com/api/offer?category_id={category_id}",
			post_detail_url: "http://jobs.mustache.com/api/offer?category_id={category_id}",
		},
		{
			id: "about_us",
			type: "ABOUT_US",
			title: "Contact us title",
			content: "<p>Test contentlakjsdlfkja sopidj aposijdf poaisjdf poi</p>"
		}
	]
}
module.exports = { Config }