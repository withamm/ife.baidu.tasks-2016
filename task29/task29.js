window.onload = function () {
	 
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

	var input = document.getElementsByTagName('input')[0];
	var btn = document.getElementsByTagName('button')[0];
	var note = document.getElementsByClassName('note')[0];

	EventUtil.addHandler(btn,'click',validate);

	function validate(){
		var l = input.value.trim().replace(/[^x00-xff]/g, 'xx').length;
		if (l == 0) {
			note.innerHTML = "输入不能为空！";
			note.style.color = '#f00';
			input.style.borderColor = '#f00';
		}else if ( l >=4 && l <= 14) {
			note.innerHTML = "输入格式正确！";
			note.style.color = '#0f0';
			input.style.borderColor = '#0f0';
		}else {
			note.innerHTML = "输入格式错误！"
			note.style.color = '#f00';
			input.style.borderColor = '#f00';
		}
	}
		//匹配双字节字符(包括汉字在内)：[^x00-xff] 
　　	//可以用来计算字符串的长度（一个双字节字符长度计2，ASCII字符计1） 
}