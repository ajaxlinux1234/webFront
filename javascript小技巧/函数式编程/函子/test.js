const Functor=require('./of.js');

console.log(Functor);
class child extends Functor{
	constructor(){
		super();
		console.log(this);
	}
}


console.log(new child());