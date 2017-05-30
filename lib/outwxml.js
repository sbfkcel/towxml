const fs = require('fs'),
    path = require('path');


let s = '';

for(let i = 0, len = 20; i<len; i++){
    let c = i < len - 1 ? i+1 : i;
    let temp = `
        <template name="m${i}">
            <!--文字-->
            <block wx:if="{{item.node === 'text'}}">
                {{item.text}}
            </block>
            
            <!--视图-->
            <view
                wx:if="{{item.node === 'element' && item.tag === 'view'}}"
                class="{{item.attr.class}}"
                width="{{item.attr.width}}"
                height="{{item.attr.height}}"
                data="{{item.attr.data}}"
                src="{{item.attr.src}}"
                id="{{item.attr.id}}"
                style="{{item.attr.style}}"
            >
                <block wx:for="{{item.child}}" wx:key="{{item}}">
                    <template is="m${c}" data="{{item}}"/>
                </block>
            </view>

            <!--按钮-->
            <button
                wx:if="{{item.tag === 'button'}}"
                class="{{item.attr.class}}"
                width="{{item.attr.width}}"
                height="{{item.attr.height}}"
                data="{{item.attr.data}}"
                src="{{item.attr.src}}"
                id="{{item.attr.id}}"
                style="{{item.attr.style}}"
            >
                <block wx:for="{{item.child}}" wx:key="{{item}}">
                    <template is="m${c}" data="{{item}}"/>
                </block>
            </button>
            
        </template>
    `;

    s+=temp;
};

fs.writeFileSync('./m.wxml',s);