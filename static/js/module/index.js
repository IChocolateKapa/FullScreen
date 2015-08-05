/**
 * Created by Administrator on 2015/7/16.
 */

/*1，避免全局依赖
* 2，避免第三方组件的破坏
* 3，兼容jquery操作符 - $ */
(function($){

    var defaults = {
        'container' : '#container',//容器
        'sections' : '.section',//子容器
        'easing' : 'ease',//特效方式，ease-in,ease-out,linear
        'duration' : 1000,//每次动画执行的时间
        'pagination' : true,//是否显示分页
        'loop' : false,//是否循环
        'keyboard' : true,//是否支持键盘
        'direction' : 'vertical',//滑动的方向 horizontal,vertical,
        'onpageSwitch' : function(pagenum){}
    };


    $.fn.pageSwitdh = function(options){
        var opts = $.extend({}, defaults, options || {});
        return this.each(function(){

        });
    }
})(jQuery)


/*为jquery增加原型方法 例子*/
$.fn.foo = function(){

};
/*这里$.fn === $.prototype*/
