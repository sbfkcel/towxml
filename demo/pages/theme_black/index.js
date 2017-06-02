//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    isloading: true,
    article: {}
  },
  docDir: 'https://raw.githubusercontent.com/sbfkcel/towxml/master/docs/',
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
  },
  onLoad: function () {
    const _ts = this;
    _ts.getText(_ts.docDir + 'demo.md', (res) => {
      if (res.data) {
        let d = app.towxml.toJson(res.data, 'markdown');
        d.theme = 'black';
        _ts.setData({
          article: d,
          isloading: false
        });
      };
    });
  }
})
