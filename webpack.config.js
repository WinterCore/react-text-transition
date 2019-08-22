const path = require("path");

module.exports = {
	entry     : "./src/index.js",
	externals : {
		react : {
			commonjs  : "react",
			commonjs2 : "react",
			amd       : "react",
			root      : "React"
		},
		"prop-types" : {
			commonjs  : "prop-types",
			commonjs2 : "prop-types",
			amd       : "prop-types",
			root      : "PropTypes"
		}
	},
	module : {
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
					plugins : ["@babel/plugin-proposal-object-rest-spread"]
				}
			}, {
				test    : /\.styl$/,
				exclude : /node_modules/,
				loader  : ["style-loader", "css-loader", "stylus-loader"]
			}
		]
	},
	output : {
		path          : path.join(__dirname, "dist"),
		filename      : "index.js",
		library       : "TextTransition",
		libraryTarget : "umd"
	}
};