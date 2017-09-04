//app.js

//引入Towxml
const Towxml = require('/towxml/main');
App({
  onLaunch: function () {
  },

  //创建一个towxml对象，供其它页面调用
  towxml:new Towxml(),

  //声明Markdown文件目录路径
  docDir: 'https://raw.githubusercontent.com/sbfkcel/towxml/master/docs/',
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