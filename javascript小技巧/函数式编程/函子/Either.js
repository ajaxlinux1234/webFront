let Functor=require('./of.js'),
	  logs=require('./logs.js');


class Either extends Functor {
  constructor(left, right) {
  	super();
    this.left = left;
    this.right = right;
  }

  map(f) {
    return this.right ? 
      Either.of(this.left, f(this.right)) :
      Either.of(f(this.left), this.right);
  }
}

Either.of = function (left, right) {
  return new Either(left, right);
};



let addOne = function (x) {
  return x + 1;
};

let result1=Either.of(5, 6).map(addOne);
// Either(5, 7);

let result2=Either.of(1, null).map(addOne);
// Either(2, null);


logs(result1);

