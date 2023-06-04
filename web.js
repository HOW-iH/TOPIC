let express = require('express');
let path = require('path');
  //1.載入express模組
let app = express();
  // 2.使用express
app.get('/', function (req, res) {
  console.log("Connect to /!!");
    res.sendFile(path.join(__dirname,'./TOPIC/index.html'));
})
  // 5.首頁
let port = 3000;
  //3.設定port位置
app.listen(port);
  // 4.監聽 port