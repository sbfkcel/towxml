//index.js
const app = getApp();
Page({
  data:{
    article:{}
  },
  onLoad:function(){
    const _ts = this;
    app.getText(app.config.request + 'doc.md', (res) => {
      if (res.data) {
        let wxml = app.towxml.md2wxml(res.data);
        _ts.setData({
          article: app.towxml.html2json(wxml)
        });
      };
    });
  }
})
