const path = require('path');

module.exports = {
    entry: './index.js',
    target: 'node12',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
};