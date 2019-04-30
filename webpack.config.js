const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
// If its not test nor prodcution (set by heroku), than should be set to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
    // Brings in the variables from .env.test so they're accessible to us here
    require('dotenv').config({ path: '.env.test'});
} else if(process.env.NODE_ENV === 'development'){
    // Brings in the variables from .env.development so they're accessible to us here
    require('dotenv').config({ path: '.env.development'});
}

module.exports = (env) => {
 
    // Are we running production build?
    const isProduction = env === 'production';
    // To have a seprata CSS file for SASS compiled data
    const cssExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: cssExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,

                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            cssExtract,
            // Built in plugin
            new webpack.DefinePlugin({
                // Webpack looks through our project for string 'process.env.FIREBASE_API_KEY and replaces it with  the content pass to the variable below
                // All JSON.stringify does, in this case, is turn the variable into a json string: "'content'"
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, '/public'),
            historyApiFallback: true,    // This tells the browser that routing will happen client side. So fetch index.html on every call to the site (localhost:8080/* e.g)
            publicPath: '/dist/'         // Where we want the files to be served from
        }
    }
};