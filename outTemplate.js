class outwxml{
    constructor(option){
        const _ts = this;
        _ts.config = {};

        option = option || {};

        for(let i in option){
          _ts.config[i] = option[i];
        };

        _ts.m = {
            fs:require('fs'),
            path:require('path')
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
            wxmlTag = ['view', 'video', 'swiper', 'block', 'swiper-item', 'button', 'slider', 'scroll-view', 'movable-area', 'movable-view', 'text', 'progress', 'checkbox-group', 'label', 'checkbox', 'form', 'input', 'radio-group', 'radio', 'picker', 'picker-view', 'switch', 'textarea', 'navigator', 'audio', 'image', 'map', 'canvas', 'contact-button'];
        
        wxmlTag.forEach((item,index)=>{
	        let imgMode = ''
	        if(item === 'image'){
		        imgMode = 'mode="widthFix"';
            };

            // todo添加绑定事件
            if(item === 'checkbox-group'){
                attr += `bindchange="{{item.attr['bindchange']}}"`;
            };
            if(item === 'checkbox'){
                attr += `value="{{item.attr['value']}}"`;
            };
            
            s+= `<${item} wx:if="{{item.node === 'element' && item.tag === '${item}'}}" ${attr} ${imgMode}><block wx:for="{{item.child}}" wx:key="{{item}}"><template is="m${id}" data="{{item}}"/></block></${item}>`;
            // s+= `
            //         <${item} wx:if="{{item.node === 'element' && item.tag === '${item}'}}" ${attr} ${imgMode}>
            //             <block wx:for="{{item.child}}" wx:key="{{item}}">
            //                 <template is="m${id}" data="{{item}}"/>
            //             </block>
            //         </${item}>
            // `;
        });

        return s;
    }

    //生成模版对应属性
    outattr(){
        const _ts = this;
        
        let s = '',
            attr = [
                'class','width','height','data','src','id','style','href','checked',
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
                'bind:touchforcechange'
            ];

        s += `data-_el="{{item}}"`;
        attr.forEach((item,index)=>{
            
            switch (item) {
                case 'class':
                    s += `${item}="{{item.attr.class}}"`;
                break;
                case 'href':
                    s += `url="{{item.attr.${item}}}"`;
                break;
                default:
                    let aItem = item.split(':');
                    if(aItem.length > 1){
                        s += `${item}='eventRun_${aItem[0]}_${aItem[1]}'`;
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
