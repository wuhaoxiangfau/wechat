//项目入口文件

const http=require("http");
const mysql=require("mysql");
const qs=require("querystring");
const express=require("express");
const ws=require("ws");

var Server = new ws.Server({port:9000});


var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"wechat",
    port:3306,
    connectionLimit:25
});

var app = express();
var server=http.createServer(app);
server.listen(8082);

app.use(express.static("public"));

//功能点1，用户注册
app.post("/reg.do",(reg,res)=>{
   reg.on('data',(data)=>{
      var str=data.toString();
      var obj=qs.parse(str);
      var uname=obj.uname;
      var upwd=obj.upwd;
      var u_account=obj.u_account;
      var upic=obj.upic;
      pool.getConnection((err,conn)=>{
          var sql='INSERT INTO user VALUES(null,?,?,?,?)';//uname u_account upwd upic

          conn.query(sql,[uname,u_account,upwd,upic],(err,result)=>{
              if(err) throw err;

          });
      });
   });
});


//功能点2 验证用户名是否存在

//功能点3，用户登陆
app.post("/login.do",(req,res)=>{
   req.on("data",(data)=>{
       var str=data.toString();
       var obj=qs.parse(str);
       var uName=obj.uname;
       var p=obj.upwd;

       pool.getConnection((err,conn)=>{
          var sql="SELECT *FROM user WHERE uname=? AND upwd=?";
          conn.query(sql,[uName,p],(err,result)=>{
             //登陆成功跳转到聊天界面
             //登陆失败 用户名或密码错误
              if(result.length<1){
                  res.json({code:-1,msg:"用户名或密码错误"});
              }
              else{
                  res.json({code:1,msg:"登陆成功",uid:result[0].uid,account:result[0].account,msgNumber:result[0].msgNumber});
              }
              conn.release();
          });
       });
   }) ;
});

//功能点4，加载登录用户的用户信息界面
app.get("/user_info",(req,res)=>{
    //接收客户端传来的数据
    var uid=req.query.uid;

    pool.getConnection((err,conn)=>{
        //创建sql
        var sql="SELECT*FROM user WHERE uid=?";
        conn.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            res.json(result[0]);
            conn.release();
        });
    });
});//用户信息



//功能点5，加载好友列表
app.get("/friend_list",(req,res)=>{
     var account=req.query.account;
    pool.getConnection((err,conn)=>{
        //复杂sql  使用子查询 只查询每个好友最新发送给用户的MSG
       var sql="SELECT *FROM (SELECT * FROM ";
       sql+="( SELECT o.fid,o.fname,o.msg,o.fmsg,o.subtime,u.upic FROM ";
       sql+=account+" o,user u WHERE o.fid=u.uid order BY o.fid) ";
       sql+="AS temp group by subtime order by subtime desc) as son GROUP BY fid";
       conn.query(sql,(err,result)=>{
           if(err) throw err;
           res.json(result);
           conn.release();
       });
    });
});

//功能点6，获取与选中好友的聊天记录界面
app.get("/screen_show",(req,res)=>{
   var fid=req.query.fid;
   var account=req.query.account;
     pool.getConnection((err,conn)=>{
         //复杂sql 先获取按时间降序排序的子表  再将该表以mid方式升序输出，但每次都只能查询10条
        var sql="SELECT* FROM (SELECT*FROM "+account+" WHERE fid=? ORDER BY subtime desc LIMIT 10) AS SON ORDER BY mid";
        conn.query(sql,[fid],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.json(result);
            }
            conn.release();
        });
     });
});
//功能点7，发送我与当前朋友的聊天内容
app.post("/txt.send",(req,res)=>{
   req.on("data",(data)=>{
       var str=data.toString();
       var obj=qs.parse(str);
       var fid=obj.fid;//朋友的id
       var fname=obj.fname;//朋友的用户名
       var fmsg=obj.fmsg;//发送给朋友的内容
        var faccount=obj.faccount;//朋友的账号
       var account=obj.account;//自己的账号
       var uid=obj.uid;//自己的id
       var uname=obj.uname;//自己的用户名
       //给自己的聊天表添加该条聊天内容
       pool.getConnection((err,conn)=>{
          var sql1="INSERT INTO "+account+" VALUES(null,";
           sql1+="?,?,?,?,?,?,now())";
          conn.query(sql1,[uid,fid,fname,faccount,'',fmsg],(err,result)=>{
              if(err) throw err;
              if(result.affectedRows<1){
                  res.json({code:-1,msg:"发送失败"});
              }
              else{
                  res.json({code:1,msg:"发送成功"});
              }
             conn.release();
          });
       });
       //并且给对方的聊天表添加该条聊天内容
       pool.getConnection((err,conn)=>{
           var sql2="INSERT INTO "+faccount+" VALUES(null,";
           sql2+=fid+","+uid+",'"+uname+"','"+account+"','"+fmsg+"',?,";
           sql2+="now())";
           conn.query(sql2,[""],(err,result)=>{
              if(err) throw err;
               conn.release();
           });
       })
   }) ;
});


//功能点8 加载该用户的所有聊天记录  ，用户登陆之后时时监听数据库


app.get("/do",(req,res)=>{
    var account=req.query.account;
    var new_length=0;//存放在用户离线期间其他人给用户发送的信息数
    pool.getConnection((err,conn)=>{
        var sql='SELECT *FROM '+account;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            new_length=result.length;
            conn.release();
        });
    });
    var connection=0;//连接数
    Server.on("connection",(socket)=>{
        connection++;
        var mysql_database=null;
        if(connection==1){//1表示是当前用户登陆的状态
            var msgNumer=req.query.msgNumber;
            console.log("ws服务器收到一个连接请求");
            console.log(account+",登录了！");
            var old_length=parseInt(msgNumer);//存放用户上次登录时的聊天记录数
            mysql_database=setInterval(function(){
                pool.getConnection((err,conn)=>{
                    var sql="SELECT *FROM "+account;
                    conn.query(sql,(err,result)=>{
                        if(err) throw err;
                        if(new_length>old_length){
                            for(var i=old_length;i<new_length;i++){
                                var str=JSON.stringify(result[i]);
                                socket.send(str);
                            }
                            old_length=new_length;
                        }else{
                             socket.send('{"code":-1,"msg":"没有更新内容"}');
                        }
                        conn.release();//断开连接池
                    });
                });
            },500);
            socket.on("close",()=>{//用户下线了 将下线时用户的聊天记录数更新
                console.log(account+"下线了");
                console.log(1);
                clearInterval(mysql_database);//不再继续向客户端发送信息
                console.log(2);
                pool.getConnection((err,conn)=>{
                    var sql="UPDATE user SET msgNumber=? WHERE account=?";
                    conn.query(sql,[new_length,account],(err,result)=>{
                        if(err) throw err;
                    });
                });
            });
        }
    });

});




