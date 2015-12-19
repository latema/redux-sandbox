var path = require("path");

module.exports = {
    entry: {
        app: [
            "babel-polyfill",
            "./app/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015'] // removed 'react'
                }
            }
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }
};