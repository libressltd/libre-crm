const Config = {
	base_url: "http://jobs.mustachee.com/",
	side_menu: [
		{
			id: "category",
			type: "CATEGORY",
			title: "Category",
			url: "http://jobs.mustachee.com/api/category",
			post_url: "http://jobs.mustachee.com/api/offer?category_id={category_id}",
			post_detail_url: "http://jobs.mustachee.com/api/offer?category_id={category_id}",
		},
		{
			id: "about_us",
			type: "ABOUT_US",
			title: "About us",
			content: "<p>Test contentlakjsdlfkja sopidj aposijdf poaisjdf poi</p>"
		},
		{
			id: "contact_us",
			type: "CONTACT_US",
			title: "Contact us",
			url: "http://jobs.mustachee.com/api/contact_us"
		},
		{
			id: "about_us",
			type: "SHARE",
			title: "Share",
			share_text: "Share our app",
			share_title: "Share our app",
			ios_link: "http://ioslink.com",
			android_link: "http://androidlink.com",
		},
		{
			id: "setting",
			type: "SETTING",
			title: "Setting",
			url: "http://jobs.mustachee.com/api/contact_us"
		},
		{
			id: "notification",
			type: "NOTIFICATION",
			title: "Notification",
			url: "http://jobs.mustachee.com/api/notification"
		}
	],
	side_menu_style: {
		backgroundColor: "#FF0000"
	},
	notification_screen: {
		type: "NOTIFICATION",
		title: "Notification",
		url: "http://jobs.mustachee.com/api/notification"
	}
}
module.exports = { Config }