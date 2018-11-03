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
    app.getText(app.docDir + 'demo.txt?v=127', (res) => {
      if (res.data) {
	      //将markdown内容转换为towxml数据
        let articleData = app.towxml.toJson(res.data, 'markdown', _ts);
        // let articleData = app.towxml.toJson(`<div id="a"><div id="b"><audio autoplay="true" loop="true" name="此时此刻" author="许巍" poster="https://y.gtimg.cn/music/photo_new/T002R68x68M000002Blv2T1OPUFu.jpg?max_age=2592000"  src="https://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46"></audio></div></div>`,'html',_ts)

        articleData.theme = 'light';

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