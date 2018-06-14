(function(){
	var checkRules={
		isNonEmpty:function([value,errorMsg]){
			return value===""?errorMsg:""
		},
		minLength:function([value,length,errorMsg]){
			return value.length<length?errorMsg:""
		},
		isMobile:function([value,errorMsg]){
			return !/(^1[3|5|8][0-9]{9}$)/.test( value )?errorMsg:""
		}
	}

	function Validator(data){
		this.data={
			formId:"form1",
			rules:[
				  {name:"",rule:'',errorMsg:""}
			  ],
			 errorMsgShow:[]//错误展示地方
			};
		this.extend(this.data,data);

	}


	Validator.prototype={
		extend(){
			for(var i=1;i<arguments.length;i++){
				for(var j in arguments[i]){
					arguments[0][j]=arguments[i][j];
				}
			}
		},
		start:function(){
			 this.changePiniter();
			 // 1.根据id和name选定form的子对象
			 // 2.对它的rule进行字符串截取，找到其规则名字
			 // 3.把第二部中的数据传入rulesCheck中的对应的函数中
			 // 4.当不符合教研规则时会返回相应的错误信息，用户拿到错误信息进行处理

			 var formId=document.getElementById(this.formId),formChild=formId.getElementsByTagName("input");
			 for(var i=0;i<this.rules.length;i++){
			 	this.i=i;	
			    var childName,ruleArrChild, errorMsg=this.rules[i].errorMsg, val, myArguments=[] ,_this=this;
			 	formChild[i].className=this.rules[i].name;
			 	childName=formId.getElementsByClassName(formChild[i].className)[0];
			 	val=childName.value;
			 	myArguments.push(val);
			 	ruleArrChild=this.rules[i].rule.split(":");
			 	ruleArrChild[1]?myArguments.push(ruleArrChild[1]):"";
			 	myArguments.push(errorMsg);


			 	childName.addEventListener("blur",(function(myArguments,ruleArrChild,i,childName){
			 		return function(){
			 				val=childName.value;
			 				myArguments[0]=val;
			 				console.log(myArguments);
			 			_this.checkBegin(myArguments,ruleArrChild[0],i);
			 		}
			 	})(myArguments,ruleArrChild,i,childName));

			 }
			},
		checkBegin:function(myArguments,checkFn,i){ //调用checkRules函数进行相应的数据检测
             var  result=checkRules[checkFn](myArguments);

             for(var j=0;j<this.errorMsgShow.length;j++){
             	this.errorMsgShow[j].innerHTML="";
             }

             this.errorMsgShow[i].innerHTML=result;
		},
		changePiniter:function(){//把用户传入的数据挂载直接挂载到this上
			for(var i in this.data){
				this[i]=this.data[i]
			}

			delete this.data;//把原来的data对象清除掉
		}
	}
	window["Validator"]=Validator;
})(window)