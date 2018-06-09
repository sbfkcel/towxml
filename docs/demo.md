# Towxml

![Towxml](https://cdn.rawgit.com/sbfkcel/towxml/b5dffaf2/docs/logo--horizontal.svg)

由于微信小程序==不允许直接渲染==`HTML`，因此富文本编辑器生成的`HTML`内容无法直接在小程序中展示。

**Towxml** 正是为了解决这一切，Towxml是一个可将`HTML`、`markdown`转换为`WXML`(WeiXin Markup Language)的渲染库。


## 特色

- 支持代码语法高亮
- 支持emoji表情:wink:
- 支持上标、下标、下划线、删除线……
- 支持typographer字符替换
- 多主题动态支持
- 极致的中文排版优化
- Markdown TodoList
- 元素事件绑定
- 前后端支持

---


## 什么是 Markdown

**Markdown** 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字。

当然，不仅仅只是这些……

**更多详见** [http://www.markdown.cn/](http://www.markdown.cn/)


## Markdown TodoList

- [ ] 一起去旅行
- [ ] 跟同学聚会
- [x] 晚上十点足球比赛
- [x] 测试用例撰写


## 图文排列

**边城`沈从文`著——中篇小说**

> 在川湘交界的茶峒附近，小溪白塔旁边，住着主人公翠翠和她爷爷老船夫。茶峒城里有个船总叫顺顺，他有两个儿子，老大叫天保，老二叫傩送。

![凤凰古城](https://cdn.rawgit.com/sbfkcel/towxml/a411540c/docs/img.jpg)
端午节翠翠去看[龙舟赛](http://link)，偶然相遇相貌英俊的青年水手傩（nuó）送，傩送在翠翠的心里留下了深刻的印象。同时，傩送的兄长天保也喜欢上了翠翠，并提前托媒人提了亲。天保告诉傩送一年前他就爱上了翠翠，而傩送告诉天保他两年前就爱上了翠翠，天保听了后也吃了一惊。然而此时，当地的团总以新磨坊为陪嫁，想把女儿许配给傩送。而傩送宁肯继承一条破船也要与翠翠成婚。

兄弟俩没有按照当地风俗以决斗论胜负，而是采用公平而浪漫的唱山歌的方式表达感情，让翠翠自己从中选择。傩送是唱歌好手，天保自知唱不过弟弟，心灰意冷，断然驾船远行做生意。

碧溪边只听过一夜傩送的歌声，后来，歌却再没有响起来。老船夫忍不住去问，本以为是老大唱的，却得知：唱歌人是傩送，老大讲出实情后便去做生意。几天后老船夫听说老大坐水船出了事，淹死了……

码头的船总顺顺因为儿子天保的死对老船夫变得冷淡。船总顺顺不愿意翠翠再做傩送的媳妇。老船夫只好郁闷地回到家，翠翠问他，他也没说起什么。夜里下了大雨，夹杂着吓人的雷声。第二天翠翠起来发现船已被冲走，屋后的白塔也冲塌了，翠翠去找爷爷却发现老人已在雷声将息时死去了…… 老军人杨马兵热心地前来陪伴翠翠，也以渡船为生，等待着傩送的归来。


## Code

Python

``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```

Xml

```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
	<schema name="doubaSchema" checkSQLschema="false" sqlMaxLimit="100" dataNode="dn1"></schema>
	
	<dataNode name="dn1" dataHost="dh1" database="douba" />
	
	<dataHost name="dh1" maxCon="500" minCon="20" balance="1" writeType="0" dbType="mysql" dbDriver="native" switchType="2" slaveThreshold="100">
		<heartbeat>show slave status</heartbeat>
		
		<writeHost host="hostM41" url="192.168.2.41:3306" user="root" password="123456" >
			<readHost host="hostS42" url="192.168.2.42:3306" user="root" password="123456" />
			<readHost host="hostS43" url="192.168.2.43:3306" user="root" password="123456" />
		</writeHost>
	</dataHost>
</mycat:schema>
```

Html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    content text...
</body>
</html>
```

Css

```css
html,body {background:white;}
.box {width:200px; height:200px;}
```

Javascript

```javascript
(()=>{
    const fs = require('fs');
    
    let sum = (a,b)=>{
        return a+b;
    };
    
    console.log(sum(1+2));
})()
```

Bash

```bash
# 查看当前仓库情况
$ git status

# On branch branch -b
# You have unmerged paths.
```

## emoji 8-)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)


## Table

| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |


### Typographic replacements

Enable typographer option to see result.
(c) (C) (r) (R) (tm) (TM) (p) (P) +-
test.. test... test..... test?..... test!....
!!!!!! ???? ,,  -- ---
"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!


Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`


Start numbering with offset:

57. foo
1. bar


## Links

[https://github.com/sbfkcel/towxml](https://github.com/sbfkcel/towxml)
[https://www.npmjs.com/package/towxml](https://www.npmjs.com/package/towxml)


## Subscript/Superscript

- 19^th^
- H~2~O


## ins

++Inserted text++


## Mark

==Marked text==


## Video
<video class="vidoe" src="http://baobab.kaiyanapp.com/api/v1/playUrl?vid=17129&editionType=normal&source=qcloud">视频</video>


---


由`Towxml`生成

