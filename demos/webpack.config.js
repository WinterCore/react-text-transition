const path                       = require("path");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
	entry     : path.resolve(__dirname, "src", "app.js"),
    devtool : "sourcemap",
	module  : {
		rules : [
			{
                test    : /\.js$/,
                exclude : /node_modules/,
                use     : [{
                    loader: "babel-loader",
                    options : { plugins : ["react-hot-loader/babel"] }
                }]
            }, {
				test    : /\.styl$/,
				exclude : /node_modules/,
				use     : ["style-loader", "css-loader", "stylus-loader"]
			}
		]
	},
	output : {
        path       : path.resolve(__dirname, "public"),
        publicPath : "/",
        filename   : "bundle.min.js"
    },
    devServer: {
        publicPath         : "/",
        contentBase        : path.resolve(__dirname, "public"),
        port               : 8080,
        overlay            : true
    },
    plugins : [
        new WebpackBuildNotifierPlugin({
          title       : "Build succeeded!"
        })
    ]
};