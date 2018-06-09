const deCode = require('./deCode');

class towxml {
	constructor(option) {
		const _ts = this;
		option = option || {};

		for (let i in option) {
			_ts.config[i] = option[i];
		};

		_ts.m = {};

		let mdOption = {
			html: true,
			xhtmlOut: true,
			typographer: true,
			highlight: function (code, lang, callback) {
				return _ts.m.highlight.highlightAuto(code).value;
			}
		};

		if (global) {
			_ts.m.html2json = require('./lib/html2json');
			_ts.m.highlight = require('./plugins/hljs/index');

			_ts.m.md = require('./lib/markdown-it')(mdOption);
			_ts.m.md_sub = require('./plugins/markdown-it-sub');
			_ts.m.md_sup = require('./plugins/markdown-it-sup');
			_ts.m.md_ins = require('./plugins/markdown-it-ins');
			_ts.m.md_mark = require('./plugins/markdown-it-mark');
			_ts.m.md_emoji = require('./plugins/markdown-it-emoji');
			_ts.m.md_todo = require('./plugins/markdown-it-todoList');

		} else if (window) {
			_ts.m.html2json = window.html2json;
			_ts.m.highlight = window.hljs;

			_ts.m.md = new window.markdownit(mdOption);
			_ts.m.md_sub = window.markdownitSub;
			_ts.m.md_sup = window.markdownitSup;
			_ts.m.md_ins = window.markdownitIns;
			_ts.m.md_mark = window.markdownitMark;
			_ts.m.md_emoji = window.markdownitEmoji;
			_ts.m.md_todo = window.markdownitTaskLists;
		};

		_ts.m.md.use(_ts.m.md_sub);
		_ts.m.md.use(_ts.m.md_sup);
		_ts.m.md.use(_ts.m.md_ins);
		_ts.m.md.use(_ts.m.md_mark);
		_ts.m.md.use(_ts.m.md_emoji);
		_ts.m.md.use(_ts.m.md_todo);

		_ts.m.md.renderer.rules.emoji = function (token, idx) {
			// return '<img class="h2w__emoji h2w__emoji--'+token[idx].markup+'" src="'+_ts.config.emoji_path + token[idx].content+'.'+ _ts.config.emoji_type+' "/>';
			return '<g-emoji class="h2w__emoji h2w__emoji--' + token[idx].markup + '">' + token[idx].content + '</g-emoji>';
		};

		_ts.wxmlTag = ['view', 'video', 'swiper', 'block', 'swiper-item', 'button', 'slider', 'scroll-view', 'movable-area', 'movable-view', 'text', 'progress', 'checkbox-group', 'label', 'checkbox', 'form', 'switch', 'input', 'radio-group', 'radio', 'picker', 'picker-view', 'switch', 'textarea', 'navigator', 'audio', 'image', 'map', 'canvas', 'contact-button'];
	}

	//markdown转html
	md2html(mdContent) {
		const _ts = this;
		return _ts.m.md.render(mdContent);
	}

	//html转wxml
	html2wxml(htmlContent) {
		const _ts = this;
		let re = /<[^<]*>/ig,
			wxml = htmlContent.replace(re, (word) => {

				//检查是否为关闭标签
				let isCloseLabel = (() => {
					let star = word.substr(0, 2);
					return star === '</';
				})();

				//处理关闭标签替换
				if (isCloseLabel) {
					let labelName = word.substr(2, word.length - 3).toLowerCase();
					if (_ts.isConversion(labelName)) {
						return '</' + _ts.newLabel(labelName) + '>';
					};
				}
				//处理开始标签替换
				else {
					let delWordBbrackets = word.substr(1, word.length - 2), //剔除首尾尖括号
						wordSplit = delWordBbrackets.split(' '), //得到元素标签与属性
						labelName = wordSplit[0].toLowerCase(), //取得tagName
						className_htmlTag = 'h2w__' + labelName;

					if (_ts.isConversion(labelName)) {
						wordSplit.splice(0, 1); //剔除元素的标签

						//检查元素是否已经有className，有的话在原基础上添加新的类名
						let wordSplitLen = wordSplit.length,
							isClassExist = (() => {
								if (wordSplitLen) {
									for (let i = 0; i < wordSplitLen; i++) {
										let item = wordSplit[i],
											re = /class="/ig;
										if (re.test(item)) {
											wordSplit[i] = item.replace(re, (word) => {
												return word + className_htmlTag + ' ';
											});
											return true;
										};
									};
								};
								return false;
							})();

						//如果元素没有className，则新加上className
						if (!isClassExist) {
							wordSplit.unshift('class="' + className_htmlTag + '"');
						};

						//组合属性
						let newAttrs = (() => {
							let s = '';
							wordSplit.forEach((item, index) => {
								s += item + ' ';
							});
							s = s.substr(0, s.length - 1);
							return s;
						})();

						// 添加todo事件绑定
						if(labelName === 'todogroup'){
							newAttrs += ' bindchange="eventRun_todo_checkboxChange"';
						};		

						//如果是图片
						if (labelName === 'img') {
							return '<image ' + newAttrs + '></image>'
						};

						// console.log('标签',labelName,'属性',newAttrs)

						return '<' + _ts.newLabel(labelName) + ' ' + newAttrs + '>' + _ts.needClose(labelName);
					};
				};
				return word;
			});
		return deCode(wxml);
	}

	//markdown转wxml
	md2wxml(mdContent) {
		const _ts = this;
		let html = _ts.md2html(mdContent),
			wxml = _ts.html2wxml(html);
		return wxml;
	}

	//检查标签是否需要转换
	isConversion(labelName) {
		const _ts = this;
		return !_ts.wxmlTag.some((item, index) => {
			return labelName === item;
		});
	}

	//处理自关闭标签,hr,br这些需要添加</view>关闭标签
	needClose(labelName) {
		let arr = ['hr', 'br'],
			s = '',
			closeTag = arr.some((item, index) => {
				return labelName === item;
			});

		if (closeTag) {
			s = '</view>';
		};
		return s;
	}

	//html与wxml对应的标签
	newLabel(labelName) {
		let temp = 'view';
		switch (labelName) {
			case 'a':
				temp = 'navigator';
				break;
			case 'span':
			case 'b':
			case 'strong':
			case 'i':
			case 'em':
			case 'code':
			case 'sub':
			case 'sup':
			case 'g-emoji':
			case 'mark':
			case 'ins':
				temp = 'text';
				break;
			case 'todogroup':
				temp = 'checkbox-group';
				break;
		};
		return temp;
	}

	//html2json
	//content html、markdown字符串
	//type 'html|markdown|xml'
	toJson(content, type, app) {
		const _ts = this;
		type = type || 'html';

		let json = '',
			sortOutJson;

		if (type === 'markdown') {
			json = _ts.m.html2json(_ts.md2wxml(content));
		} else if (type === 'html') {
      		json = _ts.m.html2json(_ts.html2wxml(content));
		};

		//遍历json将多个class属性合为一个
		(sortOutJson = (json) => {
			for (let i in json) {
				if (i === 'child' && typeof json[i] === 'object' && json[i].length) {
					json[i].forEach((item, index) => {
						sortOutJson(item);
					});
				};
				if (i === 'attr') {
					if (typeof json[i].class === 'string') {
						json[i].className = json[i].class;
					} else if (typeof json[i].class === 'object' && json[i].class.length) {
						json[i].className = json[i].class.toString().replace(/,/g, ' ');
					};
				};
			};
		})(json);

		json.theme = 'light';
		
		if(app){
			[
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
			].forEach(item => {
				let aItem = item.split(':'),
					bindType = aItem[0],		// 事件绑定类型
					evenType = aItem[1];		// 事件类型

				// 检查，如果有添加自定义事件，则运行该事件
				app[`eventRun_${bindType}_${evenType}`] = (event)=>{
					let funName = `event_${bindType}_${evenType}`,
						timer = `${funName}_timer`,
						runFun = app[funName];
					if(typeof runFun === 'function'){

						// 由于小程序的事件绑定方式与冒泡机制问题，此处使用计时器以避免事件被同时多次调用
						clearTimeout(app[timer]);
						app[timer] = setTimeout(()=>{
							runFun(event)
						});
					};
				};
			});
			app[`eventRun_todo_checkboxChange`] = (event)=>{};
		};
		return json;
	}
};

module.exports = towxml;
