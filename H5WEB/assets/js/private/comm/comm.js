	function getDpi(){
		var wrap_width=$(window).width()/2; //获取浏览器宽度
		var arrDpi=[120, 160, 240, 320, 480];
		var arrDpiTrue=0;
		for(var i=0;i<arrDpi.length;i++){
		    if(wrap_width<arrDpi[i]){
		    	arrDpiTrue=1;
		        wrap_width=arrDpi[i];
		        break;
		    }
		}
		if(arrDpiTrue==0){
			  wrap_width=480;
		}
		return wrap_width;

	}
var localPost='http://mk.shininghunter.com:9090/';