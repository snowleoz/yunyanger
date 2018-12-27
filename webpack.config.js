const path = require('path');
const Webpack = require('webpack');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const Cssnext = require('postcss-cssnext');
const PurifyCss = require('purifycss-webpack');
const Glob = require('glob-all');
const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        'index': path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.[hash:5].js',
        chunkFilename: '[name].bundle.[hash:5].js',
        publicPath: '/'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
        'axios': 'axios',
        'antd': 'antd'
    },
    resolve: {
        alias: {
            view: path.resolve(__dirname, './src/view')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ],
                        plugins: [
                            [
                                'import', {
                                    'libraryName': 'antd',
                                    'libraryDirectory': 'es',
                                    'style': 'css'
                                }
                            ],
                            ['@babel/plugin-syntax-dynamic-import']
                        ]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: loader => [Cssnext({
                                        features: {
                                            rem: false
                                        },
                                        browser: ['>1%', 'last 10 versions', 'not ie <= 8']
                                    })]
                            }
                        }
                    ]
                })
            }, {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: 'images/[name].[ext]'
                    }
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2|otf)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 2048,
                        name: 'font/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            chunks: ['index'],
            favicon:'./src/favicon.ico'
        }),
        // new Webpack.optimize.CommonsChunkPlugin({name:'vendor',minChunks:Infinity}),
        new ExtractTextWebpackPlugin('css/[name].[hash:5].css'),
        new PurifyCss({
            paths: Glob.sync([
                path.resolve(__dirname, 'src/*.js'),
                path.resolve(__dirname, 'src/*.html'),
                path.resolve(__dirname, 'src/**/*.js'),
                path.resolve(__dirname, './node_modules/antd/dist/*.js')
            ]),
            minimize: true
        }),
        new Webpack
            .optimize
            .ModuleConcatenationPlugin({}),
        new Webpack
            .optimize
            .UglifyJsPlugin({
                parallel: 4,
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        warnings: false
                    }
                },
                cache: true
            }),
        new tinyPngWebpackPlugin({
            key: 'TikTGmc9mJvMI4xHe2QpQb9lL2vRoqQP',
            ext: ['png', 'jpeg', 'jpg']
        }),
        new CleanWebpackPlugin(['dist']),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8181,
        compress: true,
        watchContentBase: true,
        historyApiFallback: true,
        host: '0.0.0.0'
    }
}