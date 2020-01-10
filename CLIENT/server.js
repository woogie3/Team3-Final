const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const parser = bodyParser.json();

const Users = require("./routes/Users");
app.use("/users", Users);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({ dest: './upload' })

app.use('/image', express.static('./upload'));



app.get('/api/showOthers/:show_id/:page', (req, res) => {
  const rowsPerPage = 3;
  let sql = 'select * from `show` where troup_id in(select troup_id from `show` where show_id = ?) limit ?,?'
  let show_id = req.params.show_id;
  let page = req.params.page
  let params = [show_id,rowsPerPage*page, rowsPerPage];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );

});
app.get('/api/showOthersAll/:show_id', (req, res) => {
  let sql = 'select * from `show` where troup_id in(select troup_id from `show` where show_id = ?)'
  let show_id = req.params.show_id;
  let params = [show_id];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/showAll/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  const rowsPerPage = 3;
  console.log(user_id);
  let params = [user_id,rowsPerPage];
  let sql = 'select * from `show`where not show_id in (select show_id from exclude_show where user_id = ?) limit 0,?';
  connection.query(
    sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/countShowAll/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  let params = [user_id];
  console.log(user_id);
  let sql = 'select * from `show` where not show_id in (select show_id from exclude_show where user_id = ?)';
  connection.query(
    sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/showAll/:user_id/:page', (req, res) => {
  const rowsPerPage = 3;
  let user_id = req.params.user_id;
  let page = req.params.page
  let sql =  'select * from `show` where not show_id in (select show_id from exclude_show where user_id = ?) limit ?,?';
  let params = [user_id,rowsPerPage*page, rowsPerPage];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );
});

// 

///

app.get('/api/showRomance/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  const rowsPerPage = 3;
  console.log(user_id);
  let params = [user_id,rowsPerPage];
  let sql = 'select * from `show`where not show_id in (select show_id from exclude_show where user_id = ?) and genre_id =1 limit 0,?';
  connection.query(
    sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/countShowRomance/:user_id', (req, res) => {
  let user_id = req.params.user_id;
  let params = [user_id];
  console.log(user_id);
  let sql = 'select * from `show` where not show_id in (select show_id from exclude_show where user_id = ? ) and genre_id =1';
  connection.query(
    sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/showRomance/:user_id/:page', (req, res) => {
  const rowsPerPage = 3;
  let user_id = req.params.user_id;
  let page = req.params.page
  let sql =  'select * from `show` where not show_id in (select show_id from exclude_show where user_id = ?) and genre_id =1 limit ?,?';
  let params = [user_id,rowsPerPage*page, rowsPerPage];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );
});


///
app.get('/api/prices/:show_id', (req, res) => {
  let show_id = req.params.show_id;
  let sql =  'select * from `audience_price` where show_id = ?';
  let params = [show_id];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/title/:show_id', (req, res) => {
  let show_id = req.params.show_id;
  let sql =  'select show_title from `show` where show_id = ?';
  let params = [show_id];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );
});

// 
app.get('/api/getWish/:user_id',(req, res) => {
  let user_id = req.params.user_id;
  let sql =  'select wishlist from `user` where user_id = ?';
  let params = [user_id];
  connection.query(sql,params,(err, rows, fields) => {
      res.send(rows);
    }
  );
});


app.get('/api/addWish/:show_id/:user_id',(req, res) => {
  let sql = 'update user set wishlist=ifnull(concat(wishlist,concat(",",?)),?) where user_id=?';
  console.log("aaaaa");
  let show_id = req.params.show_id;
  let user_id = req.params.user_id;
  let params = [show_id,show_id,user_id];
  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/exclude/:show_id/:user_id',(req, res) => {
  let sql = 'insert into exclude_show values(?,?)';
  let user_id = req.params.user_id;
  let show_id = req.params.show_id;
  let params = [user_id,show_id];
  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/showSelected/:show_id',(req, res) => {
  let sql = 'select * from `show` where show_id=?';
  let show_id = req.params.show_id;
  let params = [show_id];
  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/theater/:show_id',(req, res) => {
  let sql = "select t.latitude, t.longtitude from theater as t, troup as tr, `show` as s  where t.troup_id = tr.troup_id and tr.troup_id = s.troup_id and s.show_id=?";
  let show_id = req.params.show_id;
  let params = [show_id];
  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/showReview/:show_id',(req, res) => {
  let sql = 'select * from review as r join ticketing as t on r.ticketing_id = t.ticketing_id join `show` as s on t.show_id = s.show_id where s.show_id = ?';
  let show_id = req.params.show_id;
  let params = [show_id];
  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});


app.post('/api/insertReview', (req, res) => {
  let sql = 'insert into review values ((select * from (select ifnull(cast(count(review_id) as unsigned)+1,0) from review) as tmp),(select ticketing_id from ticketing as t '+
  'join user as u on t.user_id = u.user_id where u.user_id = ? and show_id=?),?,?,0,now())';
  let user_id = req.body.user_id;
  let show_id =  req.body.show_id;
  let review_content = req.body.review_content;
  let review_grade = req.body.review_grade;
  let params = [user_id,show_id,review_content,review_grade];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    }
  );
});

app.post('/api/ticket', (req, res) => {
  let sql = 'insert into ticketing values ((select * from ( select CAST(count(ticketing_id)+1 AS unsigned) from ticketing) as tmp),?,?,6,1,?,now(),"환불가능","페이",null,null)';
  let show_id =  req.body.show_id;
  let user_id = req.body.user_id;
  let price = req.body.price;
  let params = [show_id,user_id,price];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    }
  );
});

app.post('/api/audience', (req, res) => {
  let sql = 'insert into audience_count values ((select * from (select ifnull(max(audience_count_id),0) from audience_count) as tmp)+1,(select ticketing_id from ticketing as t join user as u on t.user_id = u.user_id where u.user_id = ? and show_id=?),?,?,?,?,?,?,?,?,?,?,?,?)';
  let user_id = req.body.user_id;
  let show_id =  req.body.show_id;
  let basic =  req.body.basic;
  let basicPrice =  req.body.basicPrice;
  let child =  req.body.child;
  let childPrice =  req.body.childPrice;
  let senior =  req.body.senior;
  let seniorPrice =  req.body.seniorPrice;
  let disabled =  req.body.disabled;
  let disabledPrice =  req.body.disabledPrice;
  let merit =  req.body.merit;
  let meritPrice =  req.body.meritPrice;
  let etc =  req.body.etc;
  let etcPrice =  req.body.etcPrice;
  let params = [user_id,show_id,basic,basicPrice,child,childPrice,senior,seniorPrice,disabled,disabledPrice,merit,meritPrice,etc,etcPrice];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    }
  );
});

app.get('/api/informations',(req,res) => {
  connection.query(
    'select * from `user` left outer join `exclude_show` on user.user_id = exclude_show.user_id',
    (err,rows,fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/ClientInformation/:user_id',(req,res) => {
  let sql ='select `password` from `user` where `user_id`= ?';
  let user_id = req.params.user_id;
  let params = [user_id]
  connection.query(
  sql,params,
(err,rows,fields) => {
      res.send(rows);
    }
  );
});

app.post('/api/modifyUser',(req,res) => {
  console.log("변경");
  let sql ='update user set name=?,password=?,email=?,phone=? where user_id=?'; 
  let user_id = req.body.user_id;
  let name = req.body.name;
  // let password = req.body.password;
  let password = "$2b$10$YVKsjF9GC/dU0aWCER3YTeNU9KvHXOryXFArkKqEhFk5OW26IXAwq";
  let email = req.body.email;
  let phone = req.body.phone;
  params = [name,password,email,phone,user_id];
  connection.query(
    sql,params,
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

app.get('/api/checkWish/:user_id',(req,res) => {
  let sql = 'select wishlist from `user` where user_id = ?';
  let user_id = req.params.user_id;
  let params = [user_id,show_id];
  connection.query(
    sql,params,
    (err,rows,fields) => {
      res.send(rows);
    }
  )
});


app.post('/api/QNAS',parser,(req,res)=>{
  let sql = "INSERT INTO `QNA` (`group_number`, `order`, `depth`, `QnA_title`, `QnA_content`, `QnA_date`, `user_id`) values((select MAX(q.`group_number`) FROM `QNA` AS q)+1, 0, 0, ? , ?, NOW(), ?)"
    let QnA_title = req.body.QnA_title;
    let QnA_content = req.body.QnA_content;
    let user_id = req.body.user_id;
  let params = [QnA_title, QnA_content, user_id];

  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(params);
    })
});

app.post('/api/QNASS/:QnA_id',(req,res) => {
  let sql = 'update `QNA` set `QnA_title` =?, `QnA_content` = ?  where `QnA_id` =?'
  let QnA_title = req.body.QnA_title;
  let QnA_content = req.body.QnA_content;
  let QnA_id = req.body.QnA_id;
  let params = [QnA_title, QnA_content, QnA_id];
  console.log(params)
  connection.query(sql,params,
  (err,rows,fields) => {
      res.send(rows);
   }
 )
});

app.get('/api/QNAS',(req,res) => {
  connection.query(
  'SELECT `QnA_id`,  `QnA_title`, `QnA_content`, `user_id`, `QnA_date`, `QnA_views` FROM `QNA` ORDER BY `group_number` DESC, `order` ASC, `depth` ASC',
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

app.delete('/api/QNAS/:QnA_id',(req,res) => {
  let params = [req.params.QnA_id]
  connection.query(
  'delete from `QNA` where `QnA_id` = ?',params,
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

app.get('/QNADetail/:QnA_id',(req,res,err) => {
  let sql =  'select `QnA_id`,  `QnA_title`, `QnA_content`, `user_id`, `QnA_date`, `QnA_views` from `qna` where `QnA_id` =?';
  let params = [req.params.QnA_id];
  connection.query(sql,params,(err,rows,fields) => {
    if(err){
      return res.send(err);
    }else{
      return res.send(rows);
    }
  })
});

app.get('/api/myshows/:user_id',(req,res) => {
  const sql = 'select * from `ticketing` where user_id = ?';
  let user_id = req.params.user_id
  let params = [user_id]
  connection.query(
  sql,params,
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

app.get('/api/myshowupdate/:ticketing_id',(req,res) => {
  let sql = "update `ticketing` set  `refund_flag` = '환불완료' ,refund_apply_date = now() where ticketing_id = ?";
  let ticketing_id = req.params.ticketing_id;
  let params = [ticketing_id];
  connection.query(sql,params,(err,rows,fields) => {
      res.send(rows);
   }
  )
});

app.get('/api/myshowselect',(req,res) => {
  connection.query(
    'select `refund_flag` from `ticketing`',
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});


app.get('/api/showUser/:user_id',(req,res) => {
  let sql = 'select* from user where user_id = ?';
  let user_id = req.params.user_id;
  let params = [user_id];
  connection.query(
    sql,params,
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

app.listen(port, () => console.log(`Listening on port ${port}`));
