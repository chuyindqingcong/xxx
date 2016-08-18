	
	var txt=document.createElement('div');
	var aa=document.createElement('a');
	aa.innerHTML="单击下载APP";
	aa.href="http://market.navrise.com/download/suishouwan_1.4.8.apk";
	txt.className="app";
	txt.appendChild(aa);
	aa.style.color="#fff";
	aa.style.display="inline-block";
	aa.style.width="80%";
	var bodys=document.getElementsByTagName('body');
	bodys[0].appendChild(txt);


