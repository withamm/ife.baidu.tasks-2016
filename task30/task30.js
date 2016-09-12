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

	var input = document.getElementsByTagName('input');
	var btn = document.getElementsByTagName('button');
	var note = document.getElementsByClassName('note');
	var defaultCue =['必填，长度为4-16个字符','必填，长度为6-12个字母、数字、或下划线','请再次输入密码','请输入邮箱地址','请输入手机号码'];
	var rightCue = ['名称格式正确','密码格式正确','密码格式正确','邮箱格式正确','手机格式正确'];
	var wrongCue = ['名称格式错误','密码格式错误','密码输入错误','邮箱格式错误','手机格式错误'];
	var check = [
		//验证名称
		function validateName(str){
			return /^\w{4,16}$/.test(str.replace(/[^x00-xff]/g,"nn"));
		},

		//验证密码
		function validatePassword(str){
			return /^\w+$/.test(str);
		},

		//再次验证密码
		function secondPassword(str){
			if (str) {
				if (str==input[1].value) {
				return true;
				}
			}
		},

		//验证邮箱
		function validateMail(str){
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
		},

		//验证手机
		function validatePhone(str){
			return /^[1][0-9]{10}$/.test(str);
		},
	]

	//绑定事件
	for (var i = 0; i < input.length; i++) {
		input[i].index = i;
		EventUtil.addHandler(input[i],'focus',getFocus);
		EventUtil.addHandler(input[i],'blur',loseFocus);
	}

	EventUtil.addHandler(btn[0],'click',submitForm);

	//获得焦点
	function getFocus(){
		this.className = 'getFocus';
		note[this.index].innerHTML = defaultCue[this.index];
		note[this.index].style.color = '#999';
	}

	//失去焦点
	function loseFocus(){
		this.className = '';
		var i = check[this.index](this.value);
		if (i) {
			this.className = 'right';
			note[this.index].innerHTML = rightCue[this.index];
			note[this.index].style.color = '#0f0';
		}else {
			this.className = 'wrong';
			note[this.index].innerHTML = wrongCue[this.index];
			note[this.index].style.color = '#f00';
		}
		
	}

	//提交按钮
	function submitForm(){
		var a = null;
		for (var i = 0; i < 5; i++) {
			if (input[i].className == 'right') {		
				a++;
			}
		}
		if (a == 5) {
			alert('提交成功！');
		}else {
			alert('提交失败！');
		}
	}

}