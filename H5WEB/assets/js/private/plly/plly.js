requirejs(['jquery','xxp','loaddh','comm'],function(){
		var page=document.getElementById('J_page');
	page.onclick=function(){
    location.href=document.referrer
 }
 var uid=getURL();
   var wrap_width=getDpi();
 	var cxx=1;
   var uresType=uid.resType;
   var uresid=uid.resId;
  	var timeess=new Date().getTime();
    uid=uid.id;
    var mw={"JUL":"07","JAN":"01","FEB":"02","MAR":"03","APR":"04","MAY":"05","JUN":"06","AUG":"08","SEP":"09","OCT":"10","NOV":"11","DEC":"12"};
  	var obj=JSON.parse(localStorage.getItem('thisa'));
  	console.log(obj)
  	//本地读取楼主
  	 var txtd='<div class="mess-content"src=plly.html?id='+obj.commentId+'&resType='+obj.resType+'&resId='+uid+'>'+
                '<div class="portrait"><img src="../assets/images/common_user_head_default_logout.png"></div>'+
                '<div class="con-txt">'+
                '<li class="ctxt-top"><p>'+obj.user.nickName+'</p><span>dd2012</span></li>'+
                '<li class="xx"><span class=cxd></span></li>'+
                '<li class="ctxt-cen">'+obj.content+'</li>'+
                '<li class="ctxt-bot"><em>'+obj.hstype+'</em> <span class="ly">'+obj.commentCount+'</span><span class="dz">'+obj.upvoteCount+'</span></li>'+
                '</div>'+
                '</div>';
                  var timer=obj.modifyTime.split(' ');
                    var N=timer[2];
                    var Y=mw[timer[0].toUpperCase()];
                    var R=parseInt(timer[1]);
               txtd=txtd.replace(/dd2012/g,N+'-'+Y+'-'+R);
               $('.zhut').append(txtd);
                $('.cxd').raty({
                        path:'/assets/images',
                        readOnly:true,
                        size:12,
                        score:obj.score
                    });
   	
  //执行评论ajax
        var urx=localPost+'comment?oprType=3&comment[resType]='+uresType+'&comment[resId]='+uresid+'&comment[topId]='+uid+'&screenDPI='+wrap_width+'&timeess='+timeess;
        plcomm(urx);

//评论翻页功能
$(window).on('scroll',function(){
		if($(document).height()-$(document).scrollTop()<=$(window).height()){
			setTimeout(function(){

				plcomm(localPost+'comment?oprType=3&comment[resType]='+uresType+'&comment[resId]='+uresid+'&comment[topId]='+uid+'&currentResult='+currentRes);
			},300)
		}
})
//如果没有任何数据，添加还未有人评论

 //解析URL
 function getURL(){
    var url=window.location.search;
    var obj= new Object();
    if(url.indexOf('?')!=-1){
        var txt=url.substr(1);
        var strs=txt.split('&');
        for(var i=0;i<strs.length;i++){
            obj[strs[i].split("=")[0]]=strs[i].split("=")[1];
        }
        return obj;
    }
}
	var topid="";   //评论详情页面的id
var currentRes="";//最后一条记录的id
var p=0;
function plcomm(url){
	var commwrap=$('.loags');
	$.ajax({
		type:'get',
		dateType:'json',
		url:url,
		success:function(data){
			data=JSON.parse(data);
			if(p==0&&data.commentArray.length==0){
				$('.loags').html('还未有人评论');
				return false;
			}
			console.log(data);
			if(data.commentArray.length==0){
				$('.login-dh img').css('visibility','hidden');
				$('.login-dh span').html('天啦如，已经被你翻光了');
				return false;
			}else{
				$('.login-dh img').css('visibility','visible');
				$('.login-dh span').html('页面加载中。。。。');
			}
			currentRes=data.commentArray[data.commentArray.length-1].commentId;
			for(var i=0;i<data.commentArray.length;i++){
				if(data.commentArray[i].pId){
					var txt='<div class="mess-content">'+
					'<div class="portrait"><img src="../assets/images/common_user_head_default_logout.png"></div>'+
					'<div class="con-txt">'+
					'<li class="ctxt-top">'+data.commentArray[i].user.nickName+'<em>回复:</em><em class="ems">'+data.commentArray[i].pId+'楼</em><span>'+data.commentArray[i].commentIndex+'楼</span></li>'+
					'<li class="ctxt-cen">'+data.commentArray[i].content+'</li>'+
					'<li class="ctxt-bot bacs"><em>dd2012</em><span class="dz">'+data.commentArray[i].upvoteCount+'</span></li>'+
					'</div>'+
					'</div>';
					var timer=data.commentArray[i].modifyTime.split(' ');
					var N=timer[2];
					var Y=mw[timer[0].toUpperCase()];
					var R=parseInt(timer[1]);
					txt=txt.replace(/dd2012/g,N+'-'+Y+'-'+R);
					commwrap.append(txt);
					$('.login-dh').css('display','block');
					cxx++;
				}else{
					var txt='<div class="mess-content">'+
					'<div class="portrait"><img src="../assets/images/common_user_head_default_logout.png"></div>'+
					'<div class="con-txt">'+
					'<li class="ctxt-top">'+data.commentArray[i].user.nickName+'<span>'+data.commentArray[i].commentIndex+'楼</span></li>'+
					'<li class="ctxt-cen">'+data.commentArray[i].content+'</li>'+
					'<li class="ctxt-bot bacs"><em>dd2012</em> <span class="dz">'+data.commentArray[i].upvoteCount+'</span></li>'+
					'</div>'+
					'</div>';
					var timer=data.commentArray[i].modifyTime.split(' ');
					var N=timer[2];
					var Y=mw[timer[0].toUpperCase()];
					var R=parseInt(timer[1]);
					txt=txt.replace(/dd2012/g,N+'-'+Y+'-'+R);
					commwrap.append(txt);
					$('.login-dh').css('display','block');
					cxx++;
				}
			}
						p++;
		}
	})
}
})