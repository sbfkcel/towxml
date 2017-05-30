const Towxml = require('/md2wx/towxml');

App({
  onLaunch:()=>{
    
    // wx.downloadFile({
    //   url: 'https://raw.githubusercontent.com/sbfkcel/md2wx/master/doc.md',
    //   success: function (res) {
    //     //console.log(res);
    //     wx.getSavedFileInfo({
    //       filePath: res.tempFilePath, //仅做示例用，非真正的文件路径
    //       success: function (res) {
    //         console.log(res.toString());
    //         // console.log(res.size)
    //         // console.log(res.createTime)
    //       },
    //       fail: (res) => {
    //         //console.log('a', res);
    //       },
    //       complete: (res) => {
    //         //console.log('b', res);
    //       }
    //     })
    //   }
    // });
    
  },
  towxml: new Towxml(),
  getText:(url,callback)=>{
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if(typeof callback === 'function'){
          callback(res);
        };
      }
    });
  },
  config:{
    request:'https://raw.githubusercontent.com/sbfkcel/md2wx/master/testDoc/'
  }
});

// //app.js
// App({
//   onLaunch: function () {
//     //调用API从本地缓存中获取数据
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)
//   },
//   getUserInfo: function (cb) {
//     var that = this
//     if (this.globalData.userInfo) {
//       typeof cb == "function" && cb(this.globalData.userInfo)
//     } else {
//       //调用登录接口
//       wx.login({
//         success: function () {
//           wx.getUserInfo({
//             success: function (res) {
//               that.globalData.userInfo = res.userInfo
//               typeof cb == "function" && cb(that.globalData.userInfo)
//             }
//           })
//         }
//       })
//     }
//   },
//   globalData: {
//     userInfo: null
//   }
// })