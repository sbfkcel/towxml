# TOWXML
> **towxml** 是一个可将`HTML`、`markdown`转换为`WXML`(WeiXin Markup Language)的渲染库。由于微信小程序不能直接渲染`HTML`，因此富文本编辑器生成的`HTML`内容无法直接在小程序中展示。可能是出于安全因素（XSS），即使`WXML`文本在小程序中也是以字符串方式进行渲染。当然，还是期望之后能开放这样的接口。

## 特色
- 支持代码语法高亮
- 使用简单
- 多主题动态支持
- 极致的中文排版优化

---

### 代码块
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

### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |



<video class="vidoe" id="v" src="http://v.mifile.cn/b2c-mimall-media/acdf959034bad716e851ec2f22483661.mp4">视频</video>
