'use strict';

// Modules
var webpack = require('webpack');
var path = require('path');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function () {
    var config = {};

    config.entry = isTest ? {} : './src/app.js';
    config.output = isTest ? {} : {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }


    config.module = {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }, {
            test: /\.scss$/,
            loader: isTest ? 'null' : 'style!css!sass!'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    };

    if (isTest) {
        config.module.preLoaders.unshift({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'isparta-loader'
        });
    }

    config.devServer = {
        contentBase: './src'
    };

    config.resolve = {
        root: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    };

    return config;
}();