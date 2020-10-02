const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: `./js/index.js`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `bundle.js`
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'libs')
            ],            
            use: [
            ],
        },         
        {
            test: /\.css$/, 
            use: [
                'style-loader',
                'css-loader',
            ],
        },    
        {
            test: /\.(png|svg|jpg|gif)$/,
            include: [
                path.resolve(__dirname, 'images'),
                path.resolve(__dirname, 'css', "images"),
            ],                        
            use: [
              'file-loader',
            ],
        },            
      ]
    },
    devtool: 'source-map',
  };