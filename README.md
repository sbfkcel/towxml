<div align="center"><img width="240" src="https://cdn.rawgit.com/sbfkcel/towxml/78b0886d/logo.svg"/></div>

# Towxml

**Towxml** 是一个可将`HTML`、`Markdown`转为微信小程序`WXML`(WeiXin Markup Language)的渲染库。

用于解决在微信小程序中`Markdown`、`HTML`不能直接渲染的问题。

**使用交流QQ群：182874473**


## 特色

- 可控制的音频播放器（可自行调节样式，解决原生`audio`在部分iPhone上不能自动播放的情况）
- 支持代码语法高亮
- 支持emoji表情:wink:
- 支持上标、下标、下划线、删除线、表格、视频、图片（几乎所有html元素）……
- 支持typographer字符替换
- 多主题动态支持
- 极致的中文排版优化
- Markdown TodoList
- 支持事件绑定（这样允许自行扩展功能哟，例如：点击页面中的某个元素，更新当前页面内容等...）
- 前后端支持

> 音频播放器播放状态设定为每5秒更新一次，否则内容过多会导致性能下降


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
                let data = app.towxml.toJson(
                        res.data,               // `markdown`或`html`文本内容
                        'markdown'              // `markdown`或`html`
                    );
                
                //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
                data = app.towxml.initData(data,{
                    base:'https://xxx.com/',    // 需要解析的内容中相对路径的资源`base`地址
                    app:_ts                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
                });

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

# 2.1.0或以上的版本不支持以下事件（可自行修改`lib/tagsAndAttrs.js`中的事件解析部分，然后执行`node outTemplate.js`生成新的解析模版）
'bind:longpress',
'bind:longtap',
'bind:transitionend',
'bind:animationstart',
'bind:animationiteration',
'bind:animationend',
'bind:touchforcechange'
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
    let articleData = app.towxml.toJson('<div name="button" id="button1">测试一个可点击的元素</div>', 'html');
    
    //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
    articleData = app.towxml.initData(data,{
        base:'https://xxx.com/',    // 需要解析的内容中相对路径的资源`base`地址
        app:_ts                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
    });

    //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
    //例如`bind:touchstart`则为：
    this['event_bind_touchstart'] = (event)=>{
        console.log(event.target.dataset._el);     // 打印出元素信息
    };

    // 给todoList添加监听事件
    this['eventRun_todo_checkboxChange'] = (event)=>{
        console.log(event.detail);                 // todoList checkbox发生change事件
    };

    //设置文章数据，并清除页面loading
    _ts.setData({
        article: articleData,
        isloading: false
    });
  }
})

```

## 在WePY框架中使用towxml

此处以`wepy 1.7.3`为例，其它版本请参考

```bash

# 初始化一个项目
wepy init standard myproject

# 切换到项目目录
cd myproject

# 安装依赖
npm install

# 安装towxml
npm install towxml --save

# 切换到src目录
cd src

# 克隆或下载towxml库到src目录中
git clone https://github.com/sbfkcel/towxml.git

# 将`towxml/demo/pages/wepyDemo.wpy`内容替换到`src/pages/index.wpy`

# 删除`src/towxml/`目录中未引入的文件（当然，也可不删除。需要保留的文件见上一步wepyDemo.wpy文件中的文件引入依赖）

# 开启实时编译
wepy build --watch

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

//Markdown转towxml数据
let data = towxml.toJson('# Article title','markdown');

//htm转towxml数据
let data = towxml.toJson('<h1>Article title</h1>','html');
```

## Demo示例
1. 将`towxml/demo`添加为小程序工程
2. 再克隆`towxml`到`demo`目录
3. 使用小程序开发工具编译即可


## 更新说明

### 2.1.2

- 调整部分资源路径
- 为相对路径资源增加`base`设置支持
- 为方便后端生成数据，将数据初始化方法分离

### 2.1.0

- 增加自定义audio播放器（以解决部分播放器下audio无法播放的情况）
- 剔除不需要的事件支持，以减少包大小

> audio播放器正在播放状态每5秒更新一次界面数据（以减少多内容时频繁刷新造成的性能问题）

### 2.0.1

- video、audio增加封面支持

### 2.0.0

- 重写转换核心方法，更小、更快、更全、容错更高

### 1.5.12

- 增加Markdown TodoList 支持

### 1.5.11

- 调整事件绑定策略，剔除`capture-bind`绑定方式
- 调整自定义事件时获取元素属性的方式
    - `event.target.dataset._el`元素的所有属性
- 剔除`data-url`、`data-src`、`data-alpha`、`data-id`、`data-name`的支持（因为元素数据传递方式更全，模版代码更少）


### 1.5.7

- 调整代码片段在模拟器上与真机不一至的问题


## 1.5.6

- 增加事件绑定方法，允许为元素添加自定义事件


## License
MIT
