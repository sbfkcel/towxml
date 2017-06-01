//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    article:{}
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
        let wxml = app.towxml.md2wxml(res.data);
        _ts.setData({
          article: app.towxml.html2json(wxml)
        });
      };
    });
  }
})
