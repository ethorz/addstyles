var webpack = require('webpack');
var path    = require('path');

module.exports = {
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'src/')
                ],
                exclude: /\.html?$/,
                query: {
                    presets: 'es2015'
                }
            }
        ]
    }
}