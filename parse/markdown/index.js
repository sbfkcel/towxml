let hljs;
hljs = require('../highlight/index');

const config = require('../../config'),
    mdOption = (()=>{
        let result = {
            html: true,
            xhtmlOut: true,
            typographer: true,
            breaks: true,
        };

        if(config.highlight.length && hljs){
            result.highlight = (code,lang,callback) => hljs.highlightAuto(code).value;
        };
        return result;
    })(),
    md = require('./markdown')(mdOption);

// 应用Markdown解析扩展，包括自定义组件（['sub','sup','ins','mark','emoji','todo','latex','yuml','echarts']）
[...config.markdown,...config.components].forEach(item => {
    if(!/^audio-player|table|todogroup$/.test(item)){
        md.use(require(`./plugins/${item}`));
    };
});

// 定义emoji渲染规则
md.renderer.rules.emoji = (token,index)=>{
    let item = token[index];
    return `<g-emoji class="h2w__emoji h2w__emoji--${item.markup}">${item.content}</g-emoji>`;
};

// 导出模块
module.exports = str => {
    return md.render(str);
};