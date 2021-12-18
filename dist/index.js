'use strict';

var _require = require('gist-box'),
    GistBox = _require.GistBox;

var fetch = require('node-fetch');

var gistId = process.env.GIST_ID;
var ghToken = process.env.GH_TOKEN;
var productId = process.env.PRODUCT_ID || 'BTC-USD';

var updateGist = async function updateGist(content) {
    var box = new GistBox({ id: gistId, token: ghToken });
    await box.update({
        filename: productId + '.txt',
        description: productId + ' Stats. \uD83D\uDCC8',
        content: content
    });
};

var run = async function run() {
    var stats = await fetch('https://api.pro.coinbase.com/products/' + productId + '/stats').then(function (r) {
        return r.json();
    });

    var percentChange = (stats.last - stats.open) / (stats.open * 100) * 10000;
    percentChange = Math.round(percentChange * 100) / 100;

    var line = '1\u20BF = $' + stats.low + '\n' + (percentChange > 0 ? 'Up' : 'Down') + ' ' + percentChange + '% today\nLast updated at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    await updateGist(line);
    console.log('Updated gist successfully ✅');
};

run();