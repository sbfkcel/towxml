//app.js
App({
	onLaunch: function () {
	},
	
	// 引入`towxml3.0`解析方法
	towxml:require('/towxml/index'),

	//声明一个数据请求方法
	getText: (url, callback) => {
		wx.request({
			url: url,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				if (typeof callback === 'function') {
					callback(res);
				};
			}
		});
	}
})