/**
 * Created by Administrator on 2015/8/5.
 */

require.config({
    paths: {
        jquery: '../../org/jquery-2.1.3.min',
        //angular: 'http://apps.bdimg.com/libs/angular.js/1.1.0/angular.min.js',
        jqueryui: "../../org/jquery-ui.min",
        window: "../../module/modal/window"
    }
});

require(['jquery', 'jqueryui', 'waterFallFunction', 'window'], function($, jqu, wf, wd){

    var wfn = new wf.wf();


    $(function(){

        $(".main-r-container").load("accountsTem.html");
        $(".sideBar").load("sideBarTem.html");

        /*返回顶部*/
        $(".goTop i").click(function(){
            //$(window).scrollTop(0);
            $('html,body').animate({"scrollTop": "0"}, 1000)
        })

        $(".switchBar").click(function(){
            $(".fixedSideBar").removeClass("closed")
        })

        $(".fixedSideBar>i").click(function(){
            $(".fixedSideBar").addClass("closed");
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
