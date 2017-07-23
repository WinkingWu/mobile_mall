// JavaScript Document

$(function(){
	var liLen=$(".banner ul li").length;
	var winW=$(window).width();
	var index=0;
	var bool = true;
	for(var i=0;i<liLen;i++){
		$(".banner ul li").eq(i).css("left",i*winW+"px");
	}
	$(window).resize(function(){
		console.log("-----------窗口发生变化---------------")
		location.reload();
	})
	
	
	
	
	/*点击圆点切换轮播图*/
	$(".circle li").click(function(){
		if(bool){
			var onIndex=$(".circle li.on").index();
		index=$(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		if(index>onIndex){
			for(var i=0;i<(index-onIndex);i++){
				$(".banner ul li").eq(i).animate({"left":-winW+"px"},function(){
					$(this).css("left",(liLen-1)*winW+"px").appendTo(".banner ul");
					})
				}
			$(".banner ul li").eq(index-onIndex).animate({"left":0})
			for(var i=index-onIndex+1;i<liLen;i++){
				$(".banner ul li").eq(i).animate({"left":(i-(index-onIndex))*winW+"px"})
				}
			}
		
		if(index<onIndex){
			$(".banner ul li").eq(0).animate({"left":winW+"px"})
			for(var i=liLen-1;i>liLen-1-(onIndex-index);i--){
				$(".banner ul li").eq(i).css("left",(i-liLen)*winW+"px").animate({"left":(i-liLen+(onIndex-index))*winW+"px"},function(){
					$(this).prependTo(".banner ul");	
					})
				}
				
			}
		}
	})
	
	/*手势滑动*/
	$(".banner").swipe({
		swipeLeft: next,
		swipeRight:	prve
	})
	
	function next(){
		if(bool){
			bool=false;
			index=$(".circle li.on").index();
			index++;
			if(index==liLen){
				index=0;	
			}
			$(".circle li").eq(index).addClass("on").siblings().removeClass("on");
			for(var i=1;i<liLen;i++){
				$(".banner ul li").eq(i).animate({"left":(i-1)*winW+"px"})
			}	
			
			$(".banner ul li").eq(0).animate({"left":-winW+"px"},function(){
				$(this).appendTo(".banner ul").css("left",(liLen-1)*winW+"px");	
				bool=true;
			})	
		}
	}
	function prve(){
		if(bool){
			bool=false;
			index=$(".circle li.on").index();
			index--;
		
		if(index<0){
			index=liLen-1;
			}
			
			$(".circle li").eq(index).addClass("on").siblings().removeClass("on");
			for(var i=0;i<liLen-1;i++){
				$(".banner ul li").eq(i).animate({"left":(i+1)*winW+"px"})	
			}	
			$(".banner ul li").eq(-1).css("left",-winW+"px").animate({"left":0},function(){
				$(this).prependTo(".banner ul")	
				bool=true;
			})	
		}
	}
	
	/*自动轮播*/
	lunbo=setInterval(next,3000)
	
	
})