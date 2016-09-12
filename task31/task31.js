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
	var row = document.getElementsByClassName('row');
	var radio = document.getElementsByClassName('radio');
	var input = document.getElementsByTagName('input');
	var city = document.getElementById('city');
	var cityOption = city.getElementsByTagName('option');
	var school = document.getElementById('school');
	var schoolOption = school.getElementsByTagName('option');
	var schools = [
		['北京大学','清华大学','北京科技大学'],
		['上海复旦大学','上海财经大学'],
		['山东大学','山东财经大学']
	]

	EventUtil.addHandler(input[0],'click',inSchool);
	EventUtil.addHandler(input[1],'click',outSchool);
	for (var i = 0; i < cityOption.length; i++) {
		cityOption[i].index = i;
		EventUtil.addHandler(cityOption[i],'click',chooseSchool);
	}

	//初始化页面状态
	renovat();

	function renovat(){
		for (var i = 0; i < radio.length; i++) {
			radio[i].checked = false;
		}
		for (var i = 1; i < row.length; i++) {
			row[i].style.display = 'none';
		}
		city[0].selected = true;
	}

	function inSchool(){
		radio[1].checked = false;
		row[1].style.display = 'block';
		row[2].style.display = 'none';
	}

	function outSchool(){
		radio[0].checked = false;
		row[1].style.display = 'none';
		row[2].style.display = 'block';
	}

	function chooseSchool(){
		for (var i = 0; i < city.length; i++) {
			city[i].index = i;
			EventUtil.addHandler(city[i],'click',addSchool); 
		}
	}

	function addSchool(){
		var j = this.index;
		var op = null;
		for (var i = 0; i < schools[j].length; i++) {
			op += '<option>'+schools[j][i]+'</option>';
		}
		school.innerHTML = op;
	}


}