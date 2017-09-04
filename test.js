const fs = require('fs');

const Towxml = require('./main');
const towxml = new Towxml();

let xml = fs.readFileSync('./test.xml').toString();



let wxml = towxml.toJson(xml,'xml');


console.log(wxml)