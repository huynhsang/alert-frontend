const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = () => {
    const env = dotenv.config().parsed;
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                { test: /\.(js)$/, use: 'babel-loader' },
                { test: /\.css$/, use: ["style-loader", "css-loader"] }
            ]
        },
        node: {
            fs: 'empty'
        },
        mode: 'production',
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.optimize.AggressiveMergingPlugin(),
            new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            })
        ]
    }
};