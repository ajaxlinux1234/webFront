// 对象池是一种优化方案，它与享元模式不同的地方在于，它没有对象的内部状态和外部状态分离，

// 下面是一个通用对象池的实现

var objectPoolFactory=function(createObjFn){
	var objectPool=[];

	return {
		create:function(){
			var obj=objectPool.length===0?
				createObjFn.apply(this,arguments):
				objectPool.shift();

			return obj;
		},
		recover:function(obj){
			objectPool.push(obj);
		}
	}
}