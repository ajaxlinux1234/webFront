// 函数式编程有一个约定，用一个of方法来生成新的容器（new 一个实例对象）


class Functor{
	constructor(val){
		this.val=val;
	}

	map(f){
		return new Functor(f(this.val));
	}
}


Functor.of=function(val){
	return new Functor(val)
};



const result=Functor.of(2).map(function(two){
	return two+2;
});

module.exports=Functor;



