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
                    plugins: ['transform-runtime', 'transform-react-jsx'],
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }
};