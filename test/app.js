const Towxml = require('/towxml/main');

App({
  onLaunch:()=>{
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
