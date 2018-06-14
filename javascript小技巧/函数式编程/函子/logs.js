
const logs=function(){
	let i=0,len=arguments.length;
	for( ;i<len;i++){
		console.log(arguments[i]);
	}
};
module.exports=logs;