$(function(){//广告轮播,鼠标移入显示左右按钮且轮播停止
    var timer=null;
    const waitTime=1500;//等待时间
    const animatedTime=1000;//淡入动画时间
    timer=setInterval(collapseRight,waitTime+animatedTime);
    $(".collapse_box").on("mouseover",()=>{//鼠标移入，轮播停止，左右按钮淡入
       fadeIn();
    });
    $(".collapse_box").on("mouseout",()=>{//鼠标移出，轮播重启，左右按钮淡出
        fadeOut();
    });
    //页签的点击事件
    $(".pager").on("click","li>i",(e)=>{//点击页签，切换图片展示
        var $tar=$(e.target);
        var picN=$("div.active").attr("value");//获取当前展示的图片的值
        var n=$tar.parent().index()+1;//获取当前点击页签的下标
        if(picN!=n){//如果页签下标与图片值不相等
            $("div.active").removeClass("active animated zoomIn")//当前展示图片移除active
            .siblings('.b_area[value='+n+']').addClass("active animated zoomIn");//寻找与当前页签下标相同的图片添加上active
        }
        $tar.parent("li").addClass("active").siblings("li").removeClass("active");
    });
    //左右按钮点击事件
    $(".lf_btn").click(()=>{//左按钮
        collapseLeft();
    });
    $(".rt_btn").click(()=>{
        collapseRight();
    });
    function collapseLeft(){//轮播函数向左
        if($(".collapse_box div.active").prev().is(".b_area")){//如果上一个元素是图片展示区
            $(".collapse_box div.active").removeClass("active animated zoomIn").prev(".b_area").addClass("active animated zoomIn");//则图片切换
            //页签切换
            $(".pager>li.active").removeClass("active").prev().addClass("active");
        }else{//否则(轮播到第一个元素)
            $(".collapse_box div.active").removeClass("active animated zoomIn");
            $(".collapse_box div.b_area:last").addClass("active animated zoomIn");//切换到图片展示区的最后一个元素进行展示
            $(".pager>li.active").removeClass("active");
            $(".pager>li:last").addClass("active");
            //同时页签也切换到最后一个激活
        }
    }
    function fadeIn(){
        clearInterval(timer);
        timer=null;
        $("div.lf_btn").show();
        $("div.rt_btn").show();
    }
    function fadeOut(){
        timer=setInterval(collapseRight,waitTime+animatedTime);
        $("div.lf_btn").hide();
        $("div.rt_btn").hide();
    }
    function collapseRight(){//轮播函数向右
        if($(".collapse_box div.active").next().is(".b_area")){//如果下一个元素是图片展示区
            $(".collapse_box div.active").removeClass("active animated zoomIn").next(".b_area").addClass("active animated zoomIn");//则图片切换
            //页签切换
            $(".pager>li.active").removeClass("active").next().addClass("active");
        }else{//否则(轮播到最后一个元素)
            $(".collapse_box div.active").removeClass("active animated zoomIn");
            $(".collapse_box div.b_area:first").addClass("active animated zoomIn");//切换到图片展示区的第一个元素进行展示
            $(".pager>li.active").removeClass("active");
            $(".pager>li:first").addClass("active");
            //同时页签也切换到第一个激活
        }
    }
});

$(function(){
   //导航条效果
    $(".navbar").on("mouseover","li.nav_faq",(e)=>{//鼠标移入添加class
        var $tar=$(e.target);
        if($tar.is("a")){
            $tar.parent("li").addClass("active");
        }
    });
    $(".navbar").on("mouseout","li.nav_faq",(e)=>{//鼠标移入添加class
        var $tar=$(e.target);
        if($tar.is("a")){
            $tar.parent("li").removeClass("active");
        }
    });
    //登陆框
    var click=false;
    $("#login").on("click","a",(e)=>{
        e.preventDefault();
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
    $(".close").click(()=>{
        $("#sub_menu").hide().removeClass("animated swing");
        click=false;
    });


});


//ajax登录部分
$(function(){
    $("#login_btn").click((e)=>{
        e.preventDefault();
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        console.log(uname+","+upwd);
        $.ajax({
            type:"POST",
            url:"/login.do",
            data:{uname:uname,upwd:upwd},
            success:function(data){
                if(data.code==1){
                    sessionStorage.uname=uname;
                    sessionStorage.upwd=upwd;
                    sessionStorage.uid=data.uid;
                    sessionStorage.account=data.account;
                    sessionStorage.msgNumber=data.msgNumber;
                    alert(data.msg+"还有3秒离开该页面");
                    var timer=null;
                    timer=setTimeout(()=>{
                        location.href="./details/talk.html";
                    },3000);
                }
                else{
                    console.log(data.msg);
                }
            }
        })
    });
});