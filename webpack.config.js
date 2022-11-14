const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

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
        mode: 'development',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            publicPath: 'http://localhost:3000/',
            compress: true,
            port: 3000,
            hot: true,
            historyApiFallback: true
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            })
        ]
    }
};