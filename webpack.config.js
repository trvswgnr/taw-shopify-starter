// Require path.
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Configuration object.
const config = {

	// Create the entry points.
	// One for frontend and one for the admin area.
	entry: ['./src/js/index.js', './src/sass/theme.scss'],

	// Setup a loader to transpile down the latest and great JavaScript so older browsers
	// can understand it.
	module: {
		rules: [
			{
				// Look for any .js files.
				test: /\.js$/,
				// Exclude the node_modules folder.
				exclude: /node_modules/,
				// Use babel loader to transpile the JS files.
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env"]
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts',
							publicPath: "../fonts", // Take the directory into account
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img',
							publicPath: "../img", // Take the directory into account
						}
					},
				],
			},
			{
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader, {
						loader: 'css-loader', // translates CSS into CommonJS modules
					}, {
						loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function () { // post css plugins, can be exported to postcss.config.js
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					}, {
						loader: 'sass-loader' // compiles Sass to CSS
					}]
			},
		]
	}
}

module.exports = (env, argv) => {
	const isProd = (argv.mode === 'production');
	const jsFile = 'index.js';
	const cssFile = 'theme.css';

	config.plugins = [
		new MiniCssExtractPlugin({
			filename: cssFile,
			chunkFilename: "[id].css"
		})
	];

	// Create the output files.
	// One for each of our entry points.
	config.output = {
		// [name] allows for the entry object keys to be used as file names.
		filename: jsFile,
		// Specify the path to the JS files.
		path: path.resolve(__dirname, 'assets')
	};

	return config;
};
