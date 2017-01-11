function fontAuto(width){
	var winw=document.documentElement.clientWidth;
	if(winw>=width)
	{
		document.documentElement.style.fontSize="625%";
		
	}
	else
	{
		document.documentElement.style.fontSize=(winw/width*625)+"%";
	}
	
}
fontAuto(750);
window.onresize=function(){
	fontAuto(750);
}
