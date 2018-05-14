<div align="center"><img width="240" src="https://cdn.rawgit.com/sbfkcel/towxml/78b0886d/logo.svg"/></div>

# Towxml

**Towxml** 是一个可将`HTML`、`Markdown`转为微信小程序`WXML`(WeiXin Markup Language)的渲染库。

用于解决在微信小程序中`Markdown`、`HTML`不能直接渲染的问题。


## 特色

- 支持代码语法高亮
- 支持emoji表情:wink:
- 支持上标、下标、下划线、删除线、表格、视频、图片（几乎所有html元素）……
- 支持typographer字符替换
- 多主题动态支持
- 极致的中文排版优化
- 前后端支持
- 支持事件绑定（这样允许自行扩展功能哟，例如：点击页面中的某个元素，更新当前页面内容等...）


## 截图

以下截图即`demo`目录编译的效果

![towxml](https://cdn.rawgit.com/sbfkcel/towxml/edc25e97/docs/demo.png)


## 快速上手

**1. 克隆TOWXML到小程序根目录**
```bash
git clone https://github.com/sbfkcel/towxml.git
```

**2. 在小程序`app.js`中引入库**
```javascript
//app.js
const Towxml = require('/towxml/main');     //引入towxml库
App({
    onLaunch: function () {
    },
    towxml:new Towxml()                     //创建towxml对象，供小程序页面使用
})
```

**3. 在小程序页面文件中引入模版**
```html
<!--pages/index.wxml-->

<!--引入towxml模版入口文件，并使用模版-->
<import src="/towxml/entry.wxml"/>
<template is="entry" data="{{...article}}"/>
```

**4. 在小程序对应的js中请求数据**
```javascript
//pages/index.js

const app = getApp();
Page({
    data: {
        //article将用来存储towxml数据
        article:{}
    },
    onLoad: function () {
        const _ts = this;

        //请求markdown文件，并转换为内容
        wx.request({
            url: 'http://xxx/doc.md',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                //将markdown内容转换为towxml数据
                let data = app.towxml.toJson(res.data,'markdown');

                //设置文档显示主题，默认'light'
                data.theme = 'dark';

                //设置数据
                _ts.setData({
                    article: data
                });
            }
        });
    }
})
```

**5. 引入对应的WXSS**
```css
/**pages/index.wxss**/

/**基础风格样式**/
@import '/towxml/style/main.wxss';


/**如果页面有动态主题切换，则需要将使用到的样式全部引入**/

/**主题配色（浅色样式）**/
@import '/towxml/style/theme/light.wxss';

/**主题配色（深色样式）**/
@import '/towxml/style/theme/dark.wxss';
```

OK，大功告成~~


## 事件绑定

`towxml`支持以下事件绑定，可自行根据需要为内容添加绑定事件。（不支持`bindtap`等事件简写方法）

```bash
'bind:touchstart',
'bind:touchmove',
'bind:touchcancel',
'bind:touchend',
'bind:tap',
'bind:longpress',
'bind:longtap',
'bind:transitionend',
'bind:animationstart',
'bind:animationiteration',
'bind:animationend',
'bind:touchforcechange',

'capture-bind:touchstart',
'capture-bind:touchmove',
'capture-bind:touchcancel',
'capture-bind:touchend',
'capture-bind:tap',
'capture-bind:longpress',
'capture-bind:longtap',
'capture-bind:transitionend',
'capture-bind:animationstart',
'capture-bind:animationiteration',
'capture-bind:animationend',
'capture-bind:touchforcechange'
```

```javascript
Page({
  data: {
    isloading: true,
    article: {}
  },
  onLoad: function () {
    const _ts = this;

    //将markdown内容转换为towxml数据，交将当前页面对象传入以创建默认事件对象
    let articleData = app.towxml.toJson('<div data-name="button" data-id="button1">测试一个可点击的元素</div>', 'html', _ts);

    //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
    //例如`bind:touchstart`则为：
    this['event_bind_touchstart'] = (event)=>{
        console.log(event.target.dataset.name);     // 打印出"button"
    };

    //设置文章数据，并清除页面loading
    _ts.setData({
        article: articleData,
        isloading: false
    });
  }
})

```

## 支持以下自定义属性

小程序的`data`属性允许从元素`event.target.dataset`中获取，`towxml`提供以下自定义属性，以便于自行处理交互扩展。

```bash
'data-url'
'data-src'
'data-alpha'
'data-data'
'data-id'
'data-name'
```

## API
如果为了追求极致的体验，建议将`markdown`、`html`转换为**towxml**数据的过程放在服务器上，在小程序中直接请求数据即可。

**1. 依赖环境**

需要 [Node.js](https://www.nodejs.org/) 环境。（已经安装请忽略）


**2. 安装`towxml`**
```bash
npm install towxml
```

**3. 接口使用**
```javascript
const Towxml = require('towxml');
const towxml = new Towxml();

//Markdown转WXML
let wxml = towxml.md2wxml('# Article title');

//html转WXML
let wxml = towxml.html2wxml('<h1>Article title</h1>');

//Markdown转towxml数据
let data = towxml.toJson('# Article title','markdown');

//htm转towxml数据
let data = towxml.toJson('# Article title');
```

## Demo示例
1. 将`towxml/demo`添加为小程序工程
2. 再克隆`towxml`到`demo`目录
3. 使用小程序开发工具编译即可

## License
MIT
