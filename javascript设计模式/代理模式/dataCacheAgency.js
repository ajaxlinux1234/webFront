(function(){
	var dataMethods={
		  mult:function(){
		  	var a=1;
		  	for(var i=0;i<arguments.length;i++){
		  		a=a*arguments[i];
		  	}

		  	return a;
		  },
		  plus:function(){
		  	  var result=0;

		  	  for(var i in arguments){
		  	  	result+=arguments[i];
		  	  }

		  	  return result;
		  },
		  divide:function(){
		  	var result=1;

		 	for(var i=0;i<arguments.length;i++){
		 		result=arguments[i]/result;
		 	}

		 	return result;
		  }
	}


	var createProxyFactory=function(fn){
		// console.log(dataMethods);
		var cache={};
		return function(){
			var args=Array.prototype.join.call(arguments,',');

			if(cache[args]){
				return cache[args];
			}

			return cache[args]=fn.apply(this,arguments);
		}
	};


	window["createProxyFactory"]=createProxyFactory;
	window["dataMethods"]=dataMethods;
})(window)
	
