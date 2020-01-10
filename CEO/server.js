const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const parser = bodyParser.json();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(parser);

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({dest: './upload'})

const Users = require("./routes/Users");
app.use("/users", Users);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password:conf.password,
  port:conf.port,
  database: conf.database
});
connection.connect();
{/* 예매내역 */}
//조회
app.get('/api/ticketings',(req,res) => {
    connection.query(
      "select u.`name`, t.user_id, t.ticketing_id, u.phone, s.show_title, sd.show_time, bs.`key`, t.ticketing_date from `ticketing` t left join `user` u on t.user_id = u.user_id left join `show` s on t.show_id = s.show_id left join `show_date` sd on s.show_id = sd.show_id left join `book_seat` bs on t.ticketing_id = bs.ticketing_id where t.refund_flag='환불가능'",
      (err,rows,fields) => {
        res.send(rows);
      }
    );
});
//변경
app.post('/ticketing/changeSeat', parser,(req, res) => {
  let sql = "update book_seat bs, ticketing t set bs.`key`=concat(?,concat(?,?)), bs.`row` = ?, bs.`column` = ? WHERE bs.ticketing_id = t.ticketing_id and t.ticketing_id=?"
  let id1 = req.body.ticket_id;
  let row1 = req.body.row;
  let column1 = req.body.column;
  let row2 = req.body.row;
  let column2 = req.body.column;
  let id2 = req.body.ticket_id;
  let params = [id1, row1, column1, row2, column2, id2];
  console.log(params);
  connection.query(sql, params,
  (err, rows, fields) => {
  res.send(rows);
  }
)
});
app.post('/ticketing/changeAll', parser,(req, res) => {
  let sql = 'update ticketing t inner join book_seat on bs.ticketing_id = t.ticketing_id set t.show_date_id = ?, t.ticketing_date = sysdate(), bs.key=(concat(?,concat(?,?)), bs.row=?, bs.column=? where t.ticketing_id = ?';
  let show_time = req.body.show_time;
  let id1 = req.body.id;
  let row1 = req.body.row;
  let column1 = req.body.column;
  let row2 = req.body.row;
  let column2 = req.body.column;
  let id2 = req.body.id;
  let params = [show_time, id1, row1, column1, row2, column2, id2];
  connection.query(sql, params,
  (err, rows, fields) => {
  res.send(rows);
  }
)
});

//검색
app.post(`/api/ticketings/:phone`,(req,res) => {
  let sql = 'SELECT * FROM showdb.ticketing where user_id = (select user_id FROM showdb.user WHERE phone = ?)'
  let params =[req.params.phone];
  connection.query(sql, params,
    (err, rows, fields) => {
    res.send(rows);
    }
  )});

  // id삭제버튼 클릭시
  // app.delete('/api/ticketings/:id', (req, res) => {
  //   let sql = 'UPDATE user SET isDeleted = 1 WHERE id = ?';
  //   let params = [req.params.id];
  //   connection.query(sql, params,
  //   (err, rows, fields) => {
  //   res.send(rows);
  //   }
  // )
  // });
// 계정생성 
// app.post('/api/ticketings', upload.single('image'),(req,res) => {
//   let sql = 'INSERT INTO user VALUES (null,?,?,?,?,?,now(),0)';
//   let image = '/image/' + req.file.filename;
//   let name = req.body.name;
//   let birthday = req.body.birthday;
//   let gender = req.body.gender;
//   let job = req.body.job;
//   let params = [image,name,birthday,gender,job];
//   connection.query(sql,params,
//       (err,rows,fields) => {
//         res.send(rows);
//       }
//     );
// });

{/* 환불내역 */}
// 조회
app.get('/api/refunds',(req,res) => {
  connection.query(
    "select t.user_id, u.`name`, s.show_title, sd.show_time, t.ticketing_id, t.payment_type, r.reason_type, u.phone from `show` s left join ticketing t on s.show_id = t.show_id left join `user` u on t.user_id = u.user_id left join reason r on r.reason_id = t.reason_id left join show_date sd on sd.show_id = t.show_id where t.refund_flag='환불완료'",
    (err,rows,fields) => {
      res.send(rows);
    }
  );
});
// 환불 입력
// app.post('/api/refunds/:id', (req, res) => {
//   let sql = 'UPDATE ticketing t inner join book_seat bs on bs.ticketing_id = t.ticketing_id set t.refund_flag = \'yes\', t.refund_date = sysdate(), t.refund_apply_date = sysdate(), bs.row = null, bs.column = null where t.ticketing_id = ?';
//   let params = [req.params.id];
//   connection.query(sql, params,
//   (err, rows, fields) => {
//   res.send(rows);
//   }
// )
// });
// 환불 적용
app.post('/api/refunds/:ticketing_id', (req, res) => {
  let sql = 'UPDATE book_seat bs, ticketing t set t.refund_flag="환불완료" , t.refund_date=sysdate(), bs.`key`=null, bs.`row`=null, bs.`column`=null, bs.ticketing_id=null WHERE t.ticketing_id=bs.ticketing_id and t.ticketing_id = ?';
  let params = [req.params.ticketing_id];
  console.log(params);
  connection.query(sql, params,
  (err, rows, fields) => {
  res.send(rows);
  }
)
});

//전체 좌석 행열조회
app.get('/ticketing/seats', (req, res) => {
  connection.query(
    // "select th.entire_row, th.entire_column from theater th inner join `show` s on th.troup_id = s.show_id join ticketing t on t.show_id = s.show_id where t.ticketing_id",
    "select th.entire_row, th.entire_column from theater th inner join `show` s on th.troup_id = s.show_id join ticketing t on t.show_id = s.show_id where t.ticketing_id='1'",
    (err,rows,fields) => {
      res.send(rows);
    }
  );
});




app.use('/show_thumbnail', express.static('./upload'));

//리뷰 조회
app.get('/api/reviewManagement',(req,res) => {
  connection.query(
    "select s.show_title, t.user_id, r.review_content, r.review_report_yn from ticketing t, review r, `show` s where t.ticketing_id = r.ticketing_id and s.show_id = t.show_id and review_report_yn = 0",
    (err,rows,fields) => {
      res.send(rows);
    }
  );
});


//리뷰 신고
app.delete('/api/reviewManagement/:review_content',(req, res) => {
  let sql = 'UPDATE review SET review_report_yn = 1 WHERE review_content = ?';
  let params = [req.params.review_content];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
});


//극단 조회
app.post('/api/troupManagement',(req,res) => {
  let sql="select t.user_id, t.troup_name, t.troup_phone, t.bank_name, t.bank_account, t.kakao_account, t.seat_yn, th.troup_id, th.theater_name, th.theater_location, th.latitude, th.longtitude from troup t, theater th where t.troup_id = th.troup_id and user_id=?";
  let user_id =req.body.user_id;
  let params=user_id;
  
  console.log("aaaa"+user_id);
  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
    })
   
  });



//극단테이블 등록
app.post('/api/troupManagementAdd1',parser,(req,res)=>{
  let sql ='INSERT INTO `troup` VALUES ((select max(troup_id) from troup alias_for_subquery where troup_id = troup_id) +1 ,?, ?, ?, ?, ?, ?, ?)';

  let user_id = req.body.user_id;
  let troup_name = req.body.troup_name;
  let troup_phone = req.body.troup_phone;
  let bank_name = req.body.bank_name;
  let bank_account = req.body.bank_account;
  let kakao_account = req.body.kakao_account;
  let seat_yn = req.body.seat_yn;

  
  let params=[user_id, troup_name, troup_phone, bank_name, bank_account, kakao_account, seat_yn];
  
  connection.query(sql,params,(err,rows,fields) => {
    res.send(rows);
    console.log(err);
  }
  )  
  });

  //극장테이블 등록
  app.post('/api/troupManagementAdd2',parser,(req,res)=>{
    let sql ='INSERT INTO `showDB`.`theater` (`theater_id`, `troup_id`, `theater_name`, `theater_location`, `latitude`, `longtitude`) VALUES ((select max(theater_id) from theater alias_for_subquery where theater_id = theater_id) +1, ?, ?, ?, ?, ?)';
  
    let troup_id = req.body.troup_id;
    let theater_name = req.body.theater_name;
    let theater_location = req.body.theater_location;
    let latitude = req.body.latitude;
    let longittude = req.body.longittude;
    
    
  
    let params=[troup_id, theater_name, theater_location, latitude, longittude];
    
    connection.query(sql,params,(err,rows,fields) => {
      res.send(rows);
      console.log(err);
    }
    )
    });

    //극단 수정
    app.post('/api/troupManagementUpdate1',(req, res) => {
      let sql = 'update troup set troup_name=  ?, troup_phone= ?, bank_name= ?, bank_account= ?, kakao_account= ?, seat_yn= ? where user_id= ?';
      

      let troup_name = req.body.troup_name;
      let troup_phone = req.body.troup_phone;
      let bank_name = req.body.bank_name;
      let bank_account = req.body.bank_account;
      let kakao_account = req.body.kakao_account;
      let seat_yn = req.body.seat_yn;
      let user_id=req.body.user_id;
      

      let params=[troup_name, troup_phone, bank_name, bank_account, kakao_account, seat_yn,user_id];
      connection.query(sql,params,(err,rows,fields) => {
        res.send(rows);
        console.log(err);
      }
      )
      });



    //극장 수정
    app.post('/api/troupManagementUpdate2',(req, res) => {
      let sql = 'update theater set theater_name= ?, theater_location= ?, latitude= ?, longtitude= ?, entire_row= ?, entire_column= ? where troup_id = ?';
      
      let theater_name = req.body.theater_name;
      let theater_location = req.body.theater_location;
      let latitude = req.body.latitude;
      let longtitude = req.body.longtitude;
      let entire_row = req.body.entire_row;
      let entire_column = req.body.entire_column;
      let troup_id = req.body.troup_id;
      console.log(troup_id)
      
      
      
      let params=[theater_name, theater_location, latitude, longtitude, entire_row, entire_column, troup_id];
      connection.query(sql,params,(err,rows,fields) => {
        res.send(rows);
         
        console.log(err);
      }
      )
      });
      

    //상영작 조회
    app.post('/api/showManagement',(req,res) => {
      let sql="select s.troup_id, s.show_title, s.start_date, s.end_date, s.show_preview, s.show_content, g.genre_name, g.genre_content, sd.show_time, sd.show_length, ap.audience1_price, ap.audience2_price, ap.audience3_price, ap.audience4_price, ap.audience5_price, ap.audience6_price from `show` s, genre g, show_date sd, audience_price ap where s.genre_id = g.genre_id and s.show_id = sd.show_id and s.show_id = ap.show_id and troup_id = ?";
      let params = req.body.troup_id;
      connection.query(sql,params,
        (err, rows, fields) => {
          res.send(rows);
        })
       
      });
    app.post('/api/getuserid/',(req,res) => {
      let sql="select troup_id from troup where user_id =?";
      let params=req.body.user_id;
      console.log("server.js user_id : "+params);
      connection.query(sql,params,
        (err, rows, fields) => {
          res.send(rows);
        })
       
      });


      app.use('/image', express.static('./upload'));


    //상영작테이블 등록
    app.post('/api/showManagementAddShow',upload.single('image'),parser,(req,res)=>{
      //console.log(req.file);
      let sql ='INSERT INTO `show` VALUES ((select max(show_id) from `show` alias_for_subquery where show_id = show_id) +1 , ?, ?, ?, ?, ?, ?, ?)';
      let troup_id = req.body.troup_id;
      let genre_id = req.body.genre_id;
      let show_title = req.body.show_title;
      let start_date = req.body.start_date;
      let end_date = req.body.end_date;
      let show_preview = '/image/' + req.file.filename;
      let show_content = req.body.show_content;
      
      console.log(show_preview)
    
      let params=[troup_id, genre_id, show_title, start_date, end_date, show_preview, show_content];
      
      connection.query(sql,params,(err,rows,fields) => {
        res.send(rows);
        console.log(err);
      }
      )
      });

      app.post('/api/getshowid/',(req,res) => {
        let sql="select show_id from `show` where troup_id =?";
        let params=req.body.troup_id;
        connection.query(sql,params,
          (err, rows, fields) => {
            res.send(rows);
          })
        });


       //공연시간테이블 등록
       app.post('/api/showManagementAddShowDate',parser,(req,res)=>{
        let sql ='INSERT INTO `show_date` VALUES ((select max(show_date_id) from `show_date` alias_for_subquery where show_date_id = show_date_id) +1 , ?,?,?)';
        console.log(req.body.show_id);
        let show_id = req.body.show_id;
        let show_time = req.body.show_time;
        let show_length = req.body.show_length;
        let params=[show_id, show_time, show_length];
        
        connection.query(sql,params,(err,rows,fields) => {
          res.send(rows);
          console.log(err);
        }
        )
        });

        //관객유형별공연가격테이블 등록
        app.post('/api/showManagementAddAudiencePrice',parser,(req,res)=>{
          let sql ='INSERT INTO `audience_price` VALUES ((select max(audience_price_id) from `audience_price` alias_for_subquery where audience_price_id = audience_price_id) +1, ?, ?, ?, ?, ?, ?, ?)';
          let show_id = req.body.show_id;
          let audience1_price = req.body.audience1_price;
          let audience2_price = req.body.audience2_price;
          let audience3_price = req.body.audience3_price;
          let audience4_price = req.body.audience4_price;
          let audience5_price = req.body.audience5_price;
          let audience6_price = req.body.audience6_price;
          console.log("server.js "+ show_id);
          let params=[show_id, audience1_price, audience2_price, audience3_price, audience4_price, audience5_price, audience6_price];
          
          connection.query(sql,params,(err,rows,fields) => {
            res.send(rows);
            console.log(err);
          }
          )
          });

          
          //상영작 삭제
          app.delete('/api/showManagement/:show_title',(req, res) => {
            let sql = 'delete from `show` where show_title = ?';
            let params = [req.params.show_title];
            connection.query(sql, params,
              (err, rows, fields) => {
                res.send(rows);
              })
            });



            
app.post('/api/QNAS',parser,(req,res)=>{
  let sql ="INSERT INTO `QNA` (`QnA_id`,`QnA_title`, `QnA_content`, `user_id`, `QnA_date`, `QnA_views`) VALUES (?,?,?,?,?,?)";
    console.log("서버단입니다.")
    let QnA_id = req.body.QnA_id;
    let QnA_title = req.body.QnA_title;
    let QnA_content = req.body.QnA_content;
    let user_id = req.body.user_id;
    let QnA_date = req.body.QnA_date;
    let QnA_views = req.body.QnA_views;
    // console.log(QnA_id)
    // console.log(QnA_title)
    // console.log(QnA_content)
    console.log("**********************************************************")
    console.log(QnA_date)
    // console.log(QnA_views)
// console.log(rew);
// console.log(req.body);
  let params = [QnA_id, QnA_title, QnA_content, user_id, QnA_date, QnA_views];

  connection.query(sql,params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(params);
    })
});

//QNA게시판 조회
app.get('/api/QNAS',(req,res) => {
  connection.query(
  'SELECT * FROM `QNA` ORDER BY `group_number` DESC, `order` ASC, `depth` ASC',
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

//답글 수정
app.get('/api/QNAS/:QnA_id',(req,res) => {
  console.log(req.params.QnA_id)
  let params = [req.params.QnA_id]
  connection.query(
  'Update `QNA` set `QnA_content` = ? where `QnA_id` = ?',params,
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

// 답글 삭제
app.delete('/api/QNAS/:QnA_id',(req,res) => {
  // console.log(req.params.QnA_id)
  let params = [req.params.QnA_id]
  connection.query(
  'delete from `QNA` where `QnA_id` = ?',params,
   (err,rows,fields) => {
      res.send(rows);
   }
 )
});

//답글 입력
app.post('/api/QNAInsert/:QnA_id',(req,res) => {
  //let sql = 'Update `qna` set `QnA_title` =?, `QnA_content` = ?  where `user_id` = ? and and `QnA_id` =?'
  let sql = 'INSERT INTO `QNA`(`group_number`, `order`, `depth`, `QnA_title`, `QnA_content`, `QnA_date`, `user_id`) values((select q.`group_number` FROM `QNA` q where q.`QnA_id`=?), (select max(q.`order`) from `QNA` q where  q.`QnA_id`=?)+1, (select max(q.`depth`) from `QNA` q where  q.`QnA_id`=?)+1, concat("└Re : ",?), ?, now(), ?)';
  let QnA_id = req.params.QnA_id;
  let QnA_title = req.body.QnA_title;
  let QnA_content = req.body.QnA_content;
  let user_id = req.body.user_id;
  // let user_id = req.body.user_id; 
  //let params = [QnA_title, QnA_content, user_id, QnA_id];
  let params = [QnA_id, QnA_id, QnA_id, QnA_title, QnA_content, user_id];
  console.log(params)
  connection.query(sql,params,
  (err,rows,fields) => {
      res.send(rows);
   }
 )
});

            
app.listen(port, () => console.log(`Listening on port ${port}`));