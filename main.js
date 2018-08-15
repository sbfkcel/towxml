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
			json = new _ts.m.toJson(_ts.md2html(content)).getData();
		} else if (type === 'html') {
      		json = new _ts.m.toJson(content).getData();
		};

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
