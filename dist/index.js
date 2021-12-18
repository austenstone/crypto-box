/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 941:
/***/ ((module) => {

module.exports = eval("require")("gist-box");


/***/ }),

/***/ 866:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const { GistBox } = __nccwpck_require__(941)
const fetch = __nccwpck_require__(866);

const gistId = process.env.GIST_ID
const ghToken = process.env.GH_TOKEN
const productId = process.env.PRODUCT_ID || 'BTC-USD'

const updateGist = async (content) => {
    const box = new GistBox({ id: gistId, token: ghToken })
    await box.update({
        filename: `${productId}.txt`,
        description: `${productId} Stats. 📈`,
        content
    })
}

const run = async () => {
    const stats = await fetch(`https://api.pro.coinbase.com/products/${productId}/stats`).then(r => r.json())

    let percentChange = (stats.last - stats.open) / (stats.open * 100) * 10000
    percentChange = Math.round(percentChange * 100) / 100

    let line = `\
1₿ = $${stats.low}
${percentChange > 0 ? 'Up' : 'Down'} ${percentChange}% today
Last updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    await updateGist(line)
    console.log('Updated gist successfully ✅')
}

run()
})();

module.exports = __webpack_exports__;
/******/ })()
;