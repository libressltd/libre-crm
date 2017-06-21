const Config = {
	base_url: "http://jobs.mustachee.com/",
	side_menu: [
		{
			id: "category",
			type: "CATEGORY",

			title: "الصفحة الرئيسية",
			all_category:"كل فئة",
			url: "http://jobs.mustachee.com/api/category",
			post_url: "http://jobs.mustachee.com/api/offer?category_id={category_id}",
			post_detail_url: "http://jobs.mustachee.com/api/offer?category_id={category_id}",
			icon: "ios-home-outline",
		},
		{
			id: "setting",
			type: "SETTING",
			title: "الاعدادات",
            btn_send:"حفظ",
            setting_alert_success: "نجاح",
            setting_notification: "الاشعارات",
			url: "http://jobs.mustachee.com/api/contact_us",
            btn_send:"حفظ",
			icon: "md-cog",
		},
		{
			id: "contact_us",
			type: "CONTACT_US",
			title: "اتصل بنا",
			username:"اسم",
			useremail:"البريد الإلكتروني",
			desciption:"رسالة",
			btn_send:"حفظ",
            contactus_alert_success: "نجاح",
            contactus_alert_success_message: "لقد تلقينا رسالتك. شكرا على الاتصال",
            email_notvail: "البريد الإلكتروني غير صالح",
            name_notavail: "الاسم غير صالح",
            desc_notvalid: "الرسالة غير صالحة",
            alert_error: "خطأ",
            error: "خطأ !",
            name_empty: "اسم فارغ!",
            message_empty: "رسالة فارغة!",
			url: "http://jobs.mustachee.com/api/contact_us",
			icon: "ios-mail-outline",
		},
		{
			id: "about_us",
			type: "ABOUT_US",
			title: "من نحن",
			url:"http://jobs.mustachee.com/api/setting?key=who_we_are",
			content: "<p>Test contentlakjsdlfkja sopidj aposijdf poaisjdf poi</p>",
			icon: "ios-people-outline",
		},
		{
			id: "about_us",
			type: "SHARE",
			title: "شارك التطبيق",
			share_text: "مشاركة التطبيق الخاص بك",
			share_title: "مشاركة التطبيق الخاص بك",
			ios_link: "http://ioslink.com",
			android_link: "http://androidlink.com",
			icon: "md-share",
		},
		{
			id: "notification",
			type: "NOTIFICATION",
			title: "اشعارات",
			url: "http://jobs.mustachee.com/api/notification",
			icon: "ios-notifications-outline",
		}
	],
	side_menu_style: {
		backgroundColor: "#000"
	},
	notification_screen: {
		type: "NOTIFICATION",
		title: "اشعارات",
		url: "http://jobs.mustachee.com/api/notification"
	}
}
module.exports = { Config }