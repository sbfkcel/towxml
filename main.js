const Audio = require('./lib/Audio'),
	tagsAndAttrs = require('./lib/tagsAndAttrs');

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
			breaks: true,
			highlight: function (code, lang, callback) {
				return _ts.m.highlight.highlightAuto(code).value;
			}
		};
		
		_ts.m.toJson = require('./lib/toJson');
		_ts.m.highlight = require('./plugins/hljs/index');

		_ts.m.md = require('./lib/markdown-it')(mdOption);
		_ts.m.md_sub = require('./plugins/markdown-it-sub');
		_ts.m.md_sup = require('./plugins/markdown-it-sup');
		_ts.m.md_ins = require('./plugins/markdown-it-ins');
		_ts.m.md_mark = require('./plugins/markdown-it-mark');
		_ts.m.md_emoji = require('./plugins/markdown-it-emoji');
		_ts.m.md_todo = require('./plugins/markdown-it-todoList');

		_ts.m.md.use(_ts.m.md_sub);
		_ts.m.md.use(_ts.m.md_sup);
		_ts.m.md.use(_ts.m.md_ins);
		_ts.m.md.use(_ts.m.md_mark);
		_ts.m.md.use(_ts.m.md_emoji);
		_ts.m.md.use(_ts.m.md_todo);

		_ts.m.md.renderer.rules.emoji = function (token, idx) {
			return '<g-emoji class="h2w__emoji h2w__emoji--' + token[idx].markup + '">' + token[idx].content + '</g-emoji>';
		};
	}

	/**
	 * markdown转html
	 */
	md2html(mdContent) {
		const _ts = this;
		return _ts.m.md.render(mdContent);
	}

	/**
	 * html2json
	 * @param  {string} content html或markdown字符串
	 * @param  {string} type 'html'、'marddown'
	 * @param  {object} app 小程序对象
	 */
	toJson(content, type, app){
		const _ts = this;
		type = type || 'html';

		let json = '',
			sortOutJson;

		if (type === 'markdown') {
			json = new _ts.m.toJson(_ts.md2html(content),app).getData();
		} else if (type === 'html') {
      		json = new _ts.m.toJson(content,app).getData();
		};

		json.theme = 'light';

		if(app){
			// 定义播放器点击时的播放与暂停方法
			if(typeof app.__audioPlayAndPause__ !== 'function'){
				app.__audioPlayAndPause__ = (event)=>{
					let currentTarget = event.currentTarget || {},
						dataset = currentTarget.dataset || {},
						_el = dataset._el || {},
						id = _el._id || {},
						player = typeof app.data.__audioObj__ === 'object' ? app.data.__audioObj__[id] : undefined;
					// 正在播放中则暂停，否则就播放
					if(player && player.status !== 'play' && player.status !== 'update'){
						player.play();
					}else{
						player.pause();
						player.status = 'pause';
					};
				};
			};


			tagsAndAttrs.binds.forEach(item => {
				let aItem = item.split(':'),
					bindType = aItem[0],		// 事件绑定类型
					evenType = aItem[1];		// 事件类型
				

				// 检查，如果有添加自定义事件，则运行该事件
				app[`__${bindType}_${evenType}`] = (event)=>{
					let funName = `event_${bindType}_${evenType}`,
						timer = `${funName}_timer`,
						runFun = app[funName];

					// 为audio标签绑定音频播放
					if(event && 
						event.type === 'tap' && 
						event.currentTarget &&
						event.currentTarget.dataset &&
						event.currentTarget.dataset._el &&
						event.currentTarget.dataset._el._e && 
						event.currentTarget.dataset._el._e.tagName === 'audio'){
						app.__audioPlayAndPause__(event);
					};

					if(typeof runFun === 'function'){

						// 由于小程序的事件绑定方式与冒泡机制问题，此处使用计时器以避免事件被同时多次调用
						clearTimeout(app[timer]);
						app[timer] = setTimeout(()=>{
							runFun(event)
						});
					};
				};
			});
			app[`__todo_checkboxChange`] = (event)=>{};
		};

		return json;
	}
};

module.exports = towxml;
