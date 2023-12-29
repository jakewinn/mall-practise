const express = require('express');
const cors = require('cors');
const app = express();
var { expressjwt } = require("express-jwt");


//配置跨域
app.use(cors());

//配置解析token的中间件
app.use(expressjwt({
    secret: 'moyc^_^',
    algorithms: ['HS256']
}).unless({
    path: [/\/api\/public\//, /\/public\//,
        /\/admin\/login/, /\/api\/login/,
        /\/api\/bindPhone/, '/api/purchase/notify', '/admin/order/notify_refund']
}));

//挂载静态资源
app.use('/public', express.static('public'));

//解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 引入并且挂载路由
app.use(require('./router.js'))

// 定时任务
const cron = require('node-cron');
const { closeTimeoutOrders } = require('./closeOrder.js'); // 用于关闭订单的函数

require('./get_access_token.js');

// 每分钟检查一次超时订单
cron.schedule('* * * * *', () => {
    closeTimeoutOrders();
});

//每两小时更新一次token
cron.schedule('0 */2 * * *', () => {
    require('./get_access_token.js');
});

//全局错误处理中间件
app.use((err, req, res, next) => {
    //token验证为通过
    if (err.name === 'UnauthorizedError') {
        res.send({ code: 403, msg: '非法请求' })
        //数据库错误
    } else if (err.name == 'DatabaseError') {
        res.send({ code: err.status, msg: err.message })
    } else if (err.name == 'ECONNREFUSED') {
        res.send({ code: 504, msg: '数据库链接失败' })
        //其他错误
    } else {
        console.log('----ERROR: ' + err.message);
        res.send({ code: 500, msg: '服务器错误' })
    }
})

//启动服务器
app.listen(3200, () => {
    console.log('Service started successfully, running on http://localhost:3200');
})