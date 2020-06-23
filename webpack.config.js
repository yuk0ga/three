const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, 'docs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        '01/index': './src/01/index.js',
        '02/index': './src/02/index.js',
        '03/index': './src/03/index.js',
        '04/index': './src/04/index.js',
        '05/index': './src/05/index.js'
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    devServer: {
        contentBase: outputPath 
    },
    module: {
        rules: [
            {
                test: /\.glsl$/,
                use: {
                  loader: 'webpack-glsl-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          THREE: 'three'
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: 'assets', to: 'assets' }
          ]
        })
    ]
} 