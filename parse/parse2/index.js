var DomHandler = require("./domhandler/index.js");
var Parser = require("./Parser.js");
function parseDocument(data, options) {
    var handler = new DomHandler(undefined, options);
    new Parser(handler, options).end(data);
    return handler.root.children;
}
module.exports = parseDocument;