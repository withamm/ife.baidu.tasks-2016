
window.onload = function(){
	///////////////////////事件处理：跨浏览器（根据能力判断）///////////////////////////////////////

	var EventUtil={

		addHandler:function (element,event,handler) {
			if (element.addEventListener) {
				element.addEventListener(event,handler,false);	//DOM2级(事件名，事件处理函数，false冒泡true捕获)
			}else if (event.attachEvent) {
				element.attachEvent('on'+event,handler);		//IE
			}else {
				element['on'+event]=handler;					//DOM0级
			}		 
		},

		removeHandler:function(element,event,handler){
			if (element.removeEventListener) {
				element.removeEventListener(event,handler,false);
			}else if (element.detachEvent) {
				element.detachEvent('on'+event,handler);
			}else{
				element['on'+event]=null;
			}
		},
		//返回对event对象的引用
	 	getEvent: function (event) {
	 		 return event ? event : window.event; 
	 	},
	 	//返回事件的目标
	 	getTarget: function (event) {
	 		 return event.target ? event.target : event.srcElement; 
	 	},
	 	//取消事件的默认行为
	 	preventDefault: function (event) {
	 		if (event.preventDefault) {
	 		  	event.preventDefault();
	 		}else{
	 			event.returnValue = false;
	 		}
	 	},
	 	//阻止事件冒泡
	 	stopPropagation: function (event) {
	 		if (event.stopPropagation) {
	 			event.stopPropagation();	
	 		}else{
	 			event.cancleBubble = true;
	 		}
	 	}
	}
	// EventUtil.addHandler(btn,'click',showMsg);

	var btn = document.getElementsByTagName('button')[0];
	var groundFloor = document.getElementById('groundFloor');
	var floatFloor = document.getElementById('floatFloor');
	var scrollH = document.documentElement.clientHeight;


	EventUtil.addHandler(btn,'click',popupWindow);
	EventUtil.addHandler(groundFloor,'click',fade);
	EventUtil.addHandler(floatFloor,'mousedown',whenMouseDown);
	
	function popupWindow(){

		groundFloor.style.cssText = 'height:'+scrollH+'px';
		groundFloor.style.display = 'inline-block';
		floatFloor.style.display = 'inline-block';
	
	}

	function fade(){
		groundFloor.style.display = 'none';
		floatFloor.style.display = 'none';
	}

	function whenMouseDown(event){
		//鼠标按下时 鼠标与面板左边的距离
		var  event = event || window.event;

		var disX=event.clientX-floatFloor.offsetLeft;
		var disY=event.clientY-floatFloor.offsetTop;


		//移动
		EventUtil.addHandler(document,'mousemove',whenMouseMove);
		function whenMouseMove(event){
			var event=event||window.event;
			fnMove(event,disX,disY);
		}

		//释放鼠标
		EventUtil.addHandler(document,'mouseup',whenMouseUp);
		function whenMouseUp(event){
			EventUtil.removeHandler(document,'mousemove',whenMouseMove);
			EventUtil.removeHandler(document,'mouseup',whenMouseUp);
		}

	}

	function fnMove(e,posx,posy){
		//弹窗左上角坐标
		var l = e.clientX - posx;
		var t = e.clientY - posy;
		//页面宽高
		var  winW = document.documentElement.clientWidth || document.body.clientWidth;
		var  winH = document.documentElement.clientHight || document.body.clientHight;

		var  maxW = winW - floatFloor.offsetWidth;
		var  maxH = winH - floatFloor.offsetHeight; 
		
		if (l<0) {
			l = 0;
		}else if (l>maxW) {
			l = maxW;
		}
		if (t<0) {
			t = 0;
		}else if (t>maxH) {
			t = maxH;
		}
		floatFloor.style.left = l+'px';
		floatFloor.style.top = t+'px';
	}

}
