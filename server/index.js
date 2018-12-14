const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const userApi = require('./api/userApi');
const userApi1 = require('./api/userApi1');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
    //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    if (req.method == 'OPTIONS') {
      res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    }
    else {
      next();
    }
    // next();
  });


// app.use(cors({
//     origin: ['http://127.0.0.1:3000'], // 这是本地的默认地址和端口，vue启动的项目就是在这里，这样保证了等会我们在浏览器能访问服务器的数据     
//     methods: ["GET", "POST"],
//     alloweHeaders: ["Content-Type", "Authorization"]
// })
// );
    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// 后端api路由
app.use('/api/user',userApi1);

// app.set('port',3000);

// 监听
app.listen(3000);
console.log('success listen at port:3000......');