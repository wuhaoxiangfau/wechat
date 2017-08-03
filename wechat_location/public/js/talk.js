var upic=null;
var uid=null;
var account="";
var uname="";
var talkArr=[];//当前登录用户聊天记录缓存区
$(document).ready(()=>{
   if(sessionStorage.getItem("uid")==null){
       location.href="./404error.html";
   }
   else{
        uid=sessionStorage.getItem("uid");
        account=sessionStorage.getItem("account");
        var lastlogin_msgNumber=sessionStorage.getItem("msgNumber");
       //加载该用户的信息
       $.ajax({
           type:"GET",
           url:"/user_info",
           data:{uid:uid},
           success:function(data){
               upic=data.upic;
               uname=data.uname;
               var html="";
               html+=`
                     <img class="urs_pic" src='../${data.upic}'>
                <!--用户信息弹出框-->
                <div class="urs_info">
                    <div class="u_i_up">
                        <div class="text_info">
                            <h5 class="urs_name">${data.uname}</h5>
                            <h5 class="urs_sex">
                                <i class="fa fa-male fa-2x"></i>
                            </h5>
                            <p class="urs_ID">
                                微信号: <span>${data.account}</span>
                            </p>
                        </div>
                        <img class="pic_info" src='../${upic}' alt=""/>
                    </div>
                    <div class="u_i_dw">
                        <div class="urs_location">
                            地区： <span>德国 杜塞尔多夫</span>
                        </div>
                        <!--缺两个图标字体-->
                    </div>
                </div>
               `;
               $("#urs_pic").html(html);
           },
           error:function(){
               alert("服务器崩溃了，请联系服务器管理员");
           }
       });
       //加载用户列表，更新列表界面
       $.ajax({
           type:"GET",
            url:"/friend_list",
           data:{account:account},
           success:function(data){
               if(data.length>0){
                   var html="";
                   console.log(data)
                   for(var i=0;i<data.length;i++){
                       var o=data[i];
                       var time=compare(getSysTime(new Date()),getTimeFromDatabase(o.subtime,8));
                       var friendNum="";
                       var list_text="";
                       if(o.msg==""&&o.fmsg!=""){
                           list_text=cut(o.fmsg);
                           html+=list_load(o.fid,o.upic,time,o.fname,list_text);
                       }else {
                           list_text=cut(o.msg);
                           html+=list_load(o.fid,o.upic,time,o.fname,list_text);
                       }
                   }
                   $(".list").html(html);
                   //判断朋友的长度，改变字体大小
                   friendNum=$(".list>li").length;
                   var f_names=$(".list>li").children("div.talk-item").children("div.talk-head").children(".f_name");
                   for(var i=0;i<friendNum;i++){
                       var n=f_names[i].innerHTML.length;
                       if(n>8&&n<=10){
                           $(f_names[i]).addClass("s");
                       }else if(n>10) {
                           $(f_names[i]).addClass("xs");
                       }
                   }
               }
           },
           error:function(){
               alert("服务器崩溃了，请联系服务器管理员");
           }
       });//ajax end

       //登陆ws服务器
       var socket = null;
       $.ajax({
           type:"GET",
           url:"/do",
           data:{account:account,msgNumber:lastlogin_msgNumber},
           dataType : 'json',
           success:function(data){
               if(data.length>0){//获取到了当前用户的所有聊天记录
                   for(var i=0;i<data.length;i++){
                      talkArr.push(data[i]);//压入缓存区
                   }
                   // 连接服务器---永久连接
                   socket = new WebSocket
                   ("ws://127.0.0.1:9000");
                   socket.onmessage=function(e){//开始接受服务器传来的数据
                       var obj=eval('(' + e.data + ')');//接收到的字符串数据转换成json
                       if(obj.code===undefined){//有更新的状态 准备更新页面
                           talkArr.push(obj);//将新接受的消息也压入缓存区
                           var lis=$(".list>li");
                           for(var i=0;i<lis.length;i++){
                               var li_num=parseInt(lis[i].getAttribute("id"));
                               if(obj.fid==li_num){//将该朋友在聊天列表内的文字内容更新
                                   if(obj.msg=="")
                                        $(".list>li:eq("+i+")").find("p.talk_content").html(cut(obj.fmsg));
                                   else
                                       $(".list>li:eq("+i+")").find("p.talk_content").html(cut(obj.msg));
                               }
                           }
                           if(fid==obj.fid){//如果目前处在与发给我信息的好友的聊天界面
                               if(obj.fmsg==""){//如果我没有回复 则将对方发送的内容更新到聊天窗口
                                   var html=$(".c_content").html();
                                   html+=`
                                        <div class="row lf">
                                            <img src='${fpic}' alt=""/>
                                            <p class="msg">${obj.msg}</p>
                                        </div>
                                        `;
                                   $(".c_content").html(html);
                                   scrollToBottom();//聊天内容下拉
                               }
                           }else{//否则，出现有新消息的提示红点
                                    for(var i=0;i<lis.length;i++){
                                        var li_num=parseInt(lis[i].getAttribute("id"));
                                        if(obj.fid==li_num){//只将发送给我消息的人提示有新消息
                                            $(".list>li:eq("+i+")").children("div.red_point").show();
                                        }
                                    }
                           }
                       }//没有更新的状态 则不提示页面
                   }
               }
           },
           error:function(){
               alert("服务器崩溃了");
           }
       });//ajax end
   }
});
function list_load(fid,upic,subtime,fname,text){
    return     `
                            <li id="${fid}">
                                <input type="hidden" value="false">
                                <div class="red_point">
                                    <i class="fa fa-commenting fa-lg"></i>
                                </div>
                                <img class="f_pic" src='../${upic}'>
                                <div class="talk-item">
                                    <div class="talk-head">
                                        <span class="last_time">${subtime}</span>
                                        <h5 class="f_name">${fname}</h5>
                                     </div>
                                    <p class="talk_content">${text}</p>
                                </div>
                            </li>
                              `;
}//聊天列表加载函数
function getTimeFromDatabase(str,offset){
    var time=str.slice(0,19);
    var year=time.slice(0,4);
    var month=time.slice(5,7);
    var date=time.slice(8,10);
    date=parseInt(date);
    var hours=time.slice(11,13);
    hours=parseInt(hours)+offset;
    if(hours<24){
        hours=hours;
    }else if(hours==24){
        hours=0;
        date+=1;
    }else if(hours>24){
        hours-=24;
        date+=1;
    }
    if(hours<10){
        hours="0"+hours;
    }
    if(date<10){
        date="0"+date;
    }
    var minutes=time.slice(14,16);
    var seconds=time.slice(17,19);
    var Date=year+"-"+month+"-"+date.toString();
    var clock=hours+":"+minutes+":"+seconds;
    var num=year+month+date+hours+minutes+seconds;
    num=parseInt(num)
    var arr=[];
    arr.push(Date);
    arr.push(clock);
    arr.push(num);
    return arr;
}//专门处理由数据库传回的时间字符串
function getSysTime(sysTime){
    var sysFullYear=sysTime.getFullYear();
    var sysMonth=sysTime.getMonth()+1;
    if(sysMonth<10){
        sysMonth="0"+sysMonth;
    }
    var sysDate=sysTime.getDate();
    if(sysDate<10){
        sysDate="0"+sysDate;
    }
    var sysHours=sysTime.getHours();
    if(sysHours<10){
        sysHours="0"+sysHours;
    }
    var sysMinutes=sysTime.getMinutes();
    if(sysMinutes<10){
        sysMinutes="0"+sysMinutes;
    }
    var sysSeconds=sysTime.getSeconds();
    if(sysSeconds<10){
        sysSeconds="0"+sysSeconds;
    }
    var date=sysFullYear.toString()+"-"+sysMonth+"-"+sysDate;
    var clock=sysHours+":"+sysMinutes+":"+sysSeconds;
    var arr=[];
    arr.push(date);
    arr.push(clock);
    arr.push(parseInt(
        sysFullYear+sysMonth+sysDate+sysHours+sysMinutes+sysSeconds
    ));
    return arr;
}//专门处理系统时间
function compare(time1,time2){
    var cha=time1[2]-time2[2];
    if(cha>172800){
        return time2[0].slice(5,10);
    }else if(cha>86400){
        return "昨天";
    }
    else{
        return time2[1].slice(0,5);
    }
}//对比系统时间和数据库传回的时间
function cut(str){
    if(str.length>=6){
        var newstr=str.slice(0,6);
        newstr+="...";
        return newstr;
    }else{
        return str;
    }
}//剪切过多的聊天内容
function scrollToBottom(){
    var containerHeight=parseFloat($("#mCSB_2").css("height"));
    var contentHeight=parseFloat($("#mCSB_2_container").css("height"));
    if(contentHeight>containerHeight){//如果聊天内容的高度大于展示框，则将聊天内容自动下拉
        $("#mCSB_2_container")
            .css("top",-(contentHeight-containerHeight)+"px");
    }
}//聊天内容下拉函数

$(function(){
    $("#header").load("header.html");
    $("#foot").load("footer.html");
    var mainHeight=parseFloat($("#main").css("height"));
    var contentHeight=parseFloat($(".container").css("height"));
    if(mainHeight<contentHeight){//内容的高度自适应
        mainHeight=1.6*contentHeight;
        $("#main").css("height",mainHeight+"px");
    }

});
//导航栏事件
$(function(){
    $("#header").on("mouseover","li.nav_faq",(e)=>{//鼠标移入添加class
        var $tar=$(e.target);
        if($tar.is("a")){
            $tar.parent("li").addClass("active");
        }
    });
    $("#header").on("mouseout","li.nav_faq",(e)=>{//鼠标移入添加class
        var $tar=$(e.target);
        if($tar.is("a")){
            $tar.parent("li").removeClass("active");
        }
    });
//登陆框
    var click=false;
    $("#header").on("click","#login a",(e)=>{
        if(!click){
            click=true;
            $("#login").addClass("active");
            $("#sub_menu").show().addClass("animated swing");
        }
        else{
            click=false;
            $("#login").removeClass("active");
            $("#sub_menu").hide().removeClass("animated swing");
        }
    });
    $("#header").on("click",".close",()=>{
        $("#sub_menu").hide().removeClass("animated swing");
        click=false;
    });
});
//点击侧边栏图标，激活图标事件
$(function(){
    $(".func").on("click","li",(e)=>{//事件代理，为动态页面做准备
        var $tar=$(e.target);
        $tar.parent().addClass("active");
        $tar.parent().siblings().removeClass("active");
    });
    var clickStatus=false;//判断侧边栏是否已被点击，初始化为false
    $(".bottom_box").on("click","span",()=>{//侧边栏下方设置按钮
        if(!clickStatus){
            $(".bottom_box").children("span").css("color","#ccc");
            clickStatus=true;
            $(".setting_menu").show();
        }else{
            $(".bottom_box").children("span").css("color","white");
            clickStatus=false;
            $(".setting_menu").hide();
        }
    });
    var click=false;//判断当前用户是否被点击，初始化为false
    $("#urs_pic").on("click",".urs_pic",()=>{
        if(!click){
            $(".urs_info").show();
            click=true;
        }else{
            $(".urs_info").hide();
            click=false;
        }
    });
});

var fid=null;//存为全局变量，为下面发送与该朋友的聊天内容至数据库做准备
var fname="";//同上
var faccount="";//同上
var fpic="";
var isDown=false;//初始化一个状态属性，文字输入部分是否未完全显示,初始状态为false
//主界面的事件效果
$(function(){
    $(".details").on("click",'ul>li',(e)=>{//点击li的事件 ajax事件，更新聊天窗口内容
        var $tar=$(e.target);
        $tar.parents("li").addClass("active");
        $tar.parents("li").siblings().removeClass("active");
        $tar.parents("li").children("div.red_point").hide();//更新提示红点消除
        fid=$tar.parents("li").attr("id");//存当前点击的朋友的用户id
        fpic=$tar.parents("li").children("img").attr("src");
        content=$(".input_area").val();

        if(!isDown){//如果文本输入内容未全部显示
            $(".t_main").css("height","93.75%");
            $(".t_input").show();//输入框显示
            $(".t_title").show();
        }

        $.ajax({//获取聊天窗口的历史记录
            type:"GET",
            url:"/screen_show",
            data:{fid:fid,account:account},
            success:function(data){
                if(data.length>0){
                    var html="";
                    for(var i=0;i<data.length;i++){//给聊天列表加载内容
                        var o=data[i];
                        fname=o.fname;
                        faccount=o.faccount;
                        if(o.fmsg==""&&o.msg!=""){//如果我没有回复
                            html+=`
                                <div class="row lf">
                                    <img src='${fpic}' alt=""/>
                                    <p class="msg">${o.msg}</p>
                                </div>
                            `;
                        }else if(o.msg==""&&o.fmsg!=""){//如果对方没有回复
                            html+=`
                                <div class="row rt">
                                    <img src='../${upic}' alt=""/>
                                    <p class="msg">${o.fmsg}</p>
                                </div>
                            `;
                        }else if(o.fmsg!=""&&o.msg!=""){//双方都回复了
                            html+=`
                                <div class="row lf">
                                    <img src='${fpic}' alt=""/>
                                    <p class="msg">${o.msg}</p>
                                </div>
                                <div class="row rt">
                                    <img src='../${upic}' alt=""/>
                                    <p class="msg">${o.fmsg}</p>
                                </div>
                     `;
                        }else if(o.fmsg==""&&o.msg==""){//为加好友的信息保存，不显示  有空格都不行
                            html+="";
                        }
                    }
                    $("#t_name").html(fname);
                    $(".c_content").html(html);
                    scrollToBottom();
                }
            },
            error:function(){
                alert("服务器崩溃了，请联系服务器管理员");
            }
        });
    });
});

function scrollToBottom(){//聊天内容下拉函数
    var containerHeight=parseFloat($("#mCSB_2").css("height"));
    var contentHeight=parseFloat($("#mCSB_2_container").css("height"));
    if(contentHeight>containerHeight){//如果聊天内容的高度大于展示框，则将聊天内容自动下拉
        $("#mCSB_2_container")
            .css("top",-(contentHeight-containerHeight)+"px");
    }
}
    var content;
//聊天界面事件
$(function(){
    $(".input_top").on("mouseover","i",(e)=>{//鼠标移入图标按钮，提示出现
        var $tar=$(e.target);
            if($tar.is("i")){
                $tar.next().show();
            }
    });
    $(".input_top").on("mouseout","i",(e)=>{//鼠标移出图标按钮，提示隐藏
        var $tar=$(e.target);
        if($tar.is("i")){
            $tar.next().hide();
        }
    });
    $("#more").click(()=>{
        if(!isDown){
            $("#frist_input").animate({opacity:0},1000,()=>{$("#frist_input").hide()});
            $(".t_main").css("height","75%");
            $(".t_input").addClass("animated slideInUp");
            scrollToBottom();
            isDown=true;
        }
    });
    $(".t_main").click(()=>{
        if(isDown){
            $(".t_main").css("height","93.75%");
            $(".t_input").removeClass("slideInUp").addClass("slideInDown");
            $("#frist_input").show().animate({opacity:1},1000);
            scrollToBottom();
            isDown=false;
        }
    });
    var click=false;//点击‘...’按钮 弹出添加成员表
    $("#t_btn").click(()=>{
        if(!click){
            $(".flip_menu").show();
            click=true;
        }else{
            $(".flip_menu").hide();
            click=false;
        }
    });
    var Status=false;//点击功能按钮，颜色发生改变
    $(".input_top").on("click",".input_top>div.btn_group i",(e)=>{
        var $tar=$(e.target);
        if(!Status){
            Status=true;
            $tar.css("color","#222");
        }else{
            Status=false;
            $tar.css("color","#999");
        }
    });


    $(".input_area").keyup((e)=>{//使用输入法时，按回车键无法取得键值
        var reg=/^ *$/i;//防止输入纯空格或者不输入内容
        content=$(".input_area").val();
        if(!reg.test(content)&&(fid!=null)){//只有不为空文本或者不为纯空格才能发送文字
            $("#sub_btn").attr("disabled",false);
        }else{
            $("#sub_btn").attr("disabled",true);
        }
    });
    var lastSubTime=0;//上一次发送文字的时间，初始化为0
    $("#sub_btn").on("click",function(){//点击发送按钮，在聊天屏幕上增加一条信息，并且发送数据到数据库(ajax)

            $.ajax({
                type:"POST",
                url:"/txt.send",
                data:{uid:uid,fid:fid,fname:fname,faccount:faccount,fmsg:content,account:account,uname:uname},//uid fid fname faccount fmsg account uname
                success:function(data){
                    if(data.code==1){//只有数据发送成功了，才将文字发送到界面上，并且将输入框内容清空
                        var time=new Date();//当前发送文字的时间
                        var html=$(".c_content").html();
                        if(getSysTime(time)[2]-lastSubTime>360){//如果当次发送文字的时间与上一次发送文字的时间间隔大于360s
                            html+=`
                            <div class="sub_time">${getSysTime(time)[1].slice(0,5)}</div>
                            <div class="row rt">
                                <img src="../${upic}" alt=""/>
                                <p class="msg">${content}</p>
                            </div>
                    `;//则在聊天框内加上时间栏
                            lastSubTime=getSysTime(time)[2];//更新上次发送的时间
                        }
                        else{//否则不加时间栏
                            html+=`
                            <div class="row rt">
                                <img src="../${upic}" alt=""/>
                                <p class="msg">${content}</p>
                            </div>
                    `;
                            lastSubTime=getSysTime(time)[2];//更新上次发送的时间
                        }
                        $(".c_content").html(html);
                        $('#'+fid+' .talk_content').html(cut(content));
                        $('#'+fid+' .last_time').html(getSysTime(time)[1].slice(0,5));//在朋友列表内更新时间
                        $(".input_area").val("");
                        //如果聊天内容的高度大于展示框，则将聊天内容自动下拉
                        scrollToBottom();
                    }
                    else{//否则请用户重新发送
                        alert("发送失败，请重试");
                    }
                },
                error:function(){
                    alert("服务器崩溃了，请联系服务器管理员");
                }
            });//ajax end
    });
});
//整体界面事件
$(function(){
    var click=false;
   $("#change_lg").click(()=>{
       if(!click){
           $(".container").addClass("container_lg");
           $("#change_lg>i").removeClass("fa-window-maximize").addClass("fa-window-restore");
           click=true;
       }
       else{
           $(".container").removeClass("container_lg");
           $("#change_lg>i").removeClass("fa-window-restore").addClass("fa-window-maximize");
           click=false;
       }
   });
});
function customContextMenu(e){//阻止鼠标右键系统默认事件
    e.preventDefault ? e.preventDefault():(e.returnValue = false);
    var cstCM = document.getElementById('cst_pic');
    if(e.target.nodeName=="IMG"){//只有在图片上右键单击才跳出右键菜单1
        cstCM.style.left = e.clientX + 'px';
        cstCM.style.top = e.clientY + 'px';
        cstCM.style.display = 'block';

    }
    document.onmousedown = clearCustomCM;//在页面任何位置鼠标点击，关闭右键菜单
}
function clearCustomCM(){//清除自己设定的右键菜单
    $(".cstCM").hide();
    document.onmouswdown = null;
}

function f_remove(target){//删除按钮（未做）
    target.parents("li").remove();
}



