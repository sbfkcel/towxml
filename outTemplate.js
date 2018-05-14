class outwxml{
    constructor(option){
        const _ts = this;
        _ts.config = {};

        option = option || {};

        for(let i in option){
          _ts.config[i] = option[i];
        };

        let Towxml = require('./main');
        _ts.m = {
            fs:require('fs'),
            path:require('path'),
            towxml:new Towxml()
        };
    }
    init(){
        const _ts = this;

        _ts.outtag();

        let s = _ts.outwxml();
        _ts.m.fs.writeFileSync('./renderTemplate.wxml',s);
    }

    //输出tag
    outtag(id){
        const _ts = this;
        let s = '',
            attr = _ts.outattr(),
            wxmlTag = _ts.m.towxml.wxmlTag;
        
        wxmlTag.forEach((item,index)=>{
	        let imgMode = ''
	        if(item === 'image'){
		        imgMode = 'mode="widthFix"';
	        };
            s+= `
                    <${item} wx:if="{{item.node === 'element' && item.tag === '${item}'}}" ${attr} ${imgMode}>
                        <block wx:for="{{item.child}}" wx:key="{{item}}">
                            <template is="m${id}" data="{{item}}"/>
                        </block>
                    </${item}>
            `;
        });

        return s;
    }

    //生成模版对应属性
    outattr(){
        const _ts = this;
        
        let s = '',
            attr = [
                'class','width','height','data','src','id','style','href','data-ename','data-url','data-src','data-alpha','data-data','data-id','data-name',
                
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
            ];
        attr.forEach((item,index)=>{
            switch (item) {
                case 'class':
                    s += `${item}="{{item.attr.className}}"`;
                break;
                case 'href':
                    s += `url="{{item.attr.${item}}}"`;
                    s += `data-href="{{item.attr.${item}}}"`;
                break;
                default:
                    let aItem = item.split(':');
                    if(aItem.length > 1){
                        s += `${item}='event_${aItem[0]}_${aItem[1]}'`;
                    }else{
                        s += `${item}="{{item.attr['${item}']}}"`;
                    };
                break;
            };                   
        });
        return s;
    }

    //wxml模版生成
    outwxml(){
        const _ts = this;
        let s = '';

        for (let i = 0, len = _ts.config.depth; i<len; i++){
            let c = i < len - 1 ? i+1 : i;
            let temp = `<template name="m${i}"><block wx:if="{{item.node === 'text'}}">{{item.text}}</block>${_ts.outtag(c)}</template>`;
            // let temp = `<template name="m${i}">
            //         <!--文字-->
            //         <block wx:if="{{item.node === 'text'}}">
            //             {{item.text}}
            //         </block>
                    
            //         ${_ts.outtag(c)}
                    
            //     </template>
            // `;
            // let temp = `
            //     <template name="m${i}">
            //         <!--文字-->
            //         <block wx:if="{{item.node === 'text'}}">
            //             {{item.text}}
            //         </block>
                    
            //         <!--视图-->
            //         <view
            //             wx:if="{{item.node === 'element' && item.tag === 'view'}}"
            //             class="{{item.attr.class}}"
            //             width="{{item.attr.width}}"
            //             height="{{item.attr.height}}"
            //             data="{{item.attr.data}}"
            //             src="{{item.attr.src}}"
            //             id="{{item.attr.id}}"
            //             style="{{item.attr.style}}"
            //         >
            //             <block wx:for="{{item.child}}" wx:key="{{item}}">
            //                 <template is="m${c}" data="{{item}}"/>
            //             </block>
            //         </view>

            //         <!--按钮-->
            //         <button
            //             wx:if="{{item.tag === 'button'}}"
            //             class="{{item.attr.class}}"
            //             width="{{item.attr.width}}"
            //             height="{{item.attr.height}}"
            //             data="{{item.attr.data}}"
            //             src="{{item.attr.src}}"
            //             id="{{item.attr.id}}"
            //             style="{{item.attr.style}}"
            //         >
            //             <block wx:for="{{item.child}}" wx:key="{{item}}">
            //                 <template is="m${c}" data="{{item}}"/>
            //             </block>
            //         </button>
                    
            //     </template>
            // `;

            s+=temp;
        };

        return s;
    }
};

new outwxml({depth:10}).init();