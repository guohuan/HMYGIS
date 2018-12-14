var express = require('express');
var router = express.Router();
var models = require('../db.js');
var $sql = require('../sqlMap');
var pg = require('pg');


/* * * * * * * * * * 
 * * * * * * * * * 
 * 使用连接池 
 * * * * * * * * * 
 * * * * * * * * */
// 
//连接池 start
// 
// 数据库配置
var config = {
    user: models.postgresql.user,
    database: models.postgresql.database,
    password: models.postgresql.password,
    host: models.postgresql.host,
    port: models.postgresql.port,
    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}
// 创建连接池
var pool = new pg.Pool(config);

console.log("pool.totalCount:" + pool.totalCount);
console.log("pool.idleCount:" + pool.idleCount);
console.log("pool.waitingCount:" + pool.waitingCount);

// ; (async function () {
//     //在连接池中创建客户端
//     var client = await pool.connect();
//     console.log("pool.totalCount:" + pool.totalCount);
//     console.log("pool.idleCount:" + pool.idleCount);
//     console.log("pool.waitingCount:" + pool.waitingCount);
//     // 查询
//     await client.query('SELECT * FROM public.user', function (err, data) {
//         if (err) {
//             return console.error('查询失败', err);
//         } else {
//             console.log('成功', JSON.stringify(data.rows));
//         }
//     });

//     //通知连接池销毁客户端
//     client.release();
//     console.log("pool.totalCount:" + pool.totalCount);
//     console.log("pool.idleCount:" + pool.idleCount);
//     console.log("pool.waitingCount:" + pool.waitingCount);
// })();

// 
//连接池 end
// 




var jsonWrite = function (res, result) {
    if (typeof result === 'undefined') {
        JSON.stringify({
            code: '1',
            msg: '操作失败！'
        });
    } else {
        // JSON.stringify(result);
        JSON.stringify({
            code: '0',
            msg: '操作成功！',
            data:result,
        });
        console.log("result:" +  JSON.stringify({code: '0',msg: '操作成功！',data:result,}));
    }
}

router.post('/addUser', (req, res) => {
    var addSql = $sql.user.add;
    var params = req.body;
    console.log(params);

    ; (async function () {
        //在连接池中创建客户端
        var client = await pool.connect();
        // console.log("pool.totalCount:" + pool.totalCount);
        // console.log("pool.idleCount:" + pool.idleCount);
        // console.log("pool.waitingCount:" + pool.waitingCount);
        // 查询
        await client.query(addSql, [params.id, params.name, params.userType, params.aliseName, params.remark], function (err, result) {
            if (err) {
                console.log('insert record error:' + err.message);
            } else {
                console.log('insert record success,data is:' + JSON.stringify(result));
             return   jsonWrite(res, result);
            }
        });

        //通知连接池销毁客户端
        client.release();
        // console.log("pool.totalCount:" + pool.totalCount);
        // console.log("pool.idleCount:" + pool.idleCount);
        // console.log("pool.waitingCount:" + pool.waitingCount);
    })();

    console.log("pool.totalCount:" + pool.totalCount);
    console.log("pool.idleCount:" + pool.idleCount);
    console.log("pool.waitingCount:" + pool.waitingCount);
}

);

router.post('/GetUser', (req, res) => {
    var sql = $sql.user.select;
    var params = req.body;
    console.log(params);


    ; (async function () {
        //在连接池中创建客户端
        var client = await pool.connect();
        // console.log("pool.totalCount:" + pool.totalCount);
        // console.log("pool.idleCount:" + pool.idleCount);
        // console.log("pool.waitingCount:" + pool.waitingCount);
        // 查询
        await client.query(sql, [], function (err, result) {
            if (err) {
                console.log('query record error:' + err.message);
            } else {
                console.log('query record success,data is:' + JSON.stringify(result));
                jsonWrite(res, result);
            }
        });

        //通知连接池销毁客户端
        client.release();
        // console.log("pool.totalCount:" + pool.totalCount);
        // console.log("pool.idleCount:" + pool.idleCount);
        // console.log("pool.waitingCount:" + pool.waitingCount);
    })();

});



module.exports = router;
