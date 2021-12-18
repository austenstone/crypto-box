'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.run = undefined;

var _gistBox = require('gist-box');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gistId = process.env.GIST_ID;
var ghToken = process.env.GH_TOKEN;
var productId = process.env.PRODUCT_ID || 'BTC-USD';

var updateGist = async function updateGist(content) {
    var box = new _gistBox.GistBox({ id: gistId, token: ghToken });
    await box.update({
        filename: productId + '.txt',
        description: productId + ' Stats. \uD83D\uDCC8',
        content: content
    });
};

var run = exports.run = async function run() {
    var stats = await (0, _nodeFetch2.default)('https://api.pro.coinbase.com/products/' + productId + '/stats').then(function (r) {
        return r.json();
    });

    var percentageChange = (stats.last - stats.open) / (stats.open * 100) * 10000;
    percentageChange = Math.round(percentageChange * 100) / 100;

    var line = '1\u20BF = $' + stats.low + '\n' + (percentageChange > 0 ? 'Up' : 'Down') + ' ' + percentageChange + '% today\nLast updated at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    await updateGist(line);
    console.log('Updated gist successfully! ✅');
};

run();