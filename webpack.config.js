/* eslint-disable */

const path = require('path');

const pipe = require('./js-utilities/pipe');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const TerserPlugin = require("terser-webpack-plugin");

            // minimize: true,
            // minimizer: [new TerserPlugin()],
module.exports = () => {

    const configProps = {
        // plugins: [
        //     new BundleAnalyzerPlugin()
        // ],
        optimization: {
            sideEffects: true,
            // splitChunks: {
            //     chunks: 'all'
            // },
        },
        entry: {
            main: "./assets/js/src/main.js",
            style: "./assets/scss/src/style.scss",
            admin: "./assets/js/src/admin.js",
            'admin-style': "./assets/scss/src/admin.scss",
        },
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules')
            ],
            // fallback: {

            // }
        },
        mode: process.env.NODE_ENV,
        module: {
            rules: [
                // {

                //     test: /.node$/,
                //     loader: 'node-loader'
                // },
                {
                    test: /\.scss$/,
                    use: [

                        {
                            loader: 'file-loader',
                            options: {
                                name: '../../scss/dist/[name].css',
                            },
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                implementation: require('sass'),
                                sassOptions: {
                                    includePaths: [
                                        path.resolve(__dirname, 'node_modules'), 
                                        path.resolve(__dirname, './assets/scss/src'),
                                        path.resolve(__dirname, './assets/scss/src/**')
                                    ],
                                },
                                webpackImporter: false,
                            },
                        }
                    ],
                },
                {
                    test: /\.js$/,
                    // exclude: [
                    //     path.resolve(__dirname, 'node_modules')
                    // ],
                    use: [{
                        loader: 'babel-loader',
                    }]
                }
            ],

        },
        output: {
            path: path.resolve(__dirname, './assets/js/dist')
        }
    };

    const parseNodeEnv = config => {

        switch (process.env.NODE_ENV) {
            case 'production':
                config.mode = 'production';
                break;
            case 'development':
                config.mode = 'development';
                config.devtool = 'inline-cheap-source-map';
                config.watch = true;
                break;
        }

        return config;
    };

    const parseBrowserEnv = config => {

        switch (process.env.BROWSERSLIST_ENV) {
            case 'modern':
                config.output.filename = '[name].modern.js';
                config.output.clean = true;
                config.module.rules[1].use[0].options = {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                esmodules: true
                            }
                        }]
                    ]
                };
                break;
            case 'legacy':
                config.output.filename = '[name].legacy.js';
                config.output.clean = true;
                config.module.rules[1].use[0].options = {
                    presets: [
                        ['@babel/preset-env', {
                            useBuiltIns: 'usage',
                            corejs: {
                                version: 3,
                                proposals: true
                            }
                        }]
                    ]
                };
                break;
        }

        return config;

    };

    const parseEnvs = pipe(parseNodeEnv, parseBrowserEnv);

    return parseEnvs(configProps);

};

// export default config;