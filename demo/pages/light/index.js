//index.js

//获取应用实例
const app = getApp();

Page({
  data: {
    isloading: true,
    article: {}
  },
  onLoad: function () {
    const _ts = this;

    //请求Markdown文件内容
    app.getText(app.docDir + 'demo.md?v=110', (res) => {
      if (res.data) {

	    //将markdown内容转换为towxml数据
        let articleData = app.towxml.toJson(res.data, 'markdown');

        //设置文章数据，并清除页面loading
        _ts.setData({
          article: articleData,
          isloading: false
        });
      };
    });
  }
})