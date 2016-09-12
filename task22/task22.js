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

	var tree = document.getElementsByTagName('div');
	var treeRoot = tree[0];
	var btn = document.getElementsByTagName('button');
	var dataList = [];
	var timer = null;

	EventUtil.addHandler(btn[0],'click',preorderTraversal);		//DLR
	EventUtil.addHandler(btn[1],'click',inorderTraversal);		//LDR
	EventUtil.addHandler(btn[2],'click',postorderTraversal);	//LRD

	//前序遍历 DLR
	function preorderTraversal(){
		dataList = [];
		clearInterval(timer);
		for (var i = 0; i < tree.length; i++) {
			tree[i].style.backgroundColor = '#fff';
		}
		preTraval(treeRoot);
		changeColor();
	}
	function preTraval(treeRoot){
		if (!(treeRoot==null)) {
			dataList.push(treeRoot);
			preTraval(treeRoot.children[0]);
			preTraval(treeRoot.children[1]);
		}
	}
	//中序遍历 LDR
	function inorderTraversal(){
		dataList = [];
		clearInterval(timer);
		for (var i = 0; i < tree.length; i++) {
			tree[i].style.backgroundColor = '#fff';
		}
		inTraval(treeRoot);
		changeColor();
	}
	function inTraval(treeRoot){
		if (!(treeRoot==null)) {
			inTraval(treeRoot.children[0]);
			dataList.push(treeRoot);
			inTraval(treeRoot.children[1]);
		}
	}
	//后序遍历 LRD
	function postorderTraversal(){
		dataList = [];
		clearInterval(timer);
		for (var i = 0; i < tree.length; i++) {
			tree[i].style.backgroundColor = '#fff';
		}
		postTraval(treeRoot);
		changeColor();
	}
	function postTraval(treeRoot){
		if (!(treeRoot==null)) {
			postTraval(treeRoot.children[0]);
			postTraval(treeRoot.children[1]);
			dataList.push(treeRoot);
		}
	}

	function changeColor(){
		var i = 0;
		dataList[i].style.background = '#ffccdd';
		timer = setInterval(function(){{
			i++;
			if (i<dataList.length) {
				dataList[i-1].style.backgroundColor = '#fff';
				dataList[i].style.backgroundColor = '#ffccdd';
			}else {
				dataList[i-1].style.backgroundColor = '#fff'
				clearInterval(timer);
			}
		}}, 1000);
	}
}