// const path = require('path');

module.exports = {
    // configureWebpack: {
    //     devServer: {
    //         proxy: {
    //             '/api': {
    //                 target: 'http://localhost:5000'
    //             },
    //         },
    //     },
    // },
    publicPath: '/gtsa/',
    // devServer: {
    //     proxy: 'http://localhost:5000'
    // },
    devServer: {
        proxy: {
            '^/': {
                target: 'http://localhost:5000/',
                ws: false,
                changeOrigin: true,

            }
        }
    },
}