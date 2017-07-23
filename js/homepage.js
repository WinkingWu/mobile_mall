
function addToggle(){
	$(".address ol").fadeIn();
	$(".address ol li").click(function(){
		var add = $(this).text();
		$(".address input").val(add);
		$(".address ol").fadeOut();
	})
}
$(function(){
	$(".search form").click(function(){
		location.href='pro_search.html'
	})
})
