此demo用vue实现Todos，Todos的功能描述：
   1，添加：在输入框中输入内容点击添加添加内容到列表上，对应的也把数据更新到本地储存localStorage中
   2，删除：点击列表中的“X”号，删除对应的列表项，localStorage中数据也进行相应的删除
   3，更新：点击左边的圆圈，鼠标放到列表项中间可以修改内容，对应本地储存中的数据也更新
   4，清除：点击清除按钮删除所有列表项，对应也删除本地储存中所有的数据
   5，本地读取：每次进入页面读取本地数据，进行列表的渲染

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>todos</title>
	<link rel="stylesheet" href="http://apps.bdimg.com/libs/todc-bootstrap/3.1.1-3.2.1/todc-bootstrap.min.css">
	<style>

		*{
			margin: 0;
			padding: 0;
		}
		html,body{
			height: 100%;
			width: 100%;
		}
		#todos{
			
			background: rgba(0,0,0,.1);
			box-shadow: 5px 5px 4px gray;
			height: auto;
			width: 400px;
			margin: 200px auto;
			text-align: center;
			padding: 20px;
			box-sizing: border-box;
		}
		li{
			list-style: none;
		}

		.todos_input{
			margin: 40px auto;
			height: 40px;
			width: 100%;
			position: relative;
		}

		.todos_input a{
			   position: absolute;
			    right: 22px;
			    top: 0px;
			    height: 21px;
		}
        .todos_input input{
        	width: 300px;
        }

        .todos_list{
        	width: 73%;
		    height: auto;
		    /* text-align: center; */
		    margin-left: 6%;
        }

        .todos_list li{
        	width: 100%;
		    height: 30px;
		    background: white;
		    /*border-radius: 5px;*/
		    line-height: 30px;
		    position: relative;
		    box-sizing: border-box;
		    margin-bottom: 1px;
		    text-align: left;
		    padding-left: 50px;
        }

        .left_btn{
			position: absolute;
		    height: 14px;
		    width: 14px;
		    border-radius: 50%;
		    top: 8px;
		    left: 20px;
		    border: 1px solid gray;
		    box-sizing: border-box;
        }
		.left_btn:hover{
			cursor: pointer;
		}
        .right_btn{
			color: white;
		    height: 14px;
		    width: 14px;
		    line-height: 13px;
		    position: absolute;
		    text-align: center;
		    background: rgba(0,0,0,.1);
		    top: 10px;
		    right: 20px;
		    border-radius: 50%;
		    font-size: 5px;
        }


		.right_btn:hover{
			cursor: pointer;
		}
		
		.btn-group{
			box-sizing: border-box;
		    width: auto;
		    height: 40px;
		    margin: 30px 0px 0px -50px;
		}
		.list-input{
			position: absolute;
		    width: 160px;
		    height: 19px;
		    top: 0px;
		    left: 42px;
		    border: none;
		}
	</style>
</head>
<body >
	<div id="todos" >
		<div class="todos_input"><input type="text" class="form-control" placehold="请在这里输入内容" v-model="newData"><a href="javascript:;" class="btn btn-danger btn-lg" @click="add">添加</a></div>
		<ul class="todos_list">
			<li v-for="(todo,index) in todos"  v-if="todo.listFlag" v-show="clearFlag"   :data-index="index">
				<span :class="left_btn" @click="modify($event,true)"></span>
				  {{todo.text}}
				<span class="right_btn" @click="remove">x</span>
				<input  type="text" class="form-control list-input" @blur="modify($event,false)"  :autofocus="todo.focusFlag" v-show="todo.modifyFlag" v-model="todo.text">
			</li>
		</ul>
		<div class="btn-group" role="group" aria-label="...">
		<a href="javascript:;" class="btn  btn-default btn-warning" v-show="clearFlag" @click="clear">清除</a>
		</div>
	</div>
	<script src="vue.js"></script>
	<script>
	 window.onload=function(){
	 	if(!localStorage.localText){
	 		var todos=[
	 			{text:"",listFlag:true,modifyFlag:false,focusFlag:false}
	 		];
	 		todos=JSON.stringify(todos);
	 		localStorage.setItem("localText",todos);			
	 		// console.log(localStorage.localText);
	 	}
	   }
	var app=new Vue({
     	el:'#todos',
     	data:{
     		todos:JSON.parse(localStorage.getItem("localText")),
     		newData:'',
     		clearFlag:true,
     		left_btn:"left_btn",
     		autofocus:'autofocus'

     	},
     	methods:{
     		add:function(){ 			//添加
        var newTodo={text:this.newData,listFlag:true,modifyFlag:false,focusFlag:false};
     			this.todos.push(newTodo);
     			this.clearFlag=true;
     			var leaveTodos=JSON.stringify(app.todos);
		     	console.log(leaveTodos);
		     	localStorage.setItem('localText',leaveTodos);
     			
     		},
     		remove:function(e){ //删除单个列表项 			
     			var target=e.path[1];
     			var index=target.getAttribute("data-index");
     			this.todos[index].listFlag=false;
     			var a=JSON.stringify(app.todos.splice(index));
     			localStorage.setItem('localText',a);
     		
     		},
     		clear:function(){//清除列表项
 			for(var i=0,todos=this.todos;i<todos.length;i++){
     				for(var j in todos[i]){
     					todos[i][j]="";
     					app.todos[i][j]="";
     				}
     				
     			}
     			var a=JSON.stringify(app.todos);
     			localStorage.setItem('localText',a);
     			// console.log(app.todos);
     		},
     		modify:function(e,flag){//更新列表项
     		 var target=e.path[1];
     		   var index=target.getAttribute("data-index");
     		  if(flag){
     		   this.todos[index].modifyFlag=true;
     		   this.todos[index].focusFlag=" ";
     		  }else{
     		   this.todos[index].modifyFlag=false;
     		   this.todos[index].focusFlag=false;

     		   	console.log(app.todos);
     		    var leaveTodos=JSON.stringify(app.todos);
		     	console.log(leaveTodos);
		     	localStorage.setItem('localText',leaveTodos);

     		  }

     		   
     		}
     		
     	}
     })
		
     	

	</script>
</body>
</html>
