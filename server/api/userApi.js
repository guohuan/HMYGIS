var express = require('express');
var router = express.Router();
var models = require('../db.js');
var $sql = require('../sqlMap');
var pg = require('pg');


// /* * * * * * * * * * 
//  * * * * * * * * * 
//  * 使用连接池 
//  * * * * * * * * * 
//  * * * * * * * * */
// // 
// //连接池 start
// // 
// // 数据库配置
// var config = {
//   user: models.postgresql.user,
//   database: models.postgresql.database,
//   password: models.postgresql.password,
//   host: models.postgresql.host,
//   port: models.postgresql.port,
//   // 扩展属性
//   max: 20, // 连接池最大连接数
//   idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
// }
// // 创建连接池
// var pool = new pg.Pool(config);
// // 查询
// pool.connect(function (err, client, done) {
//   if (err) {
//     return console.error('数据库连接出错', err);
//   }
//   // 简单输出个 Hello World
//   client.query('SELECT $1::varchar AS OUT', ["Hello World"], function (err, result) {
//     done();// 释放连接（将其返回给连接池）
//     if (err) {
//       return console.error('查询出错', err);
//     }
//     console.log(result.rows[0].out); //output: Hello World
//   });


//   client.query('SELECT * FROM public.user', function (err, data) {
//     if (err) {
//       return console.error('查询失败', err);
//     } else {
//       // console.log('成功',data.rows); 
//       console.log('成功', JSON.stringify(data.rows));
//     }
//     // client.end();
//   });
// });

// 
//连接池 end
// 



/* * * * * * * * * * 
 * * * * * * * * * 
 * 直连客户端 
 * * * * * * * * * 
 * * * * * * * * */
// 
//直连客户端 start
// 
// var connString = "postgres://username:password@localhost:port/databaseName";
// var connString = "postgres://postgres:123456@192.168.1.234:5432/postgres"
var connString = "postgres://" + models.postgresql.user + ":" + models.postgresql.password + "@" + models.postgresql.host + ":" + models.postgresql.port + "/" + models.postgresql.database;
var client = new pg.Client(connString);
// client.connect(function (isErr) {
//   if (isErr) {
//     console.log('connect postgresql error:' + isErr.message);
//     client.end();
//   }
//   console.log('connect postgresql database(' + models.postgresql.database + ') success!');
//   client.query('SELECT id, name, "userType", remark, "aliseName" FROM public.user', [], function (isError, result) {
//     if (isError) {
//       console.log('query error:' + isError.message);
//     } else {
//       console.log('query success,data is:' + JSON.stringify(result.rows));
//     }
//     client.end();
//   })
// });
// 
//直连客户端 end
// 

var jsonWrite = function (res, result) {
  if (typeof result === 'undefined') {
    res.JSON({
      code: '1',
      msg: '操作失败！'
    });
  } else {
    res.JSON(result);
  }
}

router.post('/addUser', (req, res) => {
  var addSql = $sql.user.add;
  var params = req.body;
  console.log(params);
  // client.query(addSql, [params.id, params.name,params.usertype, params.aliseName, params.remark], function (isError, result) {
  //   if (isError) {
  //     console.log('insert record error:' + isError.message);
  //   } else {
  //     console.log('insert record success,data is:' + JSON.stringify(result.rows));
  //     jsonWrite(res, result);
  //   }
  //   client.end();
  // });
  
  client.connect(function (isErr) {
    if (isErr) {
      console.log('connect postgresql error:' + isErr.message);
      client.end();
    }
    console.log('connect postgresql database(' + models.postgresql.database + ') success!');
    client.query(addSql, [params.id, params.name,params.userType, params.aliseName, params.remark], function (isError, result) {
      console.log(addSql,params);
      if (isError) {
        console.log('insert record error:' + isError.message);
      } else {
        console.log('insert record success,data is:' + JSON.stringify(result));
        // jsonWrite(res, result);
      }
      client.end();
    })
  });


});

router.post('/GetUser', (req, res) => {
  var sql = $sql.user.select;
  var params = req.body;
  console.log(params);
  // client.query(sql, [], function (isError, result) {
  //   if (isError) {
  //     console.log('query record error:' + isError.message);
  //   } else {
  //     console.log('query record success,data is:' + JSON.stringify(result.rows));
  //     jsonWrite(res, result);
  //   }
  //   client.end();
  // });

  client.connect(function (isErr) {
    if (isErr) {
      console.log('connect postgresql error:' + isErr.message);
      client.end();
    }
    console.log('connect postgresql database(' + models.postgresql.database + ') success!');
    client.query(sql, [], function (isError, result) {
      if (isError) {
        console.log('query record error:' + isError.message);
      } else {
        console.log('query record success,data is:' + JSON.stringify(result.rows));
        // jsonWrite(res, result);
        return JSON.stringify(result.rows);
      }
      client.end();
    })
  });

});



module.exports = router;
