require(['jquery','loaddh','comm'],function(){
	var page=document.getElementById('J_page');
	page.onclick=function(){
		  location.href=document.referrer
	}
	//初始化属性
	var ys1=1;
	     var wrap_width=getDpi();
	var uid=getURL();
	var timeess=new Date().getTime();
	uid=uid.id;
	var pp=0;
	var pageIndex=0;
	var url=localPost+'coll?collId='+uid+'&typeInside=3&currentPage='+pageIndex+'&screenDPI='+wrap_width+'&timeess='+timeess;
	var wrap=$('#conntent')
	var tst = ""; //要替换的模板
    var cc = ""; //模板替换后的集合
    var ids = ""; //克隆出来的节点
    var pageIndex=0;
    var arr=[
    ['aggreg.html','imgList.html','imgSlide.html','fast.html'],
    ['details.html']
    ];
    loads(url);
    //翻页
    $(window).on('scroll',function(){
    	if($(document).height()-$(document).scrollTop()<=$(window).height()){
    		setTimeout(function(){
    			loads(localPost+'coll?collId='+uid+'&typeInside=3&currentPage='+pageIndex+'&screenDPI='+wrap_width+'&timeess='+timeess);
    		},300)
    	}
    })
	//页面初始化
	function loads(url){
		$.ajax({
			type:'get',
			url:url,
			dataType:'json',
			success:function(data){
				var test=data;
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

				$('#J_page p').html(data.info.name);
				$('.top_img img').attr('src',data.info.imgArray[0].fileURL).css('display','block');
				var aaa=wrap.find('.wrap-left');
				var bbb=wrap.find('.wrap-right');
				var ccc;
				for(var i=0;i<test.resArray.length;i++){
					if(aaa.height()>bbb.height()){
						ccc=bbb;
					}else{
						ccc=aaa;
					}
					cc="";
					ids =$('#mo1').clone();
					ids.attr('id','lz'+ys1);
					ids.css('display','block');
					ccc.append(ids);
					tst=$('#lz'+ys1).html();
					cc=tst.replace(/text1/g,test.resArray[i].screenshotArray[0].fileURL)
					.replace(/text2/g,test.resArray[i].imgArray[0].fileURL)
					.replace(/text3/g,test.resArray[i].name)
					.replace(/text4/g,test.resArray[i].nameSub)
					.replace(/text5/g,test.resArray[i].fileURL)
					.replace(/text6/g,arr[test.resArray[i].typeRes][test.resArray[i].typeInside]+'?id='+test.resArray[i].id)
					.replace(/text7/g,arr[test.resArray[i].typeRes][test.resArray[i].typeInside]+'?id='+test.resArray[i].id);
					$('#lz'+ys1).html(cc);
					ys1++
				}
				pageIndex++;
				pp++;
			}
		})
	}
	//解析URL
	function getURL(){
		var url=window.location.search;
		var obj=new Object;
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
