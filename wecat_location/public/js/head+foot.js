$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});
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