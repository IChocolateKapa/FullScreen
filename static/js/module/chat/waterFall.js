/**
 * Created by Administrator on 2015/8/5.
 */

require.config({
    paths: {
        jquery: '../../org/jquery-2.1.3.min',
        //angular: 'http://apps.bdimg.com/libs/angular.js/1.1.0/angular.min.js',
        jqueryui: "../../org/jquery-ui.min"
    }
});

/*require.config({
    paths: {
        jqueryui: "../../org/jquery-ui.min"
    }
});*/


require(['jquery', 'jqueryui', 'waterFallFunction'], function($, jqu, wf){

    var wfn = new wf.wf();


    $(function(){
        wfn.waterFall();

        /*返回顶部*/
        $(".goTop i").click(function(){
            $(window).scrollTop(0);
        })
    })

    $(window).resize(function(){
        wfn.waterFall();
    })

    $(window).scroll(function(){

        var scrTop = $(window).scrollTop();
        if(scrTop > 500){
            $(".goTop").css({"visibility": "visible"})
        } else {
            $(".goTop").css({"visibility": "hidden"})
        }
        var flag = wfn.checkScrollSlide();
        console.log(flag)
        if(flag){
            $(".loading").css({"visibility": "visible"});
            setTimeout(function(){
                wfn.getMoreImg();
                wfn.waterFall();
                $(".loading").css({"visibility": "hidden"});
            }, 1200)

        }
    })



})
