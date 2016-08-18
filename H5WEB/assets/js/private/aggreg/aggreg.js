require(['jquery','loaddh','comm'],function(){
	var page=document.getElementById('J_page');
	page.onclick=function(){
    location.href=document.referrer
 }
 var wrap_width=getDpi();
 var timeess=new Date().getTime();
 var ys=0;
 var ys3=0;;
 var wrap = $('#wraps');
	//初始化页面
	  var tst = ""; //要替换的模板
    var cc = ""; //模板替换后的集合
    var ids = ""; //克隆出来的节点
    var uid=getURL();
    uid=uid.id.replace(/#/g,"");
    var pageIndex=0;
    var arr=[
    ['aggreg.html','imgList.html','imgSlide.html','fast.html'],
    ['details.html']
    ];
    var url=localPost+'coll?collId='+uid+'&typeInside=0&currentPage='+pageIndex+'&screenDPI='+wrap_width+'&timeess='+timeess;
    loads(url);
      //翻页
    $(window).on('scroll',function(){
      if($(document).height()-$(document).scrollTop()<=$(window).height()){
         setTimeout(function(){
          loads(localPost+'coll?collId='+uid+'&typeInside=0&currentPage='+pageIndex+'&screenDPI='+wrap_width+'&timeess='+timeess);
      },300)
     }
  })
    var pp=0;
    function loads(url){
     $.ajax({
      url:url,
      type:'get',
      dataType:'json',
      success:function(data){
        console.log(data);
        var test = data;
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
        $('.header-left p').html(data.info.name)
        for(var j=0;j<test.resArray.length;j++){
          cc = "";
          ids = $("#ys3").clone();
          ids.attr('id', 'content_game' + ys3);
          ids.css('display','block')
          wrap.append(ids);
          tst = $("#content_game" + ys3).html();
          console.log(tst)
          cc += tst.replace(/text0/g, test.resArray[j].imgArray[0].fileURL)
          .replace(/text2/g, test.resArray[j].name)
          .replace(/text4/g, test.resArray[j].commentGradeDesc)
          .replace(/text5/g, test.resArray[j].downloadCountDesc)
          .replace(/text6/g, test.resArray[j].fileSizeDesc)
          .replace(/text7/g, test.resArray[j].descBrief)
          .replace(/text8/g, test.resArray[j].fileURL)
          .replace(/text9/g, arr[test.resArray[j].typeRes][test.resArray[j].typeInside]+'?id='+test.resArray[j].id);
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
          $("#content_game" + ys3).find('.game-title span').css('border-color','red')
        }
        ys3++;
      }
      pageIndex++;
      pp++;
    },
    error:function(data){
     alert('页面初始化失败')
   }
 })
   }
	//解析url
	function getURL(){
		var url=window.location.search;
		var obj=new Object();
		if(url.indexOf('?')!=-1){
			var txt=url.substr(1);
			var strs=txt.split('&');
			for(var i=0;i<strs.length;i++){
				obj[strs[i].split('=')[0]]=strs[i].split('=')[1];
			}
			return obj;
		}
	}
})
