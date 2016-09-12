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

	var btn = document.getElementsByTagName('button');
	var input = document.getElementsByTagName('input');
	var div = document.getElementsByTagName('div');
	var rootOfDiv = div[0];
	var divList = [];
	var a = [];
	var b = null;
	var match = null;
	var timer = null;
	var getDiv = null;	//存放点击的div

	EventUtil.addHandler(btn[0],'click',depthFirstTraversal);
	EventUtil.addHandler(btn[1],'click',breadthFirstTraversal);
	EventUtil.addHandler(btn[2],'click',depthFirstSearch);
	EventUtil.addHandler(btn[3],'click',breadthFirstSearch);
	EventUtil.addHandler(btn[4],'click',addDiv);
	EventUtil.addHandler(btn[5],'click',deleteDiv);

	selectDiv();

	//选中div
	function selectDiv(){
		var event = EventUtil.getEvent(event);
		for (var i = 0; i < div.length; i++) {
			EventUtil.addHandler(div[i],'click',function(event){
				for (var i = 0; i < div.length; i++) {
					div[i].style.backgroundColor = '#fff';
				}
				getDiv = this;
				this.style.backgroundColor = '#cdf';
				EventUtil.stopPropagation(event);	//阻止事件冒泡
			});
		}
	}

	//增加div
	function addDiv(){
		var newDiv = document.createElement('div');
		var value = document.createTextNode(input[1].value);
		newDiv.appendChild(value);
		getDiv.appendChild(newDiv);
		selectDiv();
		renovat();
		newDiv.style.backgroundColor = '#cdf';
	}

	//删除div
	function deleteDiv(){
		getDiv.parentNode.removeChild(getDiv);
		selectDiv();
		renovet();
	}
	
	//深度优先遍历
	function depthFirstTraversal(){
		renovat();
		depthTraval(rootOfDiv);
		changeColor();
	}
	function depthTraval(rootOfDiv){
		if (rootOfDiv) {
			divList.push(rootOfDiv);
			depthTraval(rootOfDiv.firstElementChild);
			depthTraval(rootOfDiv.nextElementSibling);
		}
	}

	//广度优先遍历
	function breadthFirstTraversal(){
		renovat();
		breadthTraval(rootOfDiv);
		changeColor();
	}
	function breadthTraval(rootOfDiv){
		if (rootOfDiv) {
			divList.push(rootOfDiv);
			a.push(rootOfDiv);
			breadthTraval(rootOfDiv.nextElementSibling);
			b = a.shift();
			breadthTraval(b.firstElementChild);
		}
	}

	//深度优先查询
	function depthFirstSearch(){
		renovat();
		depthSearch(rootOfDiv);
		changeColor();
	}
	function depthSearch(rootOfDiv){
		if (rootOfDiv) {
			if (rootOfDiv.firstChild.nodeValue.trim()==input[0].value) {
				match = rootOfDiv;
			}
			divList.push(rootOfDiv);
			depthSearch(rootOfDiv.firstElementChild);
			depthSearch(rootOfDiv.nextElementSibling);
		}
	}

	//广度优先查询
	function breadthFirstSearch(){
		renovat();
		breadthSearch(rootOfDiv);
		changeColor();
	}
	function breadthSearch(rootOfDiv){
		if (rootOfDiv) {
			if (rootOfDiv.firstChild.nodeValue.trim()==input[0].value) {
				match = rootOfDiv;
			}
			divList.push(rootOfDiv);
			a.push(rootOfDiv);
			breadthSearch(rootOfDiv.nextElementSibling);
			b = a.shift();
			breadthSearch(b.firstElementChild);
		}
	}

	function renovat(){
		clearInterval(timer);
		for (var i = 0; i < div.length; i++) {
			div[i].style.backgroundColor = '#fff';
		}
		divList = [];
		input[0].value = '';
		input[1].value = '';
		getDiv = '';
	}
	function changeColor(){
		var i = 0;
		divList[i].style.backgroundColor = '#fcd';
		timer = setInterval(function(){
			i++;
			if (i<div.length) {
				divList[i-1].style.backgroundColor = '#fff';
				divList[i].style.backgroundColor = '#fcd';
				if (divList[i]==match) {
					divList[i].style.backgroundColor = '#cfd';
					clearInterval(timer);
				}
			}else {
				divList[divList.length-1].style.backgroundColor = '#fff';
				clearInterval(timer);
			}
		}, 1000);
	}
}