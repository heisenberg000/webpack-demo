const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname,'app'),
    build: path.join(__dirname,'build'),
};

const plugin = new ExtractTextPlugin({
    filename: '[name].css', // 生成app.css
    ignoreOrder: true,
});

module.exports = {
    devServer: {
        host: process.env.HOST,
        port: 8999,
        overlay: {
            //errors: true,
            //warnings: true,
        },
    },
    //
    devtool: 'source-map',
    // 性能参数配置
    performance: {
        hints: 'warning',
        maxEntrypointSize: 800000,
        maxAssetSize: 450000,
    },
    entry: {
        app: PATHS.app,
        // 多页面打包
        // index: './app/index.js',
        // about: './app/about.js',
        vendor: ['react'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: '/react/',
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 1,
                    enforce: true,
                    maxAsyncRequests: 1, // 最大异步请求数， 默认1
                    maxInitialRequests : 1, // 最大初始化请求书，默认1
                    reuseExistingChunk: true, // 可设置是否重用该chunk（查看源码没有发现默认值）
                },
            },
        },
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: plugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    fallback: 'style-loader',
                }),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack测试Demo',
        }),
        plugin,
        new BabiliPlugin(),
        // webpack4.0 弃用
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        // }),
    ],
};