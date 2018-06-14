(function(){

			var myImage = (function(){
			 var imgNode = document.createElement( 'img' );
			 document.body.appendChild( imgNode );
			 return {
				 setSrc: function( src ){
				 imgNode.src = src;
				 }
			 }
			})();
			var proxyImage = (function(){
				console.log(this);
			 var img = new Image;
			 img.onload = function(){
			 	console.log(this);
			    myImage.setSrc( this.src );
			 }
			 return {
				 setSrc: function( src ){
				 myImage.setSrc( "http://pic.92to.com/anv/201608/25/ipm421ov5rd.gif");
				 img.src = src;
				 }
			 }
			})();
			 


	window["proxyImage"]=proxyImage;
})(window)