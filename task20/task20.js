window.onload = function(){
	var textarea = document.getElementById('textarea');
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
	EventUtil.addHandler(btn[4],"click",regender);

	function regender(){
		var li = "";
		if (input.value!=null) {
			for (var i = 0; i < line.length; i++) {
				var flag = line[i].indexOf(input.value);
				if (flag != -1) {
					li += "<span class='match'>"+line[i]+"</span>";
				}else{
					li += "<span>"+line[i]+"</span>"
				}
			}
			show.innerHTML = li;
			deleteData();
			textarea.value = "";
			textarea.focus();
		}
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
		var t = textarea.value.trim().split(/[，,、/ \n]/g);
		for (var i = 0; i < t.length; i++) {
			if (t[i]) {
				line.push(t[i]);
			}
		}
		regender();
	}
	function add_left(){
		var t = textarea.value.trim().split(/[，,、/ \n]/g).reverse();
		for (var i = 0; i < t.length; i++) {
			line.unshift(t[i]);
		}
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
