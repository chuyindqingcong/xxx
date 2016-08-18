var div=document.createElement('div');
div.className='login-dh';
var img=document.createElement('img');
img.setAttribute('src','../../assets/images/loading.png');
var span=document.createElement('span');
span.innerHTML="页面加载中。。。";
div.appendChild(img);
div.appendChild(span);
document.getElementById('wrap').appendChild(div);