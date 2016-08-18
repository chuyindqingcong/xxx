requirejs(['jquery',"swiper",'xxp','loaddh','comm'],
    function() {
        var type1="";
        var arr=[
        ['aggreg.html','imgList.html','imgSlide.html','fast.html'],
        ['details.html']
    ];//地址
    //获取最终的样式
    var uid=getURL();
    var timeess=new Date().getTime();
    uid=uid.id;
    var cxx=1;
    var zts=1;
    var wrap_width=getDpi();
    $.ajax({
        url:localPost+'app?appId='+uid+'&typeOutside=0&typeInside=0&screenDPI='+wrap_width+'&timeess='+timeess,
        type: 'get',
        dateType: 'json',
        success: function(data) {
            var data=JSON.parse(data);
            uid=data.info.id;
            type1=data.info.typeRes;
            console.log(data);
            var cont = $('.content-txt').html();
            var ad=$('#login_ad').html();
            var ads="";
            cont = cont.replace(/text1/g, data.info.imgArray[0].fileURL)
            .replace(/text2/g, data.info.name)
            .replace(/text3/g, data.info.fileSizeDesc)
            .replace(/text4/g, data.info.downloadCountDesc)
            .replace(/text5/g, data.info.desc)
            .replace(/text6/g, data.info.fileURL)
            .replace(/textb/g,data.info.scoreCount)
            .replace(/textc/g,data.info.versionName)
            .replace(/textd/g,data.info.commentGradeDesc)
            .replace(/textf/g,data.info.scoreCount)
            .replace(/textg/g,data.info.name)
            $('.content-txt').css('display','block');
            //判断评论人数是否超过1万
            if(data.info.commentCount>10000){
                cont=cont.replace(/texte/g,data.info.scoreCount/10000+'万');
            }else{
                cont=cont.replace(/texte/g,data.info.scoreCount);
            }
            $('.content-txt').html(cont);
            for(var j=0;j<data.info.screenshotArray.length;j++){
               var imgs='<img src="'+data.info.screenshotArray[j].fileURL+'">';
               $('#solid').append(imgs);
           }
           $('#login_ad').html(ads);
           $('#xxx').raty({
            path:'/assets/images',
            readOnly:true,
            size:30,
            score:data.info.commentGrade/10
        });
           if(data.info.labelInfo.appLabel4.length>0){
           //增加应用标签
           for(var q=0;q<data.info.labelInfo.appLabel4.length;q++){
            var txt='<li class="label-a">'+data.info.labelInfo.appLabel4[q].name+'</li>';
            $('#labelinfo').append(txt)
        }
    }else{
        $('#labelinfo').parent().css('display','none')
    }
           //增加应用专题
           if(data.info.topic){
             var txxt="";
             for(var q=0;q<data.info.topic.length;q++){
                if(data.info.topic.length==1){
                    txxt='<li class="ti-b"><a href="'+arr[data.info.topic[0].typeRes][data.info.topic[0].typeInside]+'?id='+data.info.topic[q].id+'"><img src="'+data.info.topic[q].imgArray[0].fileURL+'"></a></li>';
                }else{
                    txxt+='<li class="ti-a"><a href="'+arr[data.info.topic[q].typeRes][data.info.topic[q].typeInside]+'?id='+data.info.topic[q].id+'"><img src="'+data.info.topic[q].imgArray[0].fileURL+'"></a></li>';
                }
            }
            $('#topic').append(txxt);
        }else{
           $('#topic').parents('.cont-ti').css('display','none')
       }
       var imgs = document.getElementById('solid');
       slide(imgs);
       var lis = imgs.getElementsByTagName('img');
       imgs.style.width = (lis.length) * 146 + 50 + "px";
            //对大图进行循环创建
            for(var d=0;d<data.info.screenshotArray.length;d++){
                var txt='<div class="swiper-slide"><img src="../assets/images/game_01.png" ></div>';
                $('#solid_auto').append(txt);
            }
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                spaceBetween: 0,
                centeredSlides: true,
                autoplayDisableOnInteraction: false,
            })
            for (var i = 0; i < lis.length; i++) {
                lis[i].addEventListener('touchstart', start, false);
                lis[i].addEventListener('touchmove', move, false);
                lis[i].addEventListener('touchend', end, false);
            }
            //旋转图片单击触发
            var url=localPost+'appRecom?appId='+uid+'&recommendedType=0'+'&screenDPI='+wrap_width+'&timeess='+timeess;
            add(url,$('#login_ad'));
            $('#img_h').toggle(
                function(){
                    $(this).css('transform','rotate(360deg)');
                    add(url,$('#login_ad'));
                },
                function(){
                 $(this).css('transform','rotate(0deg)');
                 add(url,$('#login_ad'));
             }
             )

            //检测是单击还是拖动
            var zt = 0;
            var startsX;
            var movesX;
            function start(e) {
                var ev=e||window.event;
                startsX=ev.changedTouches[0].clientX;
                zt = 0;
            }
            function move(e) {  
             var ev=e||window.event;
             movesX=ev.changedTouches[0].clientX;
             if(Math.abs(movesX-startsX)>10){
                zt = 1;
            }
        }
        function end() {
            if (zt == 0) {
                $('.warpbg').css('visibility', 'visible');
                $('.warpimg').attr('src', $(this).attr('src'));
                document.body.style.overflowY = 'hidden';
                $('#solid_auto').css('transform','translate3d('+-($(this).index()*$(window).width())+'px, 0px, 0px)')
            }
        }
            //检测放大图片是单击还是拖动
            var zs=0;
            $('.swiper-container').on('touchstart',
                function() {
                    zs=0;
                })
            $('.swiper-container').on('touchmove',function(){
                zs=1
            })
            $('.swiper-container').on('touchend',function(){
                if(zs==0){
                    $(this).parent().css('visibility', 'hidden');
                    document.body.style.overflow = 'block';
                    document.body.style.overflowY = 'auto';
                }
            }) 
            var solis=document.getElementById('solid_auto').getElementsByTagName("img");
            var solisimg=document.getElementById('solid').getElementsByTagName('img');
            for(var m=0;m<solis.length;m++){
                solis[m].src=solisimg[m].src;
            }

            $('.warpbg').css('height', $(window).height()) ;
                        //添加更多描述下拉功能
            if($('.cont-p-p').text().length>100){

                $('.cont-p-p span').css('display','block');
            };
                $('.cont-p-p span').on('click',function(){
                    if(zts==1){
                    $(this).css('transform','rotate(90deg)');
                      $(this).css('-webkit-ransform','rotate(90deg)');
                      $('.cont-p-p').css('height','auto');
                      $('.cont-p-p p').css('-webkit-line-clamp','initial');
                       $('.cont-p-p p').css('line-clamp','initial');
                      zts=0;
                    }else{
                       $('.cont-p-p').css('height','110px');
                        $('.cont-p-p p').css('-webkit-line-clamp','4');
                         $('.cont-p-p p').css('-line-clamp','4');
                      $(this).css('transform','rotate(-90deg)');
                      $(this).css('-webkit-ransform','rotate(-90deg)');
                      zts=1;
                    }
                })
        //执行评论ajax
        var urx=localPost+'comment?oprType=3&comment[resType]='+type1+'&comment[resId]='+uid+'&timeess='+timeess;
        plcomm(urx);
         //执行关于里面的推荐内容ajax
         var vrd=localPost+'appRecom?appId='+uid+'&recommendedType=2'+'&timeess='+timeess;
         add(vrd,$('.baldr'));
         //移动动画
         var pages=$('.page');
         var lis=$('.nav').find('li');
         lis.each(function(){
            $(this).on('click',function(){
                $(this).addClass('th-is').siblings().removeClass('th-is');
                $('.nav-div').css('left',$(this).offset().left);
                pages.each(function(){
                    $(this).css('display','none');
                })
                pages.eq($(this).index()).css('display','block');
            })
        });
         $('.bg-top').css('backgroundImage','url('+data.info.imgArray[0].fileURL+')');
         $('#J_page').on('click',function(){
           // window.history.go(-1);
           console.log(document.referrer)
            location.href='index.html'
        })
     }
 })
  //获取新的推荐内容
  function add(url,par){
    var ads="";
    $.ajax({
        url:url,
        type:'get',
        success:function(data){
            data=JSON.parse(data);
            console.log(data)
            for(var i=0;i<data.recommended.length;i++){
                ads+='<li><a href="details.html?id='+data.recommended[i].id+'">'+
                '<img src="'+data.recommended[i].imgArray[0].fileURL+'">'+
                '<h1>'+data.recommended[i].name+'</h1>'+
                '<p>'+data.recommended[i].downloadCountDesc+'</p></a>'+
                '<a class="diya" href="'+data.recommended[i].fileURL+'">下载</a>'+
                '</li>'
            };
            par.html(ads);
        }
    })
}
//发送ajax获取评论
var srr=[];
var pp=0;
var topid="";   //评论详情页面的id
var currentRes="";//最后一条记录的id
var mw={"JUL":"07","JAN":"01","FEB":"02","MAR":"03","APR":"04","MAY":"05","JUN":"06","AUG":"08","SEP":"09","OCT":"10","NOV":"11","DEC":"12"};
function plcomm(url){
    var commwrap=$('#comment');
    $.ajax({
        type:'get',
        dateType:'json',
        url:url,
        success:function(data){
            data=JSON.parse(data);
            console.log(data);
            if(pp==0&&data.commentArray.length==0){
                $('#comment').html('<p style="text-align:center;color:#ddd;padding-top:10px">还未有人评论</p>');
                return false;
            }
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
            srr.push(JSON.stringify(data.commentArray[i]));
            var txt='<div class="mess-content"src=plly.html?id='+data.commentArray[i].commentId+'&resType='+data.commentArray[i].resType+'&resId='+uid+'>'+
            '<div class="portrait"><img src="../assets/images/common_user_head_default_logout.png"></div>'+
            '<div class="con-txt">'+
            '<li class="ctxt-top"><p>'+data.commentArray[i].user.nickName+'</p><span>dd2012</span></li>'+
            '<li class="xx"><span class=cxx'+cxx+'></span></li>'+
            '<li class="ctxt-cen">'+data.commentArray[i].content+'</li>'+
            '<li class="ctxt-bot"><em>'+data.commentArray[i].hstype+'</em> <span class="ly">'+data.commentArray[i].commentCount+'</span><span class="dz">'+data.commentArray[i].upvoteCount+'</span></li>'+
            '</div>'+
            '</div>';
            var timer=data.commentArray[i].modifyTime.split(' ');
            var N=timer[2];
            var Y=mw[timer[0].toUpperCase()];
            var R=parseInt(timer[1]);
            txt=txt.replace(/dd2012/g,N+'-'+Y+'-'+R);
            commwrap.append(txt);
            $('.login-dh').css('display','block');
            $('.cxx'+cxx).raty({
                path:'/assets/images',
                readOnly:true,
                size:12,
                score:data.commentArray[i].score
            });
            cxx++;
        }
            pp++;
            //添加单击功能
            $('#comment').unbind();
            $('#comment').on('click',' .mess-content',function(){
               localStorage.setItem("thisa",srr[$(this).index()-1]);
               location.href=$(this).attr('src');
           })

              }
    })
}

//评论翻页功能
$(window).on('scroll',function(){
    if($('.page').eq(1).css('display')=='block'){
      if($(document).height()-$(document).scrollTop()<=$(window).height()){
         setTimeout(function(){
            plcomm(localPost+'comment?oprType=3&comment[resType]='+type1+'&comment[resId]='+uid+'&currentResult='+currentRes+'&screenDPI='+wrap_width);
        },300)
     }
 }
})

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
//运动函数
function slide(obj) {
      var solisimg=document.getElementById('solid').getElementsByTagName('img');
    obj.addEventListener('touchstart', start, false);
    obj.startX;
    obj.moveX;
    obj.newX;
    obj.dl;
    obj.l;
    obj.ispeed;
    obj.lastX = 0;
    obj.time;
    function start(ev) {
        var ev = ev || window.event;
        obj.startX = ev.changedTouches[0].clientX;
        obj.dl =parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4]);
        clearInterval(obj.time);
        ev.preventDefault();
    }
    obj.addEventListener('touchmove', move, false);
    function move(ev) {
        var ev = ev || window.event;
        obj.moveX = ev.changedTouches[0].clientX;
        obj.newX = obj.moveX - obj.startX;
        obj.l = obj.dl + obj.newX;
        obj.ispeed = obj.l - obj.lastX;
        obj.lastX = obj.l;
        if(solisimg.length<=2){
            return false;
        }
        if (obj.l > 0 || obj.l <= ( - 468 + $('body').width()-320/(5-solisimg.length+1))) {
            return false;
        } else {
            obj.style.transform= 'translate3d('+obj.l+'px,0,0)';
            obj.style.webkitTransform= 'translate3d('+obj.l+'px,0,0)';
        }
        ev.preventDefault();
    }
    obj.addEventListener('touchend', end, false);
    function end() {
       if(solisimg.length<=2){
        return false;
    }
    obj.ispeed = obj.ispeed*2 ;
    obj.time = setInterval(function() {
        obj.ispeed = obj.ispeed * 0.8;
        obj.style.transform='translate3d('+(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])+obj.ispeed)+'px,0,0)';
        obj.style.webkitTransform='translate3d('+(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])+obj.ispeed)+'px,0,0)';
        if (parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4]) > 0) {
            clearInterval(obj.time);
            obj.style.transform =  'translate3d(0,0,0)';
            obj.style.webkitTransform =  'translate3d(0,0,0)';
        } else if (parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])<= ( - 468 + $('body').width()-320/(5-solisimg.length+1))) {

           clearInterval(obj.time);
           obj.style.transform = 'translate3d('+(( - 468 + $('body').width()-320/(5-solisimg.length+1)))+'px,0,0)';
           obj.style.webkitTransform = 'translate3d('+(( - 468 + $('body').width()-320/(5-solisimg.length+1)))+'px,0,0)';
       }
   },
   30);
    setTimeout(function() {
        clearInterval(obj.time);
    },
    1000)
}

}

})

