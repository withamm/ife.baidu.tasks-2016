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
	var btn = document.getElementsByTagName('button');
	var tree = document.getElementsByTagName('div');
	var rootOfTree = tree[0];
	var dataList = [];
	var a = [];
	var b = null;
	var match = null;
	var timer = null;

	EventUtil.addHandler(btn[0],'click',depthFirstTraversal);
	EventUtil.addHandler(btn[1],'click',breadthFirstTraversal);
	EventUtil.addHandler(btn[2],'click',depthFirstSearch);
	EventUtil.addHandler(btn[3],'click',breadthFirstSearch);

	//深度优先遍历
	function depthFirstTraversal(){
		reset();
		depthTraval(rootOfTree);
		changeColor();
	}
	function depthTraval(rootOfTree){
		if (rootOfTree) {
			dataList.push(rootOfTree);
			depthTraval(rootOfTree.firstElementChild);
			depthTraval(rootOfTree.nextElementSibling);
		}
	}

	//广度优先遍历
	function breadthFirstTraversal(){
		reset();
		breadthTraval(rootOfTree);
		changeColor();
	}

	function breadthTraval(rootOfTree){
		if (rootOfTree) {
			dataList.push(rootOfTree);
			a.push(rootOfTree);
			breadthTraval(rootOfTree.nextElementSibling);
			b = a.shift();
			breadthTraval(b.firstElementChild);
		}
	}

	//深度优先查询
	function depthFirstSearch(){
		reset();
		depthSearch(rootOfTree);
		changeColor();
	}
	function depthSearch(rootOfTree){
		if (rootOfTree) {
			if (rootOfTree.firstChild.nodeValue.trim()==input.value) {
				match = rootOfTree;
			}
			dataList.push(rootOfTree);
			depthSearch(rootOfTree.firstElementChild);
			depthSearch(rootOfTree.nextElementSibling);
		}
	}

	//广度优先查询
	function breadthFirstSearch(){
		reset();
		breadthSearch(rootOfTree);
		changeColor();
	}
	function breadthSearch(rootOfTree){
		if (rootOfTree) {
			if (rootOfTree.firstChild.nodeValue.trim()==input.value) {
				match = rootOfTree;
			}
			dataList.push(rootOfTree);
			a.push(rootOfTree);
			breadthSearch(rootOfTree.nextElementSibling);
			b = a.shift();
			breadthSearch(b.firstElementChild);
		}
	}

	function reset(){
		clearInterval(timer);
		for (var i = 0; i < tree.length; i++) {
			tree[i].style.backgroundColor = '#fff';
		}
		dataList = [];
		match = '';
	}

	function changeColor(){
		var i = 0;
		dataList[i].style.backgroundColor = '#fcd';
		timer = setInterval(function(){
			i++;
			if (i < dataList.length) {
				dataList[i-1].style.backgroundColor = '#fff';
				dataList[i].style.backgroundColor = '#fcd';
				if (dataList[i]==match) {
					clearInterval(timer);
					match.style.backgroundColor = '#cfd';
				}
			}else {
				clearInterval(timer);
				dataList[i-1].style.backgroundColor = '#fff';
			}
		}, 1000);
	}

}