const path = require('path');

const popupConfig = {
	entry: './src/popup.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
	output: {
		filename: 'popup.js',
		path: path.resolve(__dirname, 'dist'),
	},
};

const backgroundConfig = {
	entry: './src/background.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
	output: {
		filename: 'background.js',
		path: path.resolve(__dirname, 'dist'),
	},
};

const contentConfig = {
	entry: './src/content.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
	output: {
		filename: 'content.js',
		path: path.resolve(__dirname, 'dist'),
	},
};

module.exports = [popupConfig, backgroundConfig, contentConfig];
