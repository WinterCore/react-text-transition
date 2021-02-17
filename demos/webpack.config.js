const path = require("path");

module.exports = {
    entry   : path.resolve(__dirname, "src", "app.tsx"),
    devtool : "source-map",
    module  : {
        rules : [
            {
                test    : /\.tsx?$/,
                exclude : /node_modules/,
                use     : [{
                    loader  : "ts-loader",
                    options : {
                        context                 : path.resolve(__dirname, ".."),
                        onlyCompileBundledFiles : true,
                        configFile              : path.resolve(__dirname, "tsconfig.json")
                    }
                }]
            },
            {
                test    : /\.styl$/,
                exclude : /node_modules/,
                use     : ["style-loader", "css-loader", "stylus-loader"]
            }
        ]
    },
    resolve : {
        extensions : [".ts", ".tsx", ".js", ".jsx"],
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
    }
};