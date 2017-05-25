const {marked,fs,path} = {
	marked:require('marked'),
	fs:require('fs'),
	path:require('path')
};

let mdContent = fs.readFileSync('./doc.md').toString(),
	mdHtml = marked(mdContent);
	


console.log();

