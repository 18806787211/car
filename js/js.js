var jsonObj={
	sum:0
}

/*index*/
/*slide*/
  var swiper = new Swiper('.swiper-container', {
   /* pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',*/
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true,//循环
    autoplay: 3000,//每隔3秒自动触发
    autoplayDisableOnInteraction: false//滑动屏幕结束后自动播放继续执行
});


/*模拟tap*/
$.fn.extend({//代码封装
	tap:function(callback){//callback随便定义的变量
		this.each(function(){
			this.addEventListener("touchend",callback);
		});

	}
})
/*sellcar*/
/*筛选*/

$(".fix").tap(function(e){//点击黑色幕布退出
	var event=window.event || e;
	var target=event.srcElement || event.target;
	//console.log(target.className);
	if($(target).hasClass("fix"))
	{
		
		$(".fix").removeClass("fix_in");
		$(".fix_btn").removeClass("fix_btn_in");
		$(".fix ul").eq(jsonObj.nowpos).removeClass("screen_in");
	}
	
});
$(".cancel").tap(function(){
	$(".fix_text").html("<b>筛选条件：</b>");
});



$(".sellcar_header li").tap(function(){
	jsonObj.nowpos=$(this).index();	
	$(".fix").addClass("fix_in");
	$(".fix_btn").addClass("fix_btn_in");
	$(".fix .screen").eq(jsonObj.nowpos).addClass("screen_in").siblings().removeClass("screen_in");
	
	
	
	
});


$(".screen").tap(function(e){
	var event=window.event || e;
	var target=event.srcElement || event.target;
	//console.log(target);
	var aNode=target.tagName.toLowerCase();
	if(aNode==="a")
	{
		var bool=$(target).siblings("ul").is(":hidden");

		if(bool)
		{			
			$(target).siblings("ul").show();
		}
		else
		{			
			$(target).siblings("ul").hide();
	
		}
		
		function insertObj(){
				var a1=$(target).text();
				var a2=$(target).parent("li").parent("ul").siblings("a").text();
				
				
				var a3=$(target).parent("li").parent("ul").siblings("a").parent("li").parent("ul").siblings("a").text();
				  if(jsonObj.nowpos==0)
				  {
				  	var spanNode=$("<span class='a'></span>").html(a3+" "+a2+" "+a1);
					  	for(var i=0; i<$(".fix_text span").length;i++)//寻找是否有class为a的类，有就替换
								{
									if($(".fix_text span").hasClass("a"))
										{
											$(".fix_text .a").text(a3+" "+a2+" "+a1);
											return;
										}
								}
				  	$(".fix_text").append(spanNode);
				  }
					else if(jsonObj.nowpos==1)
					{
						var spanNode=$("<span class='b'></span>").html(a3+" "+a2+" "+a1);				
					  	for(var i=0; i<$(".fix_text span").length;i++)
								{
									if($(".fix_text span").hasClass("b"))
										{
											$(".fix_text .b").text(a3+" "+a2+" "+a1);
											return;
										}
								}
				  	$(".fix_text").append(spanNode);
					}
					else if(jsonObj.nowpos==2)
					{
						var spanNode=$("<span class='c'></span>").html(a3+" "+a2+" "+a1);
						
					  	for(var i=0; i<$(".fix_text span").length;i++)
								{
									if($(".fix_text span").hasClass("c"))
										{
											$(".fix_text .c").text(a3+" "+a2+" "+a1);
											return;
										}
								}
				  	$(".fix_text").append(spanNode);
					}
				
		}
		
		//console.log($(target).siblings("ul").length);
		if($(target).siblings("ul").length==0){
		
					insertObj();
			
		}
		
		
		
	}
	
	
	
});


/*sellcar*/
/*iscroll*/
if($("#wrapper").length!=0)
{
jsonObj.myScroll = new IScroll('#wrapper', { //click:true;iscroll中的一个bug，如果想让列表能点击跳转到别的页面，需添加click:true事件
		mouseWheel: true ,
		click:true,
		probeType:1
		
	});/*需要使用iscroll-probe.js才能生效probeType:1 滚动不繁忙的时候触发;probeType：2 滚动时每隔一定时间触发;probeType：3 每滚动一像素触发一次*/
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	var time;//记录
	jsonObj.myScroll.on('scroll',function(){//需要跟probeType:3配合才有效果
		//console.log(this.y);
		var screenH=$('#wrapper').height();//获取div标签屏幕的高度
		var divH=$('#scroller').height();//获取scroller里内容的高度
		var screendiv=divH-screenH;//相减得出隐藏的内容的高度
		//console.log(this.y,screendiv);
		
		if(this.y>=18)
		{
			time=1;//随便标记一下
			$('.up').html('松开看看');
			
		}
		else if(this.y<=-screendiv)
		{
			time=2;//随便标记一下
			$('.down').html('松开加载更多...');
			
		}
		//console.log(time);
	});
	
	jsonObj.myScroll.on('scrollEnd',function(){//需要跟probeType:3配合才有效果
	
		if(time==1)
		{
		
			$('.up').html('下拉刷新');
			location.reload();//页面刷新
			
		}
		if(time==2)
		{
			//console.log(1);
			$('.down').html('更多...');
			/*$.ajax({
				type:"get",
				url:"json.json",
				dataType:"json",//预期服务器返回的数据类型
				success:function(arr){
					
					var frag=document.createDocumentFragment();//创建碎片
					for(var i=0;i<arr.length;i++)
					{
						var lis=$("<li/>").html(arr[i].text);					
						$(frag).append(lis);
					}
					$(".sellcar_up_list").append($(frag));				
					myScroll.refresh();//刷新整个滑动的高度	
					time=null;//吧time变成空，就不会进入这个if，为了下拉的时候显示“下拉刷新”这个几个字。
				},
				error:function(){
					alert("服务器忙，请稍后再试！");
				}
			});
			*/
		}
		
	});

}

/*mysellcar*/

$(".select a").click(function(){
	if($(this).find(".mysellcar_img01 i").hasClass("mysellcar_select"))
	{
		$(this).find(".mysellcar_img01 i").removeClass("mysellcar_select");
		jsonObj.sum--;
	}
	else
	{
			$(this).find(".mysellcar_img01 i").addClass("mysellcar_select");
			jsonObj.sum++;
	}
			$(".mysellcar_bottom span").text(jsonObj.sum);
	//$(this).addClass("mysellcar_select");
});
$(".mysellcar_bottom a").tap(function(){
	if($(".select a").find("i").hasClass("mysellcar_select"))
	{
		$(".mysellcar_select").parent("dd").parent("dl").parent("a").parent("li").remove();
			jsonObj.sum=0;
			$(".mysellcar_bottom span").text(jsonObj.sum);
			jsonObj.myScroll.refresh();//刷新整个滑动的高度
			var divH=$('#scroller').height();//获取scroller里内容的高度
			var windowObj=$(window).height();//获取整个屏幕的高度
			console.log(divH,windowObj);
			if(divH<windowObj)
			{
				$(".down").hide();
			}
			else
			{
				$(".down").show();
			}
				
	
	}
});


/*push.html*/
$(".push_a1").tap(function(){	
	$(".fix").addClass("fix_in");
	$(".push_brand").addClass("screen_in");
	$(".push_cartype").removeClass("screen_in");
	$(".push_carcolor").removeClass("screen_in");
	$(".buypush_add").removeClass("screen_in");
	
});	
	$(".push_a2").tap(function(){
		$(".fix").addClass("fix_in");
		$(".push_carcolor").addClass("screen_in");
		$(".push_brand").removeClass("screen_in");
		$(".push_cartype").removeClass("screen_in");
		$(".buypush_add").removeClass("screen_in");
	});
	$(".push_a3").tap(function(){
		$(".fix").addClass("fix_in");
		$(".push_cartype").addClass("screen_in");
		$(".push_carcolor").removeClass("screen_in");
		$(".push_brand").removeClass("screen_in");
		$(".buypush_add").removeClass("screen_in");
	});

	




$(".push_brand a").tap(function(e){
	var event=window.event || e;
	var target=event.srcElement || event.target;
	//console.log(target);
	if($(target).siblings("ul").length==0){
		var a1=$(target).text();
		var a2=$(target).parent("li").parent("ul").siblings("a").text();
		var a3=$(target).parent("li").parent("ul").siblings("a").parent("li").parent("ul").siblings("a").text();
			$(".push_title").text(a3+" "+a2+" "+a1);		
			$(".fix").removeClass("fix_in");
			$(".push_brand").removeClass("screen_in");
		}
	
});

$(".push_carcolor a").tap(function(e){
	var event=window.event || e;
	var target=event.srcElement || event.target;
	//console.log(target);
	if($(target).siblings("ul").length==0){
		var a1=$(target).text();
		var a2=$(target).parent("li").parent("ul").siblings("a").text();
		var a3=$(target).parent("li").parent("ul").siblings("a").parent("li").parent("ul").siblings("a").text();
			$(".push_color").text(a3+" "+a2+" "+a1);		
			$(".fix").removeClass("fix_in");
			$(".push_carcolor").removeClass("screen_in");
		}
	
});
$(".push_cartype a").tap(function(e){
	var event=window.event || e;
	var target=event.srcElement || event.target;
	//console.log(target);
	if($(target).siblings("ul").length==0){
		var a1=$(target).text();
		var a2=$(target).parent("li").parent("ul").siblings("a").text();
		var a3=$(target).parent("li").parent("ul").siblings("a").parent("li").parent("ul").siblings("a").text();
			$(".push_type").text(a3+" "+a2+" "+a1);		
			$(".fix").removeClass("fix_in");
			$(".push_cartype").removeClass("screen_in");
		}
	
});


/*mybuycar*/
jsonObj.divH=$('#scroller').height();//获取scroller里内容的高度
jsonObj.windowObj=$(window).height();//获取整个屏幕的高度
//console.log(divH,windowObj);
if(jsonObj.divH<jsonObj.windowObj)
{
	$(".down").hide();
}
else
{
	$(".down").show();
}

/*buypush*/
$(".push_a4").tap(function(){
	$(".fix").addClass("fix_in");
	$(".buypush_add").addClass("screen_in");
	$(".push_carcolor").removeClass("screen_in");
	$(".push_brand").removeClass("screen_in");
	$(".push_cartype").removeClass("screen_in");
});

$(".buypush_add a").tap(function(e){
	var event=window.event || e;
	var target=event.srcElement || event.target;
	//console.log(target);
	if($(target).siblings("ul").length==0){
		var a1=$(target).text();
		var a2=$(target).parent("li").parent("ul").siblings("a").text();
		var a3=$(target).parent("li").parent("ul").siblings("a").parent("li").parent("ul").siblings("a").text();
			$(".push_which").text(a3+" "+a2+" "+a1);		
			$(".fix").removeClass("fix_in");
			$(".buypush_add").removeClass("screen_in");
			
		}
	
});






