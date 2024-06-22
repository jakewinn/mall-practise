let config = {
    mchid: '16*******9', //商户号
    publicKey: '/key/apiclient_cert.pem', //公钥，绝对路径
    privateKey: '/key/apiclient_key.pem', //私钥，绝对路径
    system_url: 'http://127.0.0.1:3200', //系统域名
    key: 'as*********23', //APIv3密钥
    appid: 'wxba5706fc5fe96e77', //小程序appid
    secret: '05bbe58c28e81b211a67197459fb8a26' //小程序后台管理的secret，可登录小程序后台查看
}

module.exports = config;