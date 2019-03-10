const path = require('path')
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const IS_PRODUCTION = (process.env.NODE_ENV === 'production' || process.env.WEBPACK_MODE === 'production')


const plugins = [
    // new BundleAnalyzerPlugin(),
    IS_PRODUCTION ? false: new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin("dist"),
].filter(Boolean)


module.exports = {
    context: path.resolve(__dirname),
    entry: {
        index: './index.js',
    },
    output: {
        // publicPath: path.resolve(__dirname),
        filename: '[name].js',
        // publicPath: '/',
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, './dist'),
        publicPath: IS_PRODUCTION ? './' : '/',
    },
    resolve: {
        extensions: ['.ts', '.js', '.mjs', '.json'],
        modules: [
            "node_modules",
            path.resolve(__dirname),
        ],
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            { 
                exclude: /node_modules/,
                test: /\.([tj])s$/, 
                include: [path.resolve(__dirname, "server")],
                use: [
                    { 
                        loader: 'ts-loader' 
                    }
                ] 
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    cacheDirectory: true,
                    "plugins": [
                        ["@babel/plugin-proposal-function-bind"],
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                    ],
                    presets: ['@babel/preset-env']
                }
            },
        ],
    },
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                }
            }
        },
    },
    mode: IS_PRODUCTION ? "production" : "development",
    devtool: "hidden-source-map",
};