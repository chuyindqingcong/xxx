requirejs(["jquery", "swiper","bottom",'loaddh','comm'],
function() {
// 导航条初始化  S
var nav = $('#navigation');
var pageIndex=0;
var txt = nav.html(); //导航条初始化的节点
var tst = ""; //要替换的模板
var cc = ""; //模板替换后的集合
var ids = ""; //克隆出来的节点
var uid=1;//当前导航ID
var ys1 = 1; //样式1个数
var ys2 = 1; //样式2个数
var ys3 = 1; //样式3个数
var ys4 = 1; //样式4个数
var ys5 = 1; //样式5个数
var ys6 = 1; //样式6个数
var ys7 = 1; //样式7个数
var ys8 = 1; //样式8个数
var ys9 = 1; //样式9个数
var ys10 = 1; //样式10个数
var ys11 = 1; //样式11个数
var ys12 = 1; //样式12个数
var ys13 = 1; //样式13个数
var ys14 = 1; //样式14个数
var ys14s = 1; //样式14子元素个数
var ys15 = 1; //样式15元素个数
var ys16 = 1; //样式16元素个数
var ys17 = 1; //样式17元素个数
var ys18=1;//样式17元素个数
var wrap = $('#content');
var sld=0;
var pp=0;
var thmclick=1;
var arr=[
['aggreg.html','imgList.html','imgSlide.html','fast.html'],
['details.html']
    ];//地址
var wrap_width=getDpi();
var timeess=new Date().getTime();

    $.ajax({
        url: localPost+"frame?timeess="+timeess,
        type: "get",
        success: function(data) {
            var test = JSON.parse(data);
            console.log(test);
            for (var i = 0; i < test.tabArray.length; i++) {
                if(test.tabArray[i].fileUrl){
                    cc+='<li src="'+test.tabArray[i].id+'"><img src="'+test.tabArray[i].fileUrl+'"></li>'
                }else{       
                    cc+='<li src="'+test.tabArray[i].id+'">'+test.tabArray[i].name+'</li>'
                }

            }
            nav.html(cc);
            var lis = nav.find('li');
            lis.eq(0).addClass('title-blue');
            $('.header-title').css('display','block');
            lis.each(function() {
                $(this).css('width', 100 / lis.length + '%');
                var $this = $(this);
                
                $(this).on('click',
                    function() {
                        if(thmclick==0){
                            return false;
                        }
                        setTimeout(function(){thmclick=1},300)
                        thmclick=0;
                        $this.addClass('title-blue').siblings().removeClass('title-blue');
                        $('.hua').css('left', $this.offset().left);
                        $('#content').html("");
                        $('#dh').css('display','block');
                        pageIndex=0;
                        pp=0;
                        loads(localPost+'tab?tabId='+$this.attr('src')+'&currentPage='+pageIndex+'&screenDPI='+wrap_width+'&timeess='+timeess);
                        uid=$this.attr('src');
                        $('.p-ready').css('display','none');
                        readysj();
                    })
            });
            $('.hua').css('width', lis.eq(0).width() + "px");

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(XMLHttpRequest.responseText);
            alert(textStatus);
            alert(errorThrown);
            console.log(textStatus);
        }

    })

//加载动画设置
$('#dh').css('height',$(window).height());


//内容初始化    
loads(localPost+'tab?tabId='+uid+'&currentPage='+pageIndex+'&screenDPI='+wrap_width+'&timeess='+timeess);

//设置头部绝对定位

$('.null-div').css('height','90px');

//翻页 S
$(window).on('scroll',function(){

    if($(document).height()-$(document).scrollTop()<=$(window).height()){
     setTimeout(function(){
        loads(localPost+'tab?tabId='+uid+'&currentPage='+pageIndex);
    },300)
 }
})
//翻页 E
//获取最终的样式
function getStyle(obj,attr){
    if(obj.currentStyle){
     return obj.currentStyle[attr];
 }else{
     return getComputedStyle(obj,false)[attr];
 }
}
//图片滑动
function slide1(obj) {
    var solis=document.getElementById('solid_auto').getElementsByTagName("img");
    var solisimg=document.getElementById('solidd').getElementsByTagName('img');
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
         };
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
         };
        obj.ispeed = obj.ispeed*2 ;
        obj.time = setInterval(function() {
            obj.ispeed = obj.ispeed * 0.8;
            obj.style.transform='translate3d('+(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])+obj.ispeed)+'px,0,0)';
            obj.style.webkitTransform='translate3d('+(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])+obj.ispeed)+'px,0,0)';
            if (parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4]) > 0) {
                clearInterval(obj.time);
                obj.style.transform =  'translate3d(0,0,0)';
                obj.style.webkitTransform =  'translate3d(0,0,0)';
            } else if (parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])<= ( - 470 + $('body').width() - 320)) {
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
//运动函数
function slide(obj){
    obj.addEventListener('touchstart',start,false);
    obj.startX;
    obj.moveX;
    obj.newX;
    obj.dl;
    obj.sX;
    obj.l;
    obj.time;
    obj.lastX;
    obj.tim;
    var lissss=obj.getElementsByTagName('div');
    obj.style.width=(lissss.length+2)*88+"px";
    function start(ev){
     var ev=ev||window.event;
     obj.startX=ev.changedTouches[0].clientX;
     obj.dl=parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4]);
     ev.preventDefault();
     clearInterval(obj.time);
     clearInterval(obj.tim);
 }
 obj.addEventListener('touchmove',move,false);
 function move(ev){
     var ev=ev||window.event;
     obj.moveX=ev.changedTouches[0].clientX;
     obj.newX=obj.moveX-obj.startX;
     obj.l=obj.dl+obj.newX;
     obj.sX=obj.l-obj.lastX;
     obj.lastX=obj.l;
     if(obj.sX>30||obj.sX<-30){
         if(obj.sX>0){
            obj.sX=10;
        }else{
            obj.sx=-30;
        }
    }
    if(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])>0||parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])<=-(parseInt(obj.style.width)-100)){
      return false;
  }else{

    obj.style.transform='translate3d('+obj.l+'px,0,0)';
    obj.style.webkitTransform='translate3d('+obj.l+'px,0,0)';
}
ev.preventDefault();

}
obj.addEventListener('touchend',end,false);
function end(){
    if(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])>=0||parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])<=-(parseInt(obj.style.width)-100)){
        gun();
    }else{
        obj.sX=obj.sX*2;
        obj.time=setInterval(function(){
            obj.sX=obj.sX*0.8;
            obj.style.transform='translate3d('+(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])+obj.sX)+'px,0,0)';
            obj.style.webkitTransform='translate3d('+(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])+obj.sX)+'px,0,0)';
            if(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])>=0){
                obj.style.transform='translate3d(0,0,0)';
                clearInterval(obj.time);
                obj.style.webkitTransform='translate3d(0,0,0)';
            }else if((parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4]))<=-(parseInt(obj.style.width)-100)){
                obj.style.transform='translate3d('+-(parseInt(obj.style.width)-100)+'px'+',0,0)';
                obj.style.webkitTransform='translate3d('+-(parseInt(obj.style.width)-100)+'px'+',0,0)';
            }
            if(Math.ceil(Math.abs(obj.sX))==1){
                clearInterval(obj.time)
            }
        },30)
    }
}
function gun(){
    if(parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4])>=0){
       obj.style.transform='translate3d(0,0,0)';
       obj.style.webkitTransform='translate3d(0,0,0)';
       return false;
   }else{
    obj.style.transform='translate3d('+(-(parseInt(obj.style.width)-100))+'px,0,0)';
    obj.style.webkitTransform='translate3d('+(-(parseInt(obj.style.width)-101))+'px,0,0)';
    return false;
}
}
}

//页面ajax请求数据并将数据初始化布置在页面上
function loads(getUrl){
    pageIndex++;
    console.log(arr)
    $.ajax({
        url: 'modules.html?timeess='+timeess,
        type: 'get',
        success: function(data) {
            cc = "";
            tst = "";
            ids = "";
            $('#modules').append(data);
            $.ajax({
                url: getUrl,
                type: "get",
                success: function(data) {
                    var test = JSON.parse(data);
                    console.log(test);
                        if(pp==0&&test.resArray.length<5){
                          $('.login-dh').css('display','none')
                        }else{
                              $('.login-dh').css('display','block');
                        }

                    if(test.resArray.length==0){
                        $('.login-dh img').css('visibility','hidden');
                        $('.login-dh span').html('天啦如，已经被你翻光了');
                        return false;
                    }else{
                        $('.login-dh img').css('visibility','visible');
                        $('.login-dh span').html('页面加载中。。。。');
                    }
                    for (var j = 0; j < test.resArray.length; j++) {

                    if (test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==0) { //初始化样式1
                        ids = $('#ys1').clone();
                        ids.attr('id', "solid" + ys1);
                        wrap.append(ids);
                        tst = $('#solid' + ys1 + ' .swiper-wrapper').html();
                        for (var i = 0; i < test.resArray[j].subArray.length; i++) {
                            cc += tst.replace(/text1/g,test.resArray[j].subArray[i].imgArray[1].fileURL)
                            .replace(/text2/g,arr[test.resArray[j].subArray[i].typeRes][test.resArray[j].subArray[i].typeInside]+'?id='+test.resArray[j].subArray[i].id)
                        }
                        $("#solid" + ys1 + " .swiper-wrapper").html(cc);
                        var swiper = new Swiper('.swiper-container', {
                            pagination: '.swiper-pagination',
                            paginationClickable: true,
                            spaceBetween: 0,
                            centeredSlides: true,
                            autoplay: 2500,
                            loop: true,
                            autoplayDisableOnInteraction: false,
                        });
                        $('.swiper-wrapper').find('li').remove()
                        ys1++;
                    } else if (test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==100) { //初始化样式2   
                        cc = "";
                        ids = $('#ys2').clone();
                        ids.attr('id', 'classify' + ys2);
                        console.log('aaa')
                        wrap.append(ids);
                        tst = $('#classify' + ys2 + ' ul').html();
                        for (var i = 0; i < test.resArray[j].subArray.length; i++) {
                            cc += tst.replace(/text0/g, arr[test.resArray[j].subArray[i].typeRes][test.resArray[j].subArray[i].typeInside]+'?id='+test.resArray[j].subArray[i].id)
                            .replace(/text1/g, test.resArray[j].subArray[i].imgArray[0].fileURL)
                            .replace(/text2/g, test.resArray[j].subArray[i].name);
                        }
                        console.log('asdsad')
                        $("#classify" + ys2 + " ul").html(cc);
                        $('#classify'+ys2).find('li').css('width',100/test.resArray[j].subArray.length+'%');
                    } else if (test.resArray[j].typeRes==1&&test.resArray[j].typeOutside==0) {		//初始化样式3
                        cc = "";
                        ids = $("#ys3").clone();
                        ids.attr('id', 'content_game' + ys3);
                        wrap.append(ids);
                        tst = $("#content_game" + ys3).html();
                        cc = tst.replace(/text0/g, test.resArray[j].imgArray[0].fileURL)
                        .replace(/text2/g,test.resArray[j].name)
                        .replace(/text4/g, test.resArray[j].commentGradeDesc)
                        .replace(/text5/g, test.resArray[j].downloadCountDesc)
                        .replace(/text6/g,  test.resArray[j].fileSizeDesc)
                        .replace(/text7/g,test.resArray[j].descBrief)
                        .replace(/text8/g,test.resArray[j].fileURL)
                        .replace(/text9/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id);
                        var ia=0;
                        if(test.resArray[j].labelInfo.appLabel1.length>=1){
                          cc=cc.replace(/text1/g,test.resArray[j].labelInfo.appLabel1[0].name);
                          ia=1;
                      }
                      var iaa=0;
                      if(test.resArray[j].labelInfo.appLabel2.length>=1){
                       cc=cc.replace(/text3/g,test.resArray[j].labelInfo.appLabel2[0].name);
                       iaa=1;
                   }
                   $("#content_game" + ys3).html(cc);
                   if(ia==1){
                    $("#content_game" + ys3).find('.span-icon').css('display','block');
                    $("#content_game" + ys3).find('.span-icon').css('background-color',test.resArray[j].labelInfo.appLabel1[0].color)
                }
                if(iaa==1){
                  $("#content_game" + ys3).find('.game-title span').css('display','inline-block');

              }
              ys3++;

                    }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==9){ //样式17
                        var rd=parseInt(Math.random(0,1)*test.resArray[j].subArray.length);
                        cc = "";
                        ids = $("#ys17").clone();
                        ids.attr('id', 'content_ga' + ys17);
                        wrap.append(ids);
                        tst = $("#content_ga" + ys17).html();
                        cc += tst.replace(/text0/g, test.resArray[j].subArray[rd].imgArray[0].fileURL)
                        .replace(/text2/g, test.resArray[j].subArray[rd].name)
                        .replace(/text4/g, test.resArray[j].subArray[rd].commentGradeDesc)
                        .replace(/text5/g, test.resArray[j].subArray[rd].downloadCountDesc)
                        .replace(/text6/g, test.resArray[j].subArray[rd].fileSizeDesc)
                        .replace(/text7/g, test.resArray[j].subArray[rd].descBrief)
                        .replace(/text8/g, test.resArray[j].subArray[rd].fileURL)
                        .replace(/text9/g, arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].subArray[rd].id);
                        $("#content_ga" + ys17).html(cc);
                        ys17++;
                    }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==3||test.resArray[j].typeRes==1&&test.resArray[j].typeOutside==2){	//初始化样式4
                    	cc="";
                    	ids=$("#ys4").clone();
                    	ids.attr("id","one_img"+ys4);
                    	wrap.append(ids);
                        var bltxt=0;
                    	tst=$("#one_img"+ys4).html();
                        if(test.resArray[j].typeRes==1&&test.resArray[j].typeOutside==2){
                        	cc=tst.replace(/text1/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
                            .replace(/text2/g,test.resArray[j].imgArray[1].fileURL).replace(/text3/g,test.resArray[j].commentGradeDesc).replace(/text4/g,test.resArray[j].name).replace(/text5/g,test.resArray[j].nameSub).replace(/text6/g,test.resArray[j].fileURL);
                        }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==3){
                            cc=tst.replace(/text1/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
                            .replace(/text2/g,test.resArray[j].imgArray[0].fileURL);
                            bltxt=1;
                        }

                        $("#one_img"+ys4).html(cc);
                        if(bltxt==1){
                             $("#one_img"+ys4).find('div').remove();
                             $("#one_img"+ys4).find('a').eq(1).remove()
                             bltxt=0;
                        }
                        ys4++;
                    }else if (test.resArray[j].typeRes==0&& test.resArray[j].typeOutside==7){  //初始化样式5
                    	cc="";
                    	ids=$("#ys5").clone();
                    	ids.attr("id","special"+ys5);
                    	wrap.append(ids);
                    	tst=$("#special"+ys5).html();
                    	cc+=tst.replace(/text1/g,test.resArray[j].name)
                    	.replace(/text2/g,test.resArray[j].imgArray[0].fileURL)
                    	.replace(/text3/g,test.resArray[j].nameSub)
                    	.replace(/text4/g,test.resArray[j].createTimeDesc)
                    	.replace(/text5/g,test.resArray[j].countBrowseDesc)
                        .replace(/text6/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
                        $("#special"+ys5).html(cc);
                        ys5++;
                    }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==50){//给集合专用
                        var wwap=$('#ys6').clone();
                        wwap.attr('id','wad'+ys6);
                        wrap.append(wwap);
                        var g=1;
                        for(var m=0;m<test.resArray[j].subArray.length;m++){
                            if(g==7){g=1}
                                if(test.resArray[j].subArray[m].typeRes==1&&test.resArray[j].subArray[m].typeOutside==1){
                                    cc="";
                                    ids=$('#ys11').clone();
                                    ids.attr("id","collectiosd"+ys11);
                                    ids.find('.game-long').addClass('game-color-'+g);
                                    wwap.append(ids);
                                    tst=$('#collectiosd'+ys11).html();
                                    cc+=tst.replace(/text6/g,arr[test.resArray[j].subArray[m].typeRes][test.resArray[j].subArray[m].typeInside]+'?id='+test.resArray[j].subArray[m].id)
                                    .replace(/text2/g,test.resArray[j].subArray[m].name)
                                    .replace(/text3/g,test.resArray[j].subArray[m].nameSub)
                                    .replace(/text4/g,test.resArray[j].subArray[m].descBrief)
                                    .replace(/text5/g,test.resArray[j].subArray[m].imgArray[0].fileURL)
                                    ;
                                    $('#collectiosd'+ys11).html(cc);
                                    g++;
                                    ys11++;
                                }else{
                                    cc="";
                                    ids=$('#ys10').clone();
                                    ids.attr("id","collectios"+ys10);
                                    ids.find('.game-short').addClass('game-color-'+g);
                                    wwap.append(ids);
                                    tst=$('#collectios'+ys10).html();
                                    cc+=tst.replace(/text4/g,arr[test.resArray[j].subArray[m].typeRes][test.resArray[j].subArray[m].typeInside]+'?id='+test.resArray[j].subArray[m].id)
                                    .replace(/text2/g,test.resArray[j].subArray[m].imgArray[0].fileURL)
                                    .replace(/text3/g,test.resArray[j].subArray[m].name);
                                    $('#collectios'+ys10).html(cc);
                                    g++
                                    ys10++;
                                }
                                ys6++;
                            }
                        }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==30){
                            var wss=$('#ys18').clone();
                            wss.attr('id','w78'+ys18);
                            wrap.append(wss);
                            var aaa=wss.find('.ys18_left');
                            var bbb=wss.find('.ys18_right');
                            var ccc;
                            for(var m=0;m<test.resArray[j].subArray.length;m++){
                                if(aaa.height()>bbb.height()){
                                    ccc=bbb;
                                }else{
                                    ccc=aaa
                                }
                                if(test.resArray[j].subArray[m].typeRes==1&&test.resArray[j].subArray[m].typeOutside==3){
                                   cc="";
                                   ids=$('#ys7').clone();
                                   ids.attr('id','halfone'+ys7);
                                   ccc.append(ids);
                                   tst=$("#halfone"+ys7).html();
                            	// ids.css('background-color',test.resArray[j].subArray[m].imgArray[1].fileURL);
                            	cc+=tst.replace(/text1/g,test.resArray[j].subArray[m].imgArray[0].fileURL)
                            	.replace(/text2/g,test.resArray[j].subArray[m].name)
                            	.replace(/text3/g,test.resArray[j].subArray[m].fileURL)
                                .replace(/text4/g,arr[test.resArray[j].subArray[m].typeRes][test.resArray[j].subArray[m].typeInside]+'?id='+test.resArray[j].subArray[m].id);
                                $("#halfone"+ys7).html(cc);
                                $("#halfone"+ys7).css({"background":'url('+test.resArray[j].subArray[m].imgArray[1].fileURL+')',"background-size":"100% 100%"});
                                ys7++;
                            }else{
                               cc="";
                               ids=$('#ys8').clone();
                               ids.attr('id','halfond'+ys8);
                               ccc.append(ids);
                               tst=$("#halfond"+ys8).html();
                               cc+=tst.replace(/text1/g,arr[test.resArray[j].subArray[m].typeRes][test.resArray[j].subArray[m].typeInside])
                               $("#halfond"+ys8).html(cc);
                               $("#halfond"+ys8).css({"background":'url('+test.resArray[j].subArray[m].imgArray[1].fileURL+')',"background-size":"100% 100%"});
                               ys8++;
                           }

                       }
                   }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==60){

                       cc="";
                       ids=$("#ys9").clone();
                       ids.attr('id','collection'+ys9);
                       wrap.append(ids);
                       tst=$('#collection'+ys9+' .ulss').html();
                       for(var i=0;i<test.resArray[j].subArray.length;i++){
                          cc+=tst.replace(/text1/g,arr[test.resArray[j].subArray[i].typeRes][test.resArray[j].subArray[i].typeInside]+'?id='+test.resArray[j].subArray[i].id)
                          .replace(/text2/g,test.resArray[j].subArray[i].imgArray[0].fileURL)
                          .replace(/text3/g,test.resArray[j].subArray[i].name);
                      }
                      $('#collection'+ys9+' .ulss').html(cc);	
                      $('#collection'+ys9).css({'background':'#fff','overflow':'hidden','clear':'both','margin-top':'10px'});
                      ys9++;

                  }else if(test.resArray[j].typeRes==1&&test.resArray[j].typeOutside==5){
                    console.log(test.resArray[j]);
                    console.log('chengshoute');
                   cc="";
                   ids=$('#ys12').clone();
                   ids.attr("id","install"+ys12);
                   wrap.append(ids);
                   tst=$('#install'+ys12).html();
                   cc=tst.replace(/text7/g,test.resArray[j].fileURL)
                   .replace(/text1/g,test.resArray[j].nameSub)
                   .replace(/text2/g,test.resArray[j].commentGradeDesc)
                   .replace(/text3/g,test.resArray[j].downloadCountDesc)
                   .replace(/text4/g,test.resArray[j].fileSizeDesc)
                   .replace(/text5/g,test.resArray[j].imgArray[0].fileURL)
                   .replace(/text6/g,test.resArray[j].name)
                   .replace(/text9/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id);
                   if(test.resArray[j].labelInfo.appLabel1!=""){
                     cc=cc.replace(/text8/g,test.resArray[j].labelInfo.appLabel1[0].name);
                 }
                 $('#install'+ys12).html(cc);
                 if(test.resArray[j].labelInfo.appLabel1!=""){
                    console.log($('#install'+ys12).find('.bg-install span').css('display','block'))
                }
                $("#install"+ys12+" .bg-install").css({"background":'url('+test.resArray[j].imgArray[1].fileURL+')',"background-size":"100% 100%"});
                ys12++;
            }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==4){
               cc="";
               ids=$('#ys13').clone();
               ids.attr("id","con_login"+ys13);
               wrap.append(ids);
               tst=$('#con_login'+ys13).html();
               cc+=tst.replace(/text1/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
               .replace(/text2/g,test.resArray[j].name)
               .replace(/text3/g,test.resArray[j].subArray[0].imgArray[0].fileURL)
               .replace(/text4/g,test.resArray[j].subArray[0].name)
               .replace(/text5/g,test.resArray[j].subArray[0].nameSub)
               .replace(/text6/g,test.resArray[j].subArray[0].fileURL)
               .replace(/text7/g,arr[test.resArray[j].subArray[0].typeRes][test.resArray[j].subArray[0].typeInside]+'?id='+test.resArray[j].subArray[0].id)
               ;
               $('#con_login'+ys13).html(cc);
               $("#con_login"+ys13).css({"background":'url('+test.resArray[j].imgArray[0].fileURL+')',"background-size":"100% 100%"});
               ys13++;
           }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==2){
               cc="";
               ids=$('#ys14').clone();
               ids.attr("id","div_solid"+ys14);
               wrap.append(ids);
               tst=$('#div_solid'+ys14).html();
               cc+=tst.replace(/text1/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
               .replace(/text2/g,test.resArray[j].name);
               $('#div_solid'+ys14).html(cc);
               $("#div_solid"+ys14).css({"background":'url('+test.resArray[j].imgArray[0].fileURL+')',"background-size":"100% 100%"});
               var idss=$('#div_solid'+ys14).find('#nei_wrap');
               idss.attr('id',"div_solid_wrap"+ys14);
               var tsst=$("#div_solid_wrap"+ys14).html();
               var ccc="";
               for(var i=0;i<test.resArray[j].subArray.length;i++){
                  ccc+=tsst.replace(/text3/g,arr[test.resArray[j].subArray[i].typeRes][test.resArray[j].subArray[i].typeInside]+'?id='+test.resArray[j].subArray[i].id)
                  .replace(/text4/g,test.resArray[j].subArray[i].imgArray[0].fileURL)
                  .replace(/text5/g,test.resArray[j].subArray[i].name)
                  .replace(/text6/g,test.resArray[j].subArray[i].fileURL);
              }
              $('#div_solid_wrap'+ys14).html(ccc);
              slide(document.getElementById('div_solid_wrap'+ys14));
              ys14++;
          }else if(test.resArray[j].typeRes==0&&test.resArray[j].typeOutside==8){
           cc="";
           ids=$('#ys15').clone();
           ids.attr('id','div_lis'+ys15);
           wrap.append(ids);
           tst=$('#div_lis'+ys15).html();
           var bdh=0;
           if(test.resArray[j].imgArray[0]){
            cc+=tst.replace(/text1/g,test.resArray[j].name)
           .replace(/text2/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
           .replace(/text3/g,test.resArray[j].imgArray[0].fileURL);
           }else{
               cc+=tst.replace(/text1/g,test.resArray[j].name)
               .replace(/text2/g,arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id)
               bdh=1;
           }
           $('#div_lis'+ys15).html(cc);
        if(bdh==1){
            $('#div_lis'+ys15).find('ul li').eq(1).remove('')
          }
           var idss=($('#div_lis'+ys15).find("#nei_dd"));
           idss.attr('id','nei_dd'+ys15);
           var tsst=$('#nei_dd'+ys15).html();
           var ccc="";

           for(var i=0;i<test.resArray[j].subArray.length;i++){
              ccc+=tsst.replace(/text4/g,arr[test.resArray[j].subArray[i].typeRes][test.resArray[j].subArray[i].typeInside]+'?id='+test.resArray[j].subArray[i].id)
              .replace(/text5/g,test.resArray[j].subArray[i].imgArray[0].fileURL)
              .replace(/text6/g,test.resArray[j].subArray[i].name)
              .replace(/text7/g,test.resArray[j].subArray[i].fileURL);
          }
          $('#nei_dd'+ys15).html(ccc);

          ys15++;

                    // }else if(test.bb[j].name=="ys16"){
                    // 	cc="";
                    // 	ids=$("#ys16").clone();
                    // 	ids.attr('id','fonr'+ys16);
                    // 	wrap.append(ids);
                    // 	tst=$('#fonr'+ys16+' div').html();
                    // 	for(var i=0;i<test.bb[j].ys16.length;i++){
                       //  	cc+=tst.replace(/text1/g,test.bb[j].ys16[i].http)
                       //  	.replace(/text2/g,test.bb[j].ys16[i].src)
                       //  }
                    // 	$('#fonr'+ys16+' div').html(cc);	
                    // 	ys16++;

                }

                }//for循环结束
                 pp++;
                setTimeout(function(){
                    if($('.game-long').parents('.jiheZ').find('.game-short ').length>0&&$('.game-long').length>1){
                    $('.game-short').css('height',$('.game-long').height()+13)
                     }
                },300)

                $('#dh').css('display','none');
              	    //格式化相同类型的margin-top的值
                     var xupn=$('#content>div');

                     for(var i=0;i<xupn.length;i++){
                        if(i!=0){
                            if(xupn[i].className==xupn[i-1].className){
                             xupn[i].style.marginTop=0;
                         }
                     }
                 }
               //给拖动动画添加单击功能
               $('.nei-wrap-bg a').each(function(){
                var zt=0;
                var startsX;
                var movesX;
                $(this).on('touchstart',function(e){
                   var ev=e||window.event;
                   startsX=ev.originalEvent.changedTouches[0].clientX;
                   zt=0;
               })
                $(this).on('touchmove',function(e){
                    var ev=e||window.event;
                    movesX=ev.originalEvent.changedTouches[0].clientX;
                    if(Math.abs(movesX-startsX)>10){
                        zt = 1;
                    }
                })
                $(this).on('touchend',function(){
                 if(zt==0){
                    window.location.href=$(this).attr('href');
                }

            })
            })
           },
           error: function() {
            alert("数据读取错误")

        }
    })
},
error: function() {
    alert('内容初始化错误')
}

})
}
//初始化搜索
$('#a_seach').on('click',function(){
    $(this).parents('.wrap').css('display','none');
    $('.tow-wrap').css('display','block');
    add();
})
$('#f_wrap').on('click',function(){
    $('.tow-wrap').css('display','none');
    $('.wrap').css('display','block');
    location.reload();
})
//搜索页面初始化
var mo=document.getElementById('seach');
var moduseach=mo.innerHTML;
var modu;
var seach=document.getElementById('img_seach');
var clear_seach=document.getElementById('clear_seach');
if(localStorage.getItem('json_data')){
    var json_data = localStorage.getItem("json_data").split(','); 
    for(var i=0;i<json_data.length;i++){
        modu=moduseach.replace(/text1/g,json_data[i]).
        replace(/<li style="display: none">/,"").replace(/<\/li>/,"");
        var lis=document.createElement('li');
        lis.innerHTML=modu;
        mo.appendChild(lis);
    }

    var seach_img=mo.getElementsByTagName('img');
    for(var j=0;j<seach_img.length;j++){
     seach_img[j].addEventListener('click',function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
        for(var d=0;d<json_data.length;d++){
            if(json_data[d]==$(this).parent().find('span').html()){
             json_data.splice(d,1);
             localStorage.setItem("json_data",json_data);

         }
     }
     if(seach_img.length==1){
        mo.parentNode.style.display='none';
    }
})
 }
}else{
    var json_data=[];
    localStorage.setItem("json_data",json_data);
}
var seach_img=mo.getElementsByTagName('img');
if(seach_img.length==1){
    mo.parentNode.style.display='none';
}
//搜索按钮单击事件
seach.addEventListener('click',function(){
    var txt=document.getElementById('txt_seach').value;
    for(var i=0;i<json_data.length;i++){
        if(json_data[i]==txt){
          json_data.splice(i,1);
      }
  }
  if(txt!=""){
    json_data.unshift(txt);
    if(json_data.length>=6){
        json_data.splice(6,1)
    }
    localStorage.setItem("json_data",json_data);
    $('.rgseach').css('display','none');
    $('.rgseach-clear').css('display','none');
    $('#dhh').css('display','block');
    $('.change').css('display','none');
    //发送ajax 初始化页面
    var url=localPost+'search?searchEntry=0&searchWord='+$('#txt_seach').val()+'&currentPage=0'+'&screenDPI='+wrap_width+'&timeess='+timeess;
    seach_year(url);
    $('.seach-wrap').css('display','block');
    }
})
clear_seach.addEventListener('click',function(){
    json_data=[];
    localStorage.setItem('json_data',json_data);
    this.parentNode.style.display="none";
})
//重新加载按钮
readysj();
function readysj(){
    setTimeout(function(){
        if($('#dh').css('display')=='block'){
            readybot();
        }
    },2000);
}
function readybot(){
  setTimeout(function(){
    $('.p-ready').css('display','block');
},2000)
}
$('.p-ready').on('click',function(){
    location.reload();
})
//搜索页面图片滑动
function seachInit(){
    var imgs = document.getElementById('solidd');
    slide1(imgs);
    var lis = imgs.getElementsByTagName('img');
    imgs.style.width = (lis.length) * 146 + 50 + "px";
    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('touchstart', start, false);
        lis[i].addEventListener('touchmove', move, false);
        lis[i].addEventListener('touchend', end, false);
    }

    var zt = 0;
    var newsX;
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
        $('#solid_auto').css('transform','translate3d('+-($(this).index()*$(window).width())+'px, 0px, 0px)');
        var swipera = new Swiper('.swiper-containera', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplayDisableOnInteraction: false,
        });
        console.log(swipera)
    }
}
        //检测放大图片是单击还是拖动
        var zs=0;
        $('.swiper-containera').on('touchstart',
            function() {
                zs=0;

            })
        $('.swiper-containera').on('touchmove',function(){
            zs=1
        })
        $('.swiper-containera').on('touchend',function(){
            if(zs==0){
                $(this).parent().css('visibility', 'hidden');
                document.body.style.overflow = 'block';
                document.body.style.overflowY = 'auto';
            }
        }) 
        var solis=document.getElementById('solid_auto').getElementsByTagName("img");
        var solisimg=document.getElementById('solidd').getElementsByTagName('img');
        for(var m=0;m<solis.length;m++){
            solis[m].src=solisimg[m].src;
            console.log(solisimg[m].src)
        }
        $('.warpbg').css('height', $(window).height()) ;
    }
    //  搜索页面旋转动画
    $('#img_h').toggle(
        function(){
           $(this).css('transform','rotate(360deg)');
           add();
       },
       function(){
           $(this).css('transform','rotate(0deg)');
           add();
       }
       )
    function add(url){
        $.ajax({
            url:localPost+'searchRecom?timeess='+timeess,
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(data)
                var titleLis=$('#rgseach_game');
                var txt="";
                for(var i=0;i<data.recomInfoArray.length;i++){
                    if(data.recomInfoArray[i].resInfo){
                        if(data.recomInfoArray[i].resInfo.imgArray){
                          txt+='<li><a href="'+arr[data.recomInfoArray[i].resInfo.typeRes][data.recomInfoArray[i].resInfo.typeInside]+'?id='+data.recomInfoArray[i].resInfo.id+'"><img src="'+data.recomInfoArray[i].resInfo.imgArray[0].fileURL+'"><span>'+data.recomInfoArray[i].searchWord+'</span></a></li>';
                      }else{
                          txt+='<li><a href="'+arr[data.recomInfoArray[i].resInfo.typeRes][data.recomInfoArray[i].resInfo.typeInside]+'?id='+data.recomInfoArray[i].resInfo.id+'"><span>'+data.recomInfoArray[i].searchWord+'</span></a></li>';
                      }
                  }else{
                      txt+='<li class="seach_click"><span>'+data.recomInfoArray[i].searchWord+'</span></li>';
                  }
              }
              titleLis.html(txt);
          },
          error:function(){
            alert('读取失败')
        }
    })
    }
        //搜索页面JS初始化
        var seach_top=$('#seach_top').html();
        function seach_year(urld){
            $.ajax({
                url:urld,
                type:'get',
                success:function(data){
                    data=JSON.parse(data);
                    console.log(data)
                    var txt="";
                    for(var i=0;i<data.resArray.length;i++){
                     if(i==0){
                         var seach_txt=seach_top.replace(/text0/g,data.resArray[i].imgArray[0].fileURL)
                         .replace(/text2/g,data.resArray[i].name)
                         .replace(/text4/g,data.resArray[i].commentGradeDesc)
                         .replace(/text5/g,data.resArray[i].downloadCountDesc)
                         .replace(/text6/g,data.resArray[i].fileSizeDesc)
                         .replace(/text7/g,data.resArray[i].nameSub)
                         .replace(/text8/g,data.resArray[i].fileURL)
                         .replace(/text9/g,arr[data.resArray[i].typeRes][data.resArray[i].typeInside]+'?id='+data.resArray[i].id);
                         $('#seach_top').html(seach_txt);
                         var uiImg=$('#solidd');
                         var bg_uiImg=$('#solid_auto');
                         uiImg.html("");
                         bg_uiImg.html("");
                         var slide_img="";
                         var ui_slide_img="";
                         for(var j=0;j<data.resArray[i].screenshotArray.length;j++){
                           slide_img+='<img src="'+data.resArray[i].screenshotArray[j].fileURL+'">';
                           ui_slide_img+='<div class="swiper-slide"> <a href="#"><img src="" ></a></div>';
                         }
                         uiImg.html(slide_img);
                         bg_uiImg.html(ui_slide_img)
                     }else {
                        txt+='<div class="content-game"><a href="'+arr[data.resArray[i].typeRes][data.resArray[i].typeInside]+'?id='+data.resArray[i].id+'">'+
                        '<div class="game-img"><img src="'+data.resArray[i].imgArray[0].fileURL+'">'+
                        '</div><div class="game-txt"><ul><li class="game-title"><h1>'+data.resArray[i].name+'</h1></li>'+
                        '<li class="game-cont"><span><em>'+data.resArray[i].commentGradeDesc+'</em>分 '+data.resArray[i].downloadCountDesc+' '+data.resArray[i].fileSizeDesc+'</span></li>'+
                        '<li class="game-p"><p>'+data.resArray[i].nameSub+'</p></li></ul></div></a>'+
                        '<a href="'+data.resArray[i].fileURL+'"class="dow">下载</a></div>';

                    }
                    $('#ulisd').html(txt);
                    $('#dhh').css('display','none');
                }
                seachInit();

            },
            error:function(){

            }
        })
        }
    //添加搜索页面的历史记录搜索功能

    $('#seach_div').on('click','.seach_click',function(){
         $('#txt_seach').val($(this).text());
            document.getElementById('img_seach').click();
    })
    //添加搜索页面改变返回的li click功能
    var changes=$('.change');
    changes.on('click','.seach_lis',function(){
      $('#txt_seach').val($(this).html());
      document.getElementById('img_seach').click();
  })
     //添加搜索页面搜索按钮回车事件
     $('#txt_seach').on('keyup',function(e){
        var ev=e||window.event||arguments.callee.caller.arguments[0];
        if(ev.keyCode==13){
              document.getElementById('img_seach').click();
        }
     })
    //添加搜索页面搜索按钮改变事件
    $('#txt_seach').on('keyup',function(e){
        var ev=e||window.event||arguments.callee.caller.arguments[0];
        if(ev.keyCode==13){
            return false;
        }
        if($('#txt_seach').val()==""){
           $('.rgseach').css('display','block');
           $('.rgseach-clear').css('display','block');
           $('.change').css('display','none');
       }else{
            $('.seach-wrap').css('display','none')
         $.ajax({
            type:'get',
            dataType:'json',
            url:localPost+'search?searchEntry=0&searchWord='+$('#txt_seach').val()+'&currentPage=0&timeess='+timeess+'&screenDPI='+wrap_width,
            success:function(data){
                console.log(data)
                var txt="";
                txt='<div class="content-game">'+
                '<a href="'+arr[data.resArray[0].typeRes][data.resArray[0].typeInside]+'?id='+data.resArray[0].id+'">'+
                '<div class="game-img">'+
                '<img src="'+data.resArray[0].imgArray[0].fileURL+'">'+
                '</div>'+
                '<div class="game-txt">'+
                '<ul>'+
                '<li class="game-title">'+
                '<h1>'+data.resArray[0].name+'</h1>'+
                '</li>'+
                '<li class="game-cont">'+
                '<span><em>'+data.resArray[0].commentGradeDesc+'</em> '+data.resArray[0].downloadCountDesc+' '+data.resArray[0].fileSizeDesc+'</span>'+
                '</li>'+
                '<li class="game-p"><p>'+data.resArray[0].nameSub+'</p></li>'+
                '</ul>'+
                '</div>'+
                '</a>'+
                '<a href="'+data.resArray[0].fileURL+'" class="dow">下载</a>'+
                '</div>'+
                '<div class="ulis">'+
                '<ul id="ulis">';
                for(var i=1;i<data.resArray.length;i++){
                    txt+= '<li class="seach_lis">'+data.resArray[i].name+'</li>';
                    if(i==9){
                     break;
                 }
             }
             txt+='</ul>'+
             '</div>';
             $('.change').html(txt);
             $('.rgseach').css('display','none');
             $('.rgseach-clear').css('display','none');
             $('.change').css('display','block');
         }
     })
     }
 })
});
//初始化搜索 json版本
// $('#a_seach').on('click',function(){
//     $(this).parents('.wrap').css('display','none');
//     $('#seach_div').css('display','block');
// })
// $('#f_wrap').on('click',function(){
//     $('#seach_div').css('display','none');
//     $('.wrap').css('display','block')
// })
//  var json_data = JSON.parse(localStorage.getItem("json_data")); 
//     var mo=document.getElementById('seach');
//     var moduseach=mo.innerHTML;
//     var modu;
//     var seach=document.getElementById('img_seach');
//     var clear_seach=document.getElementById('clear_seach');

//     if(localStorage.getItem('json_data')){

//         for(var i=0;i<json_data.length;i++){
//             modu=moduseach.replace(/text1/g,json_data[i].aa).
//             replace(/<li style="display: none">/,"").replace(/<\/li>/,"");
//             var lis=document.createElement('li');
//             lis.innerHTML=modu;
//              mo.appendChild(lis);
//         }
//         var seach_img=mo.getElementsByTagName('img');
//         if(seach_img.length==1){
//             mo.parentNode.style.display='none';
//            }
//         for(var j=0;j<seach_img.length;j++){
//            seach_img[j].addEventListener('click',function(){
//             this.parentNode.parentNode.removeChild(this.parentNode);
//             for(var d=0;d<json_data.length;d++){
//                 if(json_data[d].aa==$(this).parent().find('span').html()){
//                    json_data.splice(d,1);
//                 localStorage.setItem("json_data",JSON.stringify(json_data));
//                 }
//             }
//            if(seach_img.length==1){
//             mo.parentNode.style.display='none';
//            }
//            })
//         }
//     }else{
//         var json_data=[];
//          localStorage.setItem("json_data",JSON.stringify(json_data));
//     }

//     seach.addEventListener('click',function(){
//         var txt=document.getElementById('txt_seach').value;
//         var jss={"aa":txt};
//         for(var i=0;i<json_data.length;i++){
//             if(json_data[i].aa==txt){
//               json_data.splice(i,1);
//             }
//         }
//         json_data.unshift(jss);
//         localStorage.setItem("json_data",JSON.stringify(json_data));
//         location.reload() 
//     })
//     clear_seach.addEventListener('click',function(){
//         json_data=[];
//         localStorage.setItem('json_data',JSON.stringify(json_data));
//         this.parentNode.style.display="none";
//     })

