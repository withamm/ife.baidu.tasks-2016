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

	//变量声明
	var mold = document.getElementById('mold');						//类别框

	var textOption = document.getElementById('textMold');				//文字类别框
	var moldName = document.getElementById('moldName');
	var row2 = document.getElementById('row2');
	var row1 = document.getElementById('row1');
	var tagNames = document.getElementById('tagNames');
	var showTags = document.getElementById('showTags');
	var sureBtn = document.getElementById('sureBtn');
	var tagNames = document.getElementById('tagNames');
	var submitBtn = document.getElementById('submitBtn');

	var newForm = document.getElementById('newForm');
		
	//事件绑定
	for (var i = 0; i < mold.length; i++) {
		EventUtil.addHandler(mold[i],'click',chooseMold);
	}
	for (var i = 0; i < textOption.length; i++) {
		EventUtil.addHandler(textOption[i],'click',chooseTextMold);
	}
	EventUtil.addHandler(sureBtn,'click',ensure);
	EventUtil.addHandler(submitBtn,'click',createForm);
	EventUtil.addHandler(submitBtn,'click',reForm);


	//具体方法
	function chooseMold(){
		if (this.index == 0) {
			textMold.style.display = 'inline-block';
			row2.style.display = 'none';
			row1.style.display = 'none';
		}
		else if(this.index == 1){
			textMold.style.display = 'none';
			row2.style.display = 'none';
			row1.style.display = 'inline-block';
		}else{
			textMold.style.display = 'none';
			row2.style.display = 'inline-block';
			row1.style.display = 'inline-block';
		}
	}

	function chooseTextMold(){
		if (this.index == 4) {
			row2.style.display = 'inline-block';
			row1.style.display = 'none';
		}
		else{
			row2.style.display = 'none';
			row1.style.display = 'none';
		}
	}

	//确定按钮的方法
	var tagNamesVaules = [];
	var tags = [];
	function ensure(){
		//取得输入的标签名
		tagNamesVaules = tagNames.value.trim().split(/[，,、/ \n]/g);
		for (var i = 0; i < tagNamesVaules.length; i++) {
			if (tagNamesVaules[i]) {
				tags.push(tagNamesVaules[i]);
			}
		}
		//判断标签名是否重复
		var tagsCopy = tags;
		for (var i = 0; i < tags.length; i++) {
			for (var j = 0; j < tags.length; j++) {
				if (i != j) {
					if (tags[i] == tags[j]) {
						alert('输入的标签名有重复！');
						tags = [];
						break;
				}
				}
			}
		}
		// 显示标签名
		var text = '<p>标签名：</p>';
		if (tags) {
			for (var i = 0; i < tags.length; i++) {
				text += '<span class="tags">'+tags[i]+'</span>';
			}
			showTags.innerHTML = text;
		}else {
			alert('请输入标签名')
		}
	}

	function createForm(){
		if (mold.selectedIndex == 0 ) {
				createRow();
		}else{
			createRows();
		}
		
	}
	

	//各种具体的生成函数
	function createRow(){
		
		switch(textOption.selectedIndex) {
			case 0:
				var frow = document.createElement('div');
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row';
				fcell1.className = 'cell1';
				fcell2.className = 'cell';
				fcell1.innerHTML = textOption[textOption.selectedIndex].value;	
				fcell2.innerHTML = '<input name="text"><p class="remark">请输入4-16个字符</p>';
				frow.appendChild(fcell1);
				frow.appendChild(fcell2);

				newForm.appendChild(frow);
				break;
			case 1:
				var frow = document.createElement('div');
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row';
				fcell1.className = 'cell1';
				fcell2.className = 'cell';
				fcell1.innerHTML = textOption[textOption.selectedIndex].value;
				fcell2.innerHTML = '<input name="password" type="password"><p class="remark">请输入6-16个字母或数字</p>';
				frow.appendChild(fcell1);
				frow.appendChild(fcell2);

				newForm.appendChild(frow);
				break;
			case 2:
				var frow = document.createElement('div');
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row';
				fcell1.className = 'cell1';
				fcell2.className = 'cell';
				fcell1.innerHTML = textOption[textOption.selectedIndex].value;
				fcell2.innerHTML = '<input name="email"><p class="remark">请输入正确的邮箱地址</p>';
				frow.appendChild(fcell1);
				frow.appendChild(fcell2);

				newForm.appendChild(frow);
				break;
			case 3:
				var frow = document.createElement('div');
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row';
				fcell1.className = 'cell1';
				fcell2.className = 'cell';
				fcell1.innerHTML = textOption[textOption.selectedIndex].value;
				fcell2.innerHTML = '<input name="phone"><p class="remark">请输入11位手机号</p>';
				frow.appendChild(fcell1);
				frow.appendChild(fcell2);

				newForm.appendChild(frow);
				break;
			case 4:
				var frows = [],fcell1 = [],fcell2 = [];
				for (var k = 0; k < tags.length; k++) {
					frows[k] = document.createElement('div');
					fcell1[k] = document.createElement('div');
					fcell2[k] = document.createElement('div');
					frows[k].className = 'row1';
					fcell1[k].className = 'cell1';
					fcell2[k].className = 'cell2';

					fcell1[k].innerHTML = tags[k];
					fcell2[k].innerHTML = '<input name="text"><p class="remark">请输入4-16个字符</p>';;

					frows[k].appendChild(fcell1[k]);
					frows[k].appendChild(fcell2[k]);

					newForm.appendChild(frows[k]);
				}
				break;
			}
	}
				
	function createRows(){
			
		switch(mold.selectedIndex) {
			case 1:
				var frow = document.createElement('div');
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row';
				fcell1.className = 'cell1';
				fcell2.className = 'cell';
				fcell1.innerHTML = moldName.value;
				fcell2.innerHTML = '<textarea></textarea>';
				frow.appendChild(fcell1);
				frow.appendChild(fcell2);

				newForm.appendChild(frow);
				break;
			case 2:
				var frow = document.createElement('div');		
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row1';
				fcell1.className = 'cell1';
				fcell2.className = 'cell2';

				for (var k = 0; k < tags.length; k++) {
					fcell2.innerHTML += '<span>'+tags[k]+'</span><input type="radio">';
				}
				fcell1.innerHTML = moldName.value;

				frow.appendChild(fcell1);
				frow.appendChild(fcell2);
				newForm.appendChild(frow);
				break;
			case 3:
				var frow = document.createElement('div');		
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');

				frow.className = 'row1';
				fcell1.className = 'cell1';
				fcell2.className = 'cell2';

				for (var k = 0; k < tags.length; k++) {
					fcell2.innerHTML += '<span>'+tags[k]+'</span><input type="checkbox">';
				}
				fcell1.innerHTML = moldName.value;

				frow.appendChild(fcell1);
				frow.appendChild(fcell2);
				newForm.appendChild(frow);
				break;
			case 4:
				var frow = document.createElement('div');		
				var fcell1 = document.createElement('div');
				var fcell2 = document.createElement('div');
				var select = document.createElement('select'); 

				frow.className = 'row1';
				fcell1.className = 'cell1';
				fcell2.className = 'cell2';

				for (var k = 0; k < tags.length; k++) {
					select.innerHTML += '<option>'+tags[k]+'</option>'
				}
				fcell1.innerHTML = moldName.value;

				fcell2.appendChild(select);

				frow.appendChild(fcell1);
				frow.appendChild(fcell2);
				newForm.appendChild(frow);

				break;
		}
	}

	//表单验证
	function reForm(){
		var inputs = newForm.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++) {
			EventUtil.addHandler(inputs[i],'blur',reNewForm);
		}
	}

	function reNewForm(){
		switch(this.name) {
			case 'text':
				if (/^[a-zA-Z0-9_]{4,16}$/.test(this.value.trim().replace(/[^x00-xff]/g,"nn"))) {
					this.nextSibling.innerHTML = '输入正确';
					this.nextSibling.style.color = '#0f0';
				}else{
					this.nextSibling.innerHTML = '输入不符合要求';
					this.nextSibling.style.color = '#f00';
				}
				break;
			case 'email':
				if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.value.trim())) {
					this.nextSibling.innerHTML = '输入正确';
					this.nextSibling.style.color = '#0f0';
				}else{
					this.nextSibling.innerHTML = '输入不符合要求';
					this.nextSibling.style.color = '#f00';
				}
				break;
			case 'password':
				if (/^[a-zA-Z0-9]{6,16}/.test(this.value.trim())) {
					this.nextSibling.innerHTML = '输入正确';
					this.nextSibling.style.color = '#0f0';
				}else{
					this.nextSibling.innerHTML = '输入不符合要求';
					this.nextSibling.style.color = '#f00';
				}
				break;
			case 'phone':
				if (/^[1][0-9]{10}/.test(this.value.trim())) {
					this.nextSibling.innerHTML = '输入正确';
					this.nextSibling.style.color = '#0f0';
				}else{
					this.nextSibling.innerHTML = '输入不符合要求';
					this.nextSibling.style.color = '#f00';
				}
				break;
		}
	}

	//刷新函数
	function refer(){
		mold[0].selected = true;
		textOption[0].selected = true;
		row2.style.display = 'none';	
		row1.style.display = 'none';
	}

	refer();
}