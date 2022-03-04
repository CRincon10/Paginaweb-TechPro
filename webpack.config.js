const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");  
 
module.exports = {

 
    mode: 'development',
    output: {
        clean: true
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
            {   //para que evalue un archivo en concreto y tenemos que excluirlo del test anterior
                test: /styles.css$/i,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    // optimizacion: {},
    
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',     
        }),

        new MiniCssExtractPlugin ({
            filename: '[name].css',      //[name] para que use el mismo nombre que ya tiene y [fullhash] para que cree un nuevo hashs cada vez que hay un codigo nuevo
            ignoreOrder: false,           //para que ignore el orden de los estilos en caso de que no sean necesarios
            linkType: "text/css",
            // filename: 'newstyles.css',    //para darle un nuevo nombre al archivo
            
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}
