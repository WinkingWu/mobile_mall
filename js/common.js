//设置Cookie
function setCookie(cname,cvalue,exdays){
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname+"="+cvalue+"; "+expires;
}
//获取用户对应的value
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

function delCookie(cname){
	var exp = new Date();
	var cvalue = "******";
	exp.setTime(exp.getTime() - 1);
	if(cvalue!=null)
	document.cookie= cname + "="+cvalue+";expires="+exp.toGMTString();
}

//获取search
function getsearch(){
	if(location.search.split("?").length > 1){
		var searchArr = location.search.split("?")[1].split("&");
		var sjson = {};
		for (var k in searchArr) {
			//["__hbt=1497319721317", "user=xiaoming"]
			var arr = searchArr[k].split("=");//["user","xiaoming"];
			sjson[arr[0]] = arr[1];//sjson['user'] = 'xiaoming';
		}
		return sjson;
	}else{
		return null;
	}
}

/*
 * 判断是否登录
 */
function isLogin(){
	return getCookie("login").split('/')[1] == "done";
}
function getUser(){
	return getCookie("login").split('/')[0]
}
