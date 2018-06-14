(function(window){

	function asyncLoaded(url,callBack){/*url为js的链接，callBack为url的js中的函数（该函数调用应该写到匿名函数中，如function(){console.log(div.getScrollOffset())}）*/
    var script = document.createElement('script');
    script.type = 'text/javascript';
    /*if else 这几句话必须要写到这位置处，不能放最后，因为if中js加载中script.readyState存在好几种状态，
    只有状态改变‘readystatechange’事件才会触发，但现在浏览器加载速度很快，当解析到该事件时JS有可能已经加载完，
    所以事件根本不会触发，所以要写到前面*/
    if(script.readystate){//兼容IE
        script.onreadystatechange = function() {//状态改变事件才触发
            if(script.readyState == 'loaded' || script.readyState == 'complete'){    
                callBack();
                script.onreadystatechange = null;        
            }
        }
    }else{
        script.onload = function(e){
            callBack();
        }
    }        
    script.src = url;
    document.body.appendChild(script);
  }



  window.asyncLoaded=asyncLoaded;
})(window)