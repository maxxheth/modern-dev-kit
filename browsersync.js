/* global require, setInterval */
/* eslint-disable */

const browsersync = require('browser-sync').create();

const reload = browsersync.reload;

const onChangePaths = [

    {
        fileDir: '*.php', 
        event: 'change'
    },
    {
        fileDir: './**/*.php',
        event: 'change'
    },
    {
        fileDir: './**/**/*.php',
        event: 'change'
    },
    {
        fileDir: './**/**/**/*.php',
        event: 'change'
    },
    {
        fileDir: './assets/js/dist/*.js',
        event: 'change'
    },
    {
        fileDir: './assets/scss/dist/*.css',
        event: 'change'
    },


];

const vendorRegex = /vendor/g;

const nodeModuleRegex = /node_modules/g;

const negTest = (regex) => (path) => !regex.test(path);

onChangePaths.forEach(pathObj => {

    const {
        fileDir,
        event
    } = pathObj;

    const vendorNegTest = negTest(vendorRegex);

    const nodeModuleNegTest = negTest(nodeModuleRegex);

    if (vendorNegTest(fileDir) && nodeModuleNegTest(fileDir)) {

        browsersync.watch(fileDir).on(event || 'change', reload);

    }

});

browsersync.init({

    namespace: function (namespace) {

        return 'localhost:3000' + namespace;

    },

    injectChanges: false,

});