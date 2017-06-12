const Config = {
	base_url: "http://iraqeconomy.mustachee.com/",
	side_menu: [
		{
			id: "category",
			type: "CATEGORY",
			title: "Category",
			url: Config.base_url + "api/category",
			post_url: Config.base_url + "api/offer?category_id={category_id}",
			post_detail_url: Config.base_url + "api/offer?category_id={category_id}",
		},
		{
			id: "about_us",
			type: "ABOUT_US",
			title: "Contact us title",
			content: "<p>Test contentlakjsdlfkja sopidj aposijdf poaisjdf poi</p>"
		},
		{
			id: "about_us",
			type: "SHARE",
			title: "Share",
			share_text: "Share our app",
			share_title: "Share our app",
			ios_link: "http://ioslink.com",
			android_link: "http://androidlink.com",
		}
	]
}
module.exports = { Config }