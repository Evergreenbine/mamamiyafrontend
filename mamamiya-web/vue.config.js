var webpack = require('webpack');
module.exports = {
    devServer: {
        port: 8000,
        // proxy: 'http://localhost:8002'
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            }),
        ]
    }
}