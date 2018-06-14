
(function(){

        			// 这 4 个参数的含义分别是动画已消耗的时间、小球原始位置、小球目标位置、动画持续的总时间
	var tween={
		linear: function( t, b, c, d ){
		 return c*t/d + b;
		},
		easeIn: function( t, b, c, d ){
		 return c * ( t /= d ) * t + b;
		}, 
		strongEaseIn: function(t, b, c, d){
		 return c * ( t /= d ) * t * t * t * t + b;
		},
		strongEaseOut: function(t, b, c, d){
		 return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
		},
		sineaseIn: function( t, b, c, d ){
		 return c * ( t /= d) * t * t + b;
		},
		sineaseOut: function(t,b,c,d){
		 return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
		} 
	}


	function Animation(data){
	    	this.data={   dom : null, // 进行运动的 dom 节点
						  startTime : 0, // 动画开始时间
						  startPos : 0, // 动画开始时，dom 节点的位置，即 dom 的初始位置
						  endPos : 0, // 动画结束时，dom 节点的位置，即 dom 的目标位置
						  propertyName : null, // dom 节点需要被改变的 css 属性名
						  easing : null, // 缓动算法
						  duration : null // 动画持续时间
	          };
	 this.extend(this.data,data);          
	  return this.start();
	}


	Animation.prototype={
		extend:function(){
			for(var i=1;i<arguments.length;i++){
				for(var j in arguments[i]){
					arguments[0][j]=arguments[i][j];
				}
			}
		},
		start:function(){
			 this.changePointer();
			 this.startTime = +new Date; // 动画启动时间
			 this.startPos = this.dom.getBoundingClientRect()[this.propertyName ]; // dom 节点初始位置
			 // this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名
			 // this.endPos = endPos; // dom 节点目标位置
			 // this.duration = duration; // 动画持续事件
			 this.easing = tween[ this.easing ]; // 缓动算法
			 var self = this;
			 var timeId = setInterval(function(){ // 启动定时器，开始执行动画
			 if ( self.step() === false ){ // 如果动画已结束，则清除定时器
			 clearInterval( timeId ); 
			  }
			 }, 19 );
			},
		changePointer(){
			for(var i in this.data){//把data中的数据挂直接挂载到原型链上
				this[i]=this.data[i];
			}
			
			delete this.data;//把原来的data进行销毁
		   		
		},
		step(){
		 var t = +new Date; // 取得当前时间
		 if ( t >= this.startTime + this.duration ){ // (1)
		 this.update( this.endPos ); // 更新小球的 CSS 属性值
		 return false;
		 }
		 var pos = this.easing( t - this.startTime, this.startPos,
		 this.endPos - this.startPos, this.duration );
		 // pos 为小球当前位置
		 this.update( pos ); // 更新小球的 CSS 属性值
		},
		update(pos){
			this.dom.style[ this.propertyName ] = pos + 'px'; 
		}
	}


	window["Animation"]=Animation;
})(window)