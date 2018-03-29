/*
* @Author: Administrator
* @Date:   2018-03-29 14:12:44
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-29 22:28:20
*/

var path 				= require('path');
var webpack 			= require('webpack');
var Ex 					= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

// 获取html-webpack-plugin参数
var getHtmlConfig = function (name) {
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		inject: true,
		hash: true,
		chunks: ['common', name]
	}
}

var config = {
	entry: {
		'common': ['./src/page/commons/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js'
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: Ex.extract('style-loader', 'css-loader')
			},
			{
				test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=100&name=resource/[name].[ext]'
			},
		]
	},
	plugins: [
		// 独立通用模块到common.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.js'
		}),
		// css单独打包
		new Ex("css/[name].css"),
		// html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
	]
}

module.exports = config