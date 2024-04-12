
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        
        proxy: {
            '/api':{
                target:'http://cjt1314.top:8080/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        },
 
    }
}