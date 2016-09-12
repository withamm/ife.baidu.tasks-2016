window.onload = function () {

	var EventUtil = {
		//添加事件
	 	addHandler: function (element,type,handler) {
	 		if (element.addEventListener) {
	 		  	element.addEventListener(type, handler,false);
	 		}else if (element.attachEvent) {
				element.attachEvent('on'+type,handler);		 		  	
	 		}else {
	 			element['on'+type] = handler;
	 		}
	 	},
	 	//移除事件
	 	removeHandler: function (element,type,handler) {
	 		if (element.removeEventListener) {
	 			element.removeEventListener(type, handler,false);	
	 		}else if (element.detachEvent) {
	 			element.detachEvent('on'+type,handler);	
	 		}else {
	 			element['on'+type] = null;
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

	var input = document.getElementById('input');
	var tag = document.getElementById('tag');
	var  textarea = document.getElementById('textarea');
	var btn = document.getElementById('button');
	var hobby = document.getElementById('hobby');
	var a = [];
	var text = '';

	EventUtil.addHandler(input,"keydown",add_tag);
	EventUtil.addHandler(btn,'click',add_hobby);

	//tag部分
	function add_tag(event){
		event = EventUtil.getEvent(event);
		//32空格 188逗号 13enter
		if (event.keyCode == 32||event.keyCode == 188||event.keyCode == 13) {
			//不能重复
			for (var i = 0; i < a.length; i++) {
				if (a[i] == input.value.trim()) {
					alert('请勿重复输入！');
					return false;
				}
			}
			pushData();
		}
	}
	function pushData(){
		var text = input.value.trim();
		a.push(text);
		if (a.length==11) {
			a.shift();
			regender();
		}
		regender();
	}
	function regender(){
		var text = '';
		for (var i = 0; i < a.length; i++) {
			text += "<span>"+a[i]+"</span>"
		}
		tag.innerHTML = text;
		re_regender();
		input.value = "";
		input.focus();
	}
	function re_regender(){
		var text = '';
		for (var i = 0; i < tag.children.length; i++) {
			tag.children[i].index = i;
			EventUtil.addHandler(tag.children[i],'mouseover',function(){
				text = tag.children[this.index].innerHTML;
				tag.children[this.index].innerHTML = '点击删除：'+text;
			});
			EventUtil.addHandler(tag.children[i],'mouseout',function(){
				tag.children[this.index].innerHTML = text;
			});
			EventUtil.addHandler(tag.childNodes[i],'click',function(){
				a.splice(this.index, 1);
				regender();
			})
		}
	}

	//hobby部分
	var b = [];
	var c = [];
	function add_hobby(){
		/*var t = textarea.value.trim().split(/[,，、/ \n]/g);
		b.push(t);*/
		getArrayB();
		regenderHobby();
	}
	function getArrayB(){ 
		checkBefore();
		checkAfter();
	}
	function checkBefore(){
		var hobbies = textarea.value.trim().split(/[\r,，/、\s]/g);//回车 逗号 顿号 空格
		for (var i = 0; i < hobbies.length-1; i++) {
			for (var j = i+1; j < hobbies.length; j++) {
				if (hobbies[i]==hobbies[j]) {
					alert('输入内容重复！');
					return false;
				}
			}
		}
	}
	function checkAfter(){
		var hobbies = textarea.value.trim().split(/[\r,，/、\s]/g);//回车 逗号 顿号 空白符
		if (b.length==0) {
			pushHobbies()
		}else{
			for (var i = 0; i < b.length; i++) {
				for (var j = 0; j < hobbies.length; j++) {
					if (b[i]==hobbies[j]) {
						alert('与已输入内容重复！');
						return false;
					}
				}
			}
			pushHobbies();
		}
	}
	function pushHobbies(){
		var hobbies = textarea.value.trim().split(/[\r,，/、\s]/g);//回车 逗号 顿号 空格
		for (var i = 0; i < hobbies.length; i++) {
			if (hobbies[i].trim()=="") {
				continue;
			}
			b.unshift(hobbies[i]);
			if (b.length>10) {
				b.pop();
			}
		}
		textarea.value="";
		textarea.focus();
	}

	function regenderHobby(){
		var h = "";
		for (var i = 0; i < b.length; i++) {
			h += "<span>"+b[i]+"</span>";
		}
		hobby.innerHTML = h;
	}
}