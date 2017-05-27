const {marked,fs,path} = {
	marked:require('marked'),
	fs:require('fs'),
	path:require('path')
};

let mdContent = fs.readFileSync('./doc.md').toString(),
	mdHtml = marked(mdContent);

//<hr>、<hr/>、<hr />、<br>、<br/>、<br />需要替换为view.xx
let eautistic = ['hr','br'];

//img需要替换为<image></image>
let img = [];

//需要替换为view.xx、
let replace = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'ul',
	'ol',
	'li',
	'pre',
	'code',
	'blockquote',
	'table',
	'thead',
	'th',
	'tbody',
	'tr',
	'td',
	'tfooter',
	'p',
	'a'
];
	


console.log(mdHtml);

