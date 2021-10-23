const parse2 = require('./parse2/index'),
    // parse5 = require('./parse5/index').parse,
    config = require('../config'),

    // html与wxml转换关系
    correspondTag = (()=>{
        let result = {
                a:'navigator',
                todogroup:'checkbox-group',
                audio:'audio-player'
            };
        
        // 该系列的标签都转换为text
        // ['span','b','strong','i','em','code','sub','sup','g-emoji','mark','ins','u'].forEach(item => {
        //     result[item] = 'text';
        // });

        // 该系列小程序原生tag，不需转换
        [...config.wxml,...config.components].forEach(item => {
            result[item] = item;
        });
        return result;
    })(),

    // 元素与html对应的wxml标签名
    getWxmlTag = tagStr => !tagStr ? undefined : correspondTag[tagStr] || 'view',

    // 依赖父级的元素
    relyList = ['li'],

    // 精简数据，并初始化相关事件等
    initObj = (obj,option)=>{
        const result = {
                theme:option.theme || 'light',
                _e:{}
            },
            events = global._events = {},
            base = option.base;

        // 主题保存到全局
        global._theme = result.theme;

        // 事件添加到全局中，各个组件在触发事件时会从全局调用
        if(option.events){
            for(let key in option.events){
                events[key] = option.events[key];
            };
        };

        // 遍历原始数据，处理成能解析的数据
        let eachFn;
        (eachFn = (arr,obj,_e,isRichTextContent) => {
            obj.children = obj.children || [];
            _e.child = _e.child || [];
            let child = obj.children,
                child_e = _e.child;
            
            arr.forEach(item => {
                if(item.type === 'comment'){
                    return;
                };
                let o = {
                        type:item.type === 'text' ? 'text' : isRichTextContent ? 'node' : item.type
                    },
                    e = {},
                    attrs = o.attrs = item.attribs || {};
                if(item.type === 'text'){
                    o.text = e.text = item.data;
                }else{
                    if(isRichTextContent){
                        o.name = item.name;
                    }else{
                        o.tag = getWxmlTag(item.name);      // 转换之后的标签
                        // o.tag = o.tag === 'text' ? 'view' : o.tag;
                        e.tag = item.name;                  // 原始
                        o.attrs = item.attribs;
                        e.attrs = JSON.parse(JSON.stringify(attrs));
                    };
                    attrs.class = attrs.class ? `h2w__${item.name} ${attrs.class}` : `h2w__${item.name}`;
                    
                    // 处理资源相对路径
                    if(base && attrs.src){
                        let src = attrs.src;
                        switch (src.indexOf('//')) {
                            case 0:
                                attrs.src = `https:${src}`;
                            break;
                            case -1:
                                attrs.src = `${base}${src}`;
                            break;
                        };
                    };
                };

                o.rely = relyList.indexOf(e.tag) > -1;      // 判断是否不能嵌套其它标签
                
                if(item.children){
                    eachFn(item.children,o,e,isRichTextContent || item.name === 'rich-text');
                };
                child.push(o);
                child_e.push(e);
            });
        })(obj,result,result._e,false);
        return result;
    };

module.exports = (str,option) => {
    str = (()=>{
        let re = /<body[^>]*>([\s\S]*)<\/body>/i;
        if(re.test(str)){
            let result = re.exec(str);
            return result[1] || str;
        }else{
            return str;
        };
    })();
    return initObj(parse2(str,{decodeEntities:true}),option);
};