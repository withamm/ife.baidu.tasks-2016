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

	var ul = document.getElementsByTagName('ul')[0];
	var input = document.getElementsByTagName('input')[0];
	var btn = document.getElementsByTagName('button');
	var li = document.getElementsByTagName('li');
	var p = document.getElementsByTagName('p');
	var pick = null;

	EventUtil.addHandler(btn[0],'click',add);
	EventUtil.addHandler(btn[1],'click',del);
	EventUtil.addHandler(btn[2],'click',srch);

	//展开 闭合
	function toggle(){
		for (var i = 0; i < p.length; i++) {
			EventUtil.addHandler(p[i],'click',function(){
				EventUtil.stopPropagation(this);
				renovat();
				pick = this;
				this.style.color = '#999';
				this.style.fontWeight = 'bold';
				if (this.className == 'spread') {
					this.className = 'fold';
					if (this.parentElement.children[1]) {
						this.parentElement.children[1].style.display = 'none';
					}
				}else {
					this.className = 'spread';
					if (this.parentElement.children[1]) {
						this.parentElement.children[1].style.display = 'block';
					}
				}

			})
		}
	}

	function renovat(){
		for (var i = 0; i < p.length; i++) {
			p[i].style.color = '#000';
			p[i].style.fontWeight = 'normal';
		}
	}

	function add(){
		if (ul.children[0]) {
			if (pick.parentElement.children[1]) {
				var newLi = "<li><p class='spread'>"+input.value.trim()+"</p></li>";
				pick.parentElement.children[1].innerHTML += newLi;
			}else {
				var newUl = document.createElement('ul');
				var newLi = "<li><p class='spread'>"+input.value.trim()+"</p></li>";
				newUl.innerHTML = newLi;
				pick.parentElement.appendChild(newUl); 
			}
		}else {
			var newLi = "<li><p class='spread'>"+input.value.trim()+"</p></li>";
			ul.innerHTML = newLi;
		}
		toggle();
	}

	function del(){
		pick.parentElement.parentElement.removeChild(pick.parentElement);
	}

	function srch(){
		for (var i = 0; i < p.length; i++) {
			if (p[i].innerHTML.trim()==input.value.trim()) {
				open(p[i].parentElement);
				p[i].style.color = '#fcd';
				pick=p[i]
			}
		}
	}
	function open(list){
		if (list.parentElement) {
			list.parentElement.children[0].className = 'spread';
			list.parentElement.style = 'block';
			open(list.parentElement);
		}
	}

	toggle();
}