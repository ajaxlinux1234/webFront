const f=(param)=>param+1,
	  g=(param)=>param+2;
const compose=(f,g)=>(x)=>f(g(x));


console.log(compose(f,g)(2));