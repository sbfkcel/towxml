//index.js
const app = getApp();
Page({
  data:{
    path:'../../lib/doc.wxml',
    article:'',
    data:[
      {
        'tagName':'view',
        'attr':{
          style:'width:100px',
        },
        'text':'一级元素一',
        'child':[
          {
            'tagName': 'view',
            'attr': {
              width: '100px',
              height: '200px',
              background: 'red',
            },
            'text':'二级元素一'
          },
          {
            'tagName': 'view',
            'attr': {
              width: '100px',
              height: '200px',
              background: 'red',
            },
            'text':'二级元素二',
            'child':[
              {
                'tagName': 'view',
                'attr': {
                  width: '100px',
                  height: '200px',
                  background: 'red',
                },
                'text':'三级元素一'
              }
            ]
          }
        ]
      },
      {
        'tagName': 'button',
        'attr': {
          width: '100px',
          height: '200px',
          background: 'red',
        },
        'text':'一级元素二'
      }
    ]
  },
  onLoad:function(){
    const _ts = this;
    app.getText(app.config.request + 'doc.md', (res) => {
      if (res.data) {
        let wxml = app.towxml.md2wxml(res.data);
        _ts.setData({
          article: app.towxml.html2json(wxml)
        });

        console.log(app.towxml.html2json(wxml),wxml);
      };
    });
  }
})
























// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo
//       })
//     })
//   }
// })
