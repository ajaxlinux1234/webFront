(function(global,factory){

   "use strict";
   	if(typeof module ==="object"&&typeof module.exports==="object")//下面的写法为了便于在有document对象下利用打包工具进行打包
   	{
   		module.exports=global.document?
   					   factory(global,true):
   					   function(w){
   					   		if(!w){
   					   			throw new Error("vitrualDOM need a global document");
   					   		}else{
   					   		 return	factory(w);
   					   		}
   					   };
   	}else{
   		factory(global);
   	}
})(typeof window!==undefined?window:this,function(window,noGlobal){
		var init;
		var vitrualDOM=function(){
            
	    	return new vitrualDOM.fn.init();
	    };


	      vitrualDOM.fn=vitrualDOM.prototype={
	      	model:{},
	      	binds:{},
	    	init:function(){
	    		return this;
	    	},
	    	observer:function(model){// 1.写一个观察器，当model中数据进行改变时进行响应
	    		for(var key in model){
	    			var _this=this;
	    			(function(model,key,value,_this){
	    				// console.log(model);
	    				// console.log(key);
	    				// console.log(value);
	    				Object.defineProperty(model,key,{
	    					set:function(nv){
	    						value=nv;
	    						_this.render(key);
	    					},
	    					get:function(){
	    						return value;
	    					}
	    				})
	    			})(model,key,model[key],_this)
	    			if(model[key] instanceof Array){//1——1,当model中数据发生变化时也进行重新的渲染
	    				(function(model,key,_this){
	    					['pop','push'].forEach(function(method){
	    						var own=Array.prototype[method];
	    						model[key][method]=function(){
	    							var res=own.apply(this,arguments);
	    							_this.render(key);
									console.log("model中数据改变时进行了重新渲染");
	    						}
	    					})
	    				})(model,key,_this)
	    			}else if(model[key] instanceof Object){
	    				this.observer(model[key]);//递归
	    			}  				

	    		}
	    		this.model=model;
	    		return this;
	    	},
	    	bind:function(root){// 2.寻找dom元素找到，遍历找到与数据中所对应的dom结构
	    		this.analyze(root);
	    		if(root.children&&root.children.length>0){
	    			for(var i=0;i<root.children.length;i++){
	    				this.bind(root.children[i]);
	    			}
	    		}
	    		return this;
	    	},
	    	analyze:function(node){
	    		if(node.getAttribute('v-for')){//3.分析元素是否有相应的自定义属性,来获取遍历的对象
	    		   var val=node.getAttribute('v-for');
	    		   if(/(\w+)\sin\s(\w+)/.exec(val)){
	    		   		node.cmdType="for";
	    		   	   this.binds[RegExp.$2]=node;
	    		   }else{
	    		   	  throw new Error("您不会吧");
	    		   }
	    		   console.log(node.tagName+":"+val);
	    		}

	    		return this;
	    	},
	    	render:function(key){     // 4.进行数据对应的渲染
	    		  var target=this.binds[key];
	    		  if(target.cmdType==="for"){
	    		  	if(!target.parent){
	    		  		target.parent=target.parentNode;
	    		  		target.cache=[]; // 5.对数据进行缓存(提高性能)
	    		  	}
	    		  	var parentNode=target.parent;
	    		  	parentNode.template=target;
	    		  	target.remove();
	    		  	parentNode.innerHTML="";//重新渲染，清空
	    		  	var clone;
	    		  	var chache;//缓存池
	    		  	this.model[key].forEach(function(item,index){
	    		  		if(!target.cache[index]){
	    		  				clone=parentNode.template.cloneNode(true);
	    		  				target.cache.push(clone);
			    		  }else{
			    		  	 clone=target.cache[index];
			    		  	 console.log("使用了一次缓存");
			    		  }
			    		  clone.innerHTML=item;
			    		  parentNode.appendChild(clone);
	    		  	})
	    		  }
	    		  
	    		  return this;
	    	}
	    }
       init=vitrualDOM.fn.init;
       init.prototype=vitrualDOM.fn;
       // Model.items=Model.items;
    
      if(!noGlobal){
      	window.vitrualDOM=vitrualDOM;
      }
       return vitrualDOM;
      
      
      
})