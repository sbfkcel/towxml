//index.js

//获取应用实例
const app = getApp();

Page({
  data: {
    isloading: true,
    article: {},
    timer:undefined
  },
  onLoad: function () {
    const _ts = this;

    //请求Markdown文件内容
    app.getText(app.docDir + 'demo.md?v=110', (res) => {
      if (res.data) {

	      //将markdown内容转换为towxml数据
        let articleData = app.towxml.toJson(res.data, 'markdown', _ts);

        //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
        //例如`bind:touchstart`则为：
        this['event_bind_touchstart'] = (event)=>{
          console.log(event.target.dataset._el);     // 打印出元素信息
        };

        // 给todoList添加监听事件
        this['eventRun_todo_checkboxChange'] = (event)=>{
          console.log(event.detail);                // todoList checkbox发生change事件
        };

        //设置文章数据，并清除页面loading
        _ts.setData({
          article: articleData,
          isloading: false
        });
      };
    });
  }
})