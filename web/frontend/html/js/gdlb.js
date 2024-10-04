/*更新如下：
1.解决了快速点击切换过快。现在连击切换有延迟。
2.解决了小圆点和左右按钮现在可以不要。而不会出现的bug
3.

*/

//1个是父级名。调用方式如下
$(function(){
imgscrool('#ban1');
//imgscrool('#ban2');
})

//这是函数
function imgscrool(obj){
	var moving = false;		
	var width = $(obj+" .gdt .gdt-img .divpicture").width();
	var i=0;
	var clone=$(obj+" .gdt .gdt-img .divpicture").first().clone();
	$(obj+" .gdt .gdt-img").append(clone);	
	var size=$(obj+" .gdt .gdt-img .divpicture").size();	
	for(var j=0;j<size-5;j++){
		$(obj+" .gdt .num").append("<li></li>");
	}
	$(obj+" .gdt .num li").first().addClass("on");

	/*鼠标划入圆点*/
	if ($(obj+" .gdt .num li")) {

	$(obj+" .gdt .num li").hover(function(){
		var index=$(this).index();
		i=index;
		$(obj+" .gdt .gdt-img").stop().animate({right:-index*width},1000);
		$(this).addClass("on").siblings().removeClass("on");
	})
	};

	/*自动轮播*/
	var t=setInterval(function(){
		i++;
		move();
	},4000);

	/*对gdt定时器的操作*/
	$(obj+" .gdt").hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
			i++
			move();
		},10000)
	});

/*	if ($(obj+" .gdt .btn_l")) {

	//向左的按钮
	$(obj+" .gdt .btn_l").stop(true).click(function(){
	if(moving){
	return;
	};
	moving=true;
		i--;
		move();	
	})
	
	//向右的按钮
	$(obj+" .gdt .btn_r").stop(true).click(function(){
	if(moving){
	return;
	}
	moving=true;
		i++;
		move();
	})

	};*/
	
	function move(){
		
		if(i==size){
			$(obj+" .gdt  .gdt-img").css({right:0});
			i=1;
		}
		
		// 修改轮播每屏宽度
		if(i==-1){
			$(obj+" .gdt .gdt-img").css({right:-(size-1)*width});
			i=size-2;
		}	
		$(obj+" .gdt .gdt-img").stop(true).delay(200).animate({right:-i*width},1000,function(){
			moving = false;
		})
		
		if(i==size-1){
			$(obj+" .gdt .num li").eq(0).addClass("on").siblings().removeClass("on")	
		}else{		
			$(obj+" .gdt .num li").eq(i).addClass("on").siblings().removeClass("on")	
		}
	}
}