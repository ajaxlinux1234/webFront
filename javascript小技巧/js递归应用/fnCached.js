function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    // console.log(cache[str]);
    return hit || (cache[str] = fn(str))
  })
}


var fn1=cached(function(str){
	console.log(1+1);
	return 'fn1';
})('fn1');


console.log(fn1);