(function(global){

	var _INFO_={
			plug:'Drag',
			version:'1.0.1'
		},
		defaults={
			nodeID:'',
			position:{},
			style:{
				"Drag":"height:200px;width:200px;background:red;position:absolute;"
			}

		};

	var Drag=function(options){
       var settings=Object.assign({},defaults,options);
       var DragDOM=settings.nodeID||document.body;

       var newDiv=document.createElement('div');

       newDiv.style=settings.style.Drag;


       DragDOM.appendChild(newDiv);


       //下面为拖拽功能的实现
       
       var flag=false,dx,dy,nx,ny,x,y,sx,sy;//记录鼠标是否按下
       var cur={//记录鼠标按下时的鼠标
       		x:0,
       		y:0
       };

        // 判断是移动端还是pc端
        
       	function isPC(){
			    var userAgentInfo = navigator.userAgent;
			    var Agents = ["Android", "iPhone",
			                "SymbianOS", "Windows Phone",
			                "iPad", "iPod"];
			    var flag1 = true;
			    for (var v = 0; v < Agents.length; v++) {
			        if (userAgentInfo.indexOf(Agents[v]) > 0) {
			            flag1 = false;
			            break;
			        }
			    }
			    return flag1;
		
       	}
       // 鼠标按下时的函数
       
       function mouseDown(obj){
       	    flag=true;
       	    cur.x=event.clientX||event.touches[0].clientX;//兼容pc端和移动端
       	    cur.y=event.clientY||event.touches[0].clientY;
       	    dx=obj.offsetLeft;
       	    dy=obj.offsetTop;
       }


       //鼠标移动时的函数
       
       function mouseMove(obj){
       		sx=(event.clientX||event.touches[0].clientX)-cur.x;
       		sy=(event.clientY||event.touches[0].clientY)-cur.y;
       		nx=sx>0?sx:0;
       		ny=sy>0?sy:0;
       		x=dx+nx;
       		y=dy+ny;
       		obj.style.left=x+'px';
       		obj.style.top=y+'px';
       }



       //鼠标释放时的函数
       function mouseEnd(){
       	flag=false;
       }


       newDiv.addEventListener('mousedown'||'touchstart',function(){
       	mouseDown(newDiv);
       });
       newDiv.addEventListener('mousemove'||'touchmove',function(){
       	mouseMove(newDiv);
       });
       document.body.addEventListener('mouseup',function(){
       	mouseEnd();
       });
       newDiv.addEventListener('touchsend',function(){
       	mouseEnd();
       });

	}



	global[_INFO_.plug]=Drag;
})(this)