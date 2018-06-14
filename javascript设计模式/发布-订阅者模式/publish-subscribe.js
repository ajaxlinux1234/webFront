		var event={
			clientList:[],//存放订阅者的回调函数
			listen:function(key,fn){
				if(!this.clientList[key]){//如果还没有订阅过此类消息，那么给该类消息创建一个缓存列表
				  this.clientList[key]=[];
				}
				this.clientList[key].push(fn);//订阅的消息放入缓存队列
			},
			trigger:function(){//把消息发送给订阅者
				var key=Array.prototype.shift.call(arguments),
					fns=this.clientList[key];

				if(!fns||fns.length===0){
					return false;//如果没有订阅消息，则返回
				}


				for(var i=0,fn;fn=fns[i++];){
					fn.apply(this,arguments);
				}
			},
			remove:function(key,fn){
				 var fns = this.clientList[ key ];
				 if ( !fns ){ // 如果 key 对应的消息没有被人订阅，则直接返回
				    return false;
				 }
				 if ( !fn ){ // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
				   fns && ( fns.length = 0 );
				 }else{
					 for ( var l = fns.length - 1; l >=0; l-- ){ // 反向遍历订阅的回调函数列表
					 var _fn = fns[ l ];
					 if ( _fn === fn ){
					 fns.splice( l, 1 ); // 删除订阅者的回调函数
					 }
				   }
				 } 
			},
			installEvent:function( obj ){
			 for ( var i in event ){
			 obj[ i ] = event[ i ];
			 }
		  }
		}
