// 在有时候我们传入空值比如null会报错，此时我们就需要一个Maybe函子用来检测是否为空，并进行相应的处理
const  Functor=require('./of.js');


console.log(Object.prototype.toString.call(Functor));

// console.log(module);
class Maybe extends Functor {
  constructor(){
  	super();
  }
  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
  }
}

// console.log(new Maybe().map);
// Maybe.of(null).map(function (s) {
//   return s.toUpperCase();
// });
// console.log(result);// Maybe(null)