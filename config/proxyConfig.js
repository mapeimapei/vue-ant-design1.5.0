/*
 * vue-cli本地环境API代理proxyTable
*/
module.exports = {
  proxy:{
    '/proxyApi': { //将www.exaple.com映射为/apis
      target: 'http://127.0.0.1:9000', //接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/proxyApi': '' //需要rewrite的，
      },
      secure: false,
      headers: {
        Referer: 'http://127.0.0.1:9000',
      }
    }
  }
}
