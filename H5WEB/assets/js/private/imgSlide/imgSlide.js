require(['jquery','swiper','comm'],function(){
$('.header-left').click(function(){
     location.href=document.referrer
})
$('.wrap').css('height',$(window).height());

//初始化属性
 var wrap_width=getDpi();
 var timeess=new Date().getTime();
var uid=getURL();
uid=uid.id;
var cc="";
var txt="";
var ids="";
var ys1=1;
var url=localPost+'coll?collId='+uid+'&typeInside=2&currentPage=0&screenDPI='+wrap_width+'&timeess='+timeess;
var wrap=$('#pageup');
  var arr=[
    ['aggreg.html','imgList.html','imgSlide.html','fast.html'],
    ['details.html']
    ];
//初始化页面
$.ajax({
  type:'get',
  url:url,
  dataType:'json',
  success:function(data){
    console.log(data)
    for(var i=0;i<data.resArray.length;i++){
      ids=$('#pagemb').clone();
      ids.attr('id','dh'+ys1);
      ids.css('display','block')
      ids.attr('color',data.resArray[i].screenshotArray[0].fileURL);
      wrap.append(ids);
      txt=$('#dh'+ys1).html();
      cc=txt.replace(/text1/g,data.resArray[i].screenshotArray[0].fileURL)
      .replace(/text2/g,data.resArray[i].imgArray[0].fileURL)
      .replace(/text3/g,data.resArray[i].fileURL)
      .replace(/text4/g,data.resArray[i].name)
      .replace(/text5/g,data.resArray[i].nameSub)
      .replace(/text6/g,arr[data.resArray[i].typeRes][data.resArray[i].typeInside]+'?id='+data.resArray[i].id)
      .replace(/text7/g,arr[data.resArray[i].typeRes][data.resArray[i].typeInside]+'?id='+data.resArray[i].id);
      $('#dh'+ys1).html(cc);
      ys1++;
    }
    slide(document.getElementById('pageup'));
    $('.wrap').css('backgroundImage','url('+$('.page').eq(1).attr('color')+')');
                   $('.page a').each(function(){
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
  error:function(){
    alert('初始化失败');
  }
})
//滑动slide
function slide(obj) {
    obj.startX;
    obj.moveX;
    obj.newX;
    obj.dl;
    obj.l;
    obj.lastX = 0;
    obj.tranZ;
    obj.img;
    obj.td=0;//是否翻页
    var indexs=0;
    var gg=[];
 	  var zz=new Array();
 	        obj.img=obj.getElementsByTagName('div');
        for(var i=0;i<obj.img.length;i++){
          gg.push(-1);
          obj.img[i].style.transform='translate3d(0px, 0px,'+i*-210+'px)';
          obj.img[i].style.webkitTransform='translate3d(0px, 0px,'+i*-210+'px)';
          if(i==0){
             obj.img[0].style.transform='translate3d(0px, 0px,1px)';
             obj.img[i].style.webkitTransform='translate3d(0px, 0px,1px)';
          }
            zz[i]=parseInt(window.getComputedStyle(obj.img[i],null).webkitTransform.split(',')[14]);
            console.log(zz[0])
        }
    obj.addEventListener('touchstart', start, false);
    function start(ev) {
        var ev = ev || window.event;
        obj.startX = ev.changedTouches[0].clientX;
        obj.dl = parseInt(window.getComputedStyle(obj, null).webkitTransform.split(',')[4]);
        obj.td=0;
        ev.preventDefault();
    }
    obj.addEventListener('touchmove', move, false);
    function move(ev) {
        var ev = ev || window.event;
        obj.moveX = ev.changedTouches[0].clientX;
        obj.newX = obj.moveX - obj.startX;
        if(Math.abs(obj.newX)>10){
          obj.td=1;
        }
        obj.l = obj.dl + obj.newX;
        obj.lastX = obj.l;
        	if(obj.l>0||indexs==obj.img.length){
        		return false
        	}else{
        	obj.tranZ=parseInt(obj.l/1.53);
        	for(var i=0;i<gg.length;i++){
        		if(parseInt(window.getComputedStyle(obj.img[i], null).webkitTransform.split(',')[14])>=1){
        			gg[i]=(-gg[i]);
        		}
        		if(gg[i]==1){
        			obj.img[i].style.transform='transform(0,0,'+(210*i+obj.tranZ)+'px)';
        			obj.img[i].style.webkitTransform='translate3d(0,0,'+(210*i+obj.tranZ)+'px)';
        		}else{
        			obj.img[i].style.transform='translate3d(0,0,'+(zz[i]-obj.tranZ)+'px)';
        			obj.img[i].style.webkitTransform='translate3d(0,0,'+(zz[i]-obj.tranZ)+'px)';  
        		}
           
        	}
        obj.style.transform = 'translate3d(' + obj.l + 'px,0,0)';
        obj.style.webkitTransform = 'translate3d(' + obj.l + 'px,0,0)';
     		}
        ev.preventDefault();
    }
    obj.addEventListener('touchend', end, false);
    function end() {
      if(obj.td==1){
      if(obj.newX<0&&indexs<obj.img.length-1){
        indexs++
      }else if (obj.newX>0&&indexs>0){
        indexs--
      }
  		if(obj.newX<0&& indexs<obj.img.length){
        $('.wrap').css('backgroundImage','url('+$('#pageup .page').eq(indexs).attr('color')+')');
  			obj.style.transition='all .3s ease-out';
  			obj.style.wekitTransition='all .3s ease-out';
  			$('.page').css('transition','all .3s ease-out');
  			$('.page').css('webkitTransition','all .3s ease-out');
  			obj.img[indexs].style.transform='transform(0,0,0px)';
        	obj.img[indexs].style.webkitTransform='translate3d(0,0,0px)';
        	obj.img[indexs-1].style.transform='transform(0,0,-210px)';
        	obj.img[indexs-1].style.webkitTransform='translate3d(0,0,-210px)';
        	if(indexs<obj.img.length-1){
	        	obj.img[indexs+1].style.transform='transform(0,0,-210px)';
	        	obj.img[indexs+1].style.webkitTransform='translate3d(0,0,-210px)';
	        }
  			obj.style.transform = 'translate3d(' + (-321*(indexs)) + 'px,0,0)';
  			obj.style.webkitTransform = 'translate3d(' + (-321*(indexs)) + 'px,0,0)';
  		}else if(obj.newX>0&& indexs>=0){
        $('.wrap').css('backgroundImage','url('+$('#pageup .page').eq(indexs).attr('color')+')');
  			obj.style.transition='all .3s ease';
  			obj.style.wekitTransition='all .3s ease';
  			$('.page').css('transition','all .3s ease-out');
  			$('.page').css('webkitTransition','all .3s ease-out');
  			obj.img[indexs].style.transform='transform(0,0,0px)';
        	obj.img[indexs].style.webkitTransform='translate3d(0,0,0px)';
            if(indexs>0){
            obj.img[indexs-1].style.transform='transform(0,0,-210px)';
            obj.img[indexs-1].style.webkitTransform='translate3d(0,0,-210px)';
          }
        	if(indexs<obj.img.length){
            obj.img[indexs+1].style.transform='transform(0,0,-210px)';
            obj.img[indexs+1].style.webkitTransform='translate3d(0,0,-210px)';
	        }
  			obj.style.transform = 'translate3d(' + (-321*(indexs)) + 'px,0,0)';
  			obj.style.webkitTransform = 'translate3d(' + (-321*(indexs)) + 'px,0,0)';
  		}
  		timer=setTimeout(function(){
  			obj.style.transition='none';
  			obj.style.wekitTransition='none';
  			$('.page').css('transition','none');
  			$('.page').css('webkitTransition','none');
  		},300)
    }
    }
}
//解析URL
function getURL(){
  var url=window.location.search;
  var obj=new Object;
  if(url.indexOf('?')!=-1){
    var txt=url.substr(1);
    var strs=txt.split('&');
    for (var i=0;i<strs.length;i++){
      obj[strs[i].split('=')[0]]=strs[i].split('=')[1];
    }
    return obj;
  }
}
})