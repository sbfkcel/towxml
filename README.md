<div align="center"><img width="240" src="https://cdn.rawgit.com/sbfkcel/towxml/78b0886d/logo.svg"/></div>

# Towxml

**Towxml** 是一个可将`HTML`、`Markdown`转为微信小程序`WXML`(WeiXin Markup Language)的渲染库。用于解决在微信小程序中`Markdown`、`HTML`不能直接渲染的问题。

**Towxml 3.0版本发布啦！✨✨✨**

较2.x版本，新版体积更小、速度更快⚡️、支持无限级解析，增加诸多新特性。推荐使用。

> 如果继续要使用旧版本可切换到 [2.x分支](https://github.com/sbfkcel/towxml/tree/2.x)

[**官方交流群：182874473（点击加入）**](https://jq.qq.com/?_wv=1027&k=54KTcZi)，进群答案：wiki和issues


## 特色

Towxml 3.0 完整支持以下功能。当然在构建时可仅保留需要功能以减少体积大小和代码依赖。

- 支持echarts图表（3.0+）✨
- 支持LaTex数学公式（3.0+）✨
- 支持yuml流程图（3.0+）✨
- 支持按需构建（3.0+）✨
- 支持代码语法高亮、代码块行号显示
- 支持emoji表情:wink:
- 支持上标、下标、下划线、删除线、表格、视频、图片（几乎绝大部分html元素）……
- 支持typographer字符替换
- 支持多主题切换
- 支持Markdown TodoList
- 支持事件绑定（这样允许自行扩展功能哟，例如：点击页面中的某个元素，更新当前页面内容等...）
- 极致的中文排版优化
- 支持前后解析数据


## 截图

以下截图即`demo`项目（文件见wiki）编译的效果

![Towxml](https://raw.githack.com/sbfkcel/blog/gh-pages/wxml_demo/demo3.x.png)


## 如何使用？

**注意：**`3.0`切勿直接拉取代码使用，请根据自行需要构建得到最终的代码。

> 使用遇到问题先把  wiki 中的 demo 按步骤完整跑起来。


### Towxml3.0文档（beta）

以下文档仅适用于Master分支代码。

- [3.0 构建Towxml](https://github.com/sbfkcel/towxml/wiki/3.0-%E6%9E%84%E5%BB%BATowxml)
- [3.0 让Demo跑起来](https://github.com/sbfkcel/towxml/wiki/3.0-%E8%AE%A9Demo%E8%B7%91%E8%B5%B7%E6%9D%A5)
- [3.0 如何使用](https://github.com/sbfkcel/towxml/wiki/3.0-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8)
- [3.0 Echarts支持](https://github.com/sbfkcel/towxml/wiki/3.0-Echarts%E6%94%AF%E6%8C%81)
- [3.0 LaTex数学公式、yuml流程图支持](https://github.com/sbfkcel/towxml/wiki/3.0-%E6%95%B0%E5%AD%97%E5%85%AC%E5%BC%8F&yuml%E6%B5%81%E7%A8%8B%E5%9B%BE%E6%94%AF%E6%8C%81)
- [3.0 在uniapp中使用towxml（感谢 @anyfar）](https://github.com/sbfkcel/towxml/issues/116)


### FAQ
  - 公式渲染格式不对
    - 将内容写在变量中的，请注意[公式中的特殊符号转译](https://github.com/sbfkcel/towxml/issues/138)
    - 以http形式加载内容的参考demo

### Towxml2.0文档

以下文档仅适用于2.x分支代码。

- [2.0 让Demo跑起来](https://github.com/sbfkcel/towxml/wiki/2.0-%E8%AE%A9Demo%E8%B7%91%E8%B5%B7%E6%9D%A5)
- [2.0 哪些文件可删除？](https://github.com/sbfkcel/towxml/wiki/2.0-%E5%93%AA%E4%BA%9B%E6%96%87%E4%BB%B6%E5%8F%AF%E5%88%A0%E9%99%A4%EF%BC%9F)


## 打赏

如果用着不错，可以『打赏』支持。因为有你，开源更美好。

|微信打赏|支付宝打赏|
|:---:|:---:|
|![支持开源，微信打赏。](https://www.vvadd.com/wxml_demo/qrcode_wechat.png?v=1)|![支持开源，微信打赏。](https://www.vvadd.com/wxml_demo/qrcode_alipay.png?v=1)|


## 应用展示

这些小程序都使用了 towxml， [查看用户提交的案例](https://github.com/sbfkcel/towxml/issues/60) 。


## License
MIT

