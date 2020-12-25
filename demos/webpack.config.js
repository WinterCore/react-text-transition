const path                       = require("path");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
	entry   : path.resolve(__dirname, "src", "app.js"),
	devtool : "source-map",
	module  : {
		rules : [
			{
				test    : /\.jsx?$/,
				exclude : /node_modules/,
				loader  : "babel-loader",
				options : {
					presets : [
						"@babel/preset-react",
						[
							"@babel/preset-env",
							{
								targets : {
									browsers : [
										">0.2%",
										"not dead",
										"not ie <= 11",
										"not op_mini all"
									]
								},
								modules : false
							}
						]
					],
					plugins : ["@babel/plugin-proposal-object-rest-spread", "react-hot-loader/babel"]
				}
			}
		]
	},
	output : {
		path       : path.resolve(__dirname, "public"),
		publicPath : "/",
		filename   : "bundle.min.js"
	},
	devServer : {
		publicPath  : "/",
		contentBase : path.resolve(__dirname, "public"),
		port        : 8080,
		overlay     : true
	},
	plugins : [
		new WebpackBuildNotifierPlugin({
			title : "Build succeeded!"
		})
	]
};