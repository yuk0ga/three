const path = require('path')

module.exports = {
    mode: "development",

    entry: {
        "01/index": "./src/01/index.js",
        "02/index": "./src/02/index.js"
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
} 