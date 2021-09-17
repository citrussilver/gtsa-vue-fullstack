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
    devServer: {
        proxy: 'http://localhost:5000'
    }
}