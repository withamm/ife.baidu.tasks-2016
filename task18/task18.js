window.onload = function(){
	var input = document.getElementById('input');
	var btn = document.getElementsByTagName('button');
	var show = document.getElementsByClassName('show')[0];
	var line = [];
	var EventUtil = {
		addHandler: function(element,type,handler){
			if (element.addEventListener) {
				element.addEventListener(type, handler,false);
			}else if (element.attachEvent) {
				element.attachEvent("on"+type,handler);	
			}else{
				element["on"+type] = handler;
			}
		}
	}

	EventUtil.addHandler(btn[0],"click",add_right);
	EventUtil.addHandler(btn[1],"click",add_left);
	EventUtil.addHandler(btn[2],"click",delete_right);
	EventUtil.addHandler(btn[3],"click",delete_left);

	function regender(){
		var li = "";
		for (var i = 0; i < line.length; i++) {
			li += "<span>"+line[i]+"</span>"
		}
		show.innerHTML = li;
		deleteData();
		input.value = "";
	}

	function deleteData(){
		for (var i = 0; i < line.length; i++) {
			show.childNodes[i].index = i;
			EventUtil.addHandler(show.childNodes[i],"click",function () {
				 line.splice(this.index, 1);
				 regender(); 
			});

		}
	}

	function add_right(){
		line.push(input.value);
		regender();
	}
	function add_left(){
		line.unshift(input.value);
		regender();
	}
	function delete_right(){
		line.pop();
		regender();
	}
	function delete_left(){
		line.shift();
		regender();
	}
}
