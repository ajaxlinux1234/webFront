(function(global,factory){
		if(typeof module==="object"&&typeof module.exports==="object"){
			module.exports=global.document?
						   factory(global,true):
						   function(w){
						   	if(!w){
						   		throw Error("vueRouter need a global document");
						   	}else{
						   		return factory(w);
						   	}
						   }

		}else{
			return factory(global);
		}
})(typeof window!==undefined?window:this,function(window,noGlobal){
	//1.根据hashChange函数当hash改变时进行相应的操作
	 var init;
	 var vueRouter=function(){
	 	return new vueRouter.fn.init();
	 }
	 vueRouter.fn=vueRouter.prototype={
	 	data:{},
	 	init:function(){
	 		return this;
	 	},
	 	config:function(data){
	 		
	 	}
	 }



	 init=vueRouter.fn.init;
     init.prototype=vueRouter.fn;



     if(!noGlobal){
     	window.vueRouter=window.$=vueRouter;
     }

     return vueRouter;
     // console.log(vueRouter());
	//2.异步加载对应页面的js
})