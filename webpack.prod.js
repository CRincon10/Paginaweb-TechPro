
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");  

const CssMinimizer = require("css-minimizer-webpack-plugin");   //estas dos constantes son para minimizar el codigo del css
const Terser       = require("terser-webpack-plugin");
 
module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'    //defino el nombre del archivo de Js del area de distribucion con el hash
    },
   
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    
                    sources: false,             
                }
            },
            {
                test: /\.css$/, 
                exclude: /styles.css$/,
                use:['style-loader','css-loader']
            },
            {   
                test: /styles.css$/i,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }




        ]
    },
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser()
        ]
    },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',     
        }),

        new MiniCssExtractPlugin ({
            filename: '[name].[fullhash].css',      
            ignoreOrder: false,           
            linkType: "text/css",
            
            
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}
