var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports =

{
    name: 'server',
    target: 'node',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: '/',
        filename: 'app.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            { test: /\.js$/,
                loaders: [
                    'babel-loader'
                ]
            },
            { test:  /\.json$/, loader: 'json-loader' },
        ]
    },
    plugins: [
    ]
};
