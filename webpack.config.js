const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname, 'app/index.js')
	],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.tpl.html',
			inject: 'body',
			filename: './index.html'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ['@babel/preset-env', '@babel/react']
				}
			}
		}, {
			test: /\.css$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}]
		}, {
			test: /\.less$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "less-loader" // compiles Less to CSS
			}]
		}]
	}
}