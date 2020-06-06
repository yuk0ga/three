const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    entry: {
        '01/index': './src/01/index.js',
        '02/index': './src/02/index.js'
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    devServer: {
        contentBase: outputPath 
    }
} 