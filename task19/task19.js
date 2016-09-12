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
	EventUtil.addHandler(btn[4],"click",add_random);
	EventUtil.addHandler(btn[5],"click",bubble_sort);

	function add_random(){
		line = [];
		for (var i = 0; i < 50; i++) {
			line[i]= Math.floor(Math.random()*91+10);
		}
		regender();
	}
	function bubble_sort() {
	    var i = line.length, j;
	    var a;
	    while (i > 0) {
	        for (j = 0; j < i - 1; j++) {
	            if (line[j] > line[j + 1]) {
	                a = line[j];
	                line[j] = line[j + 1];
	                line[j + 1] = a;
	            }
	        }
	        i--;
	    }
	    regender();
	}

	function add_right(){
		if (line.length>60) {
			alert('最多输入60个数');
		}else{
			if (input.value>=10&&input.value<=100) {
				line.push(input.value);
				regender();
			}else{
				alert('请输入10-100之间的数');
			}
		}
	}
	function add_left(){
		if (line.length>60) {
			alert('最多输入60个数');
		}else{
			if (input.value>=10&&input.value<=100) {
				line.unshift(input.value);
				regender();
			}else{
				alert('请输入10-100之间的数');
			}
		}
	}
	function delete_right(){
		line.pop();
		regender();
	}
	function delete_left(){
		line.shift();
		regender();
	}

	function regender(){
		var bar = "";
		for (var i = 0; i < line.length; i++) {
			bar += "<div class='bar' style='height:"+line[i]+"px;width:5px;background:#ffcaee'></div>"
		}
		show.innerHTML = bar;
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
}
