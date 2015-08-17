/**
 * Created by Administrator on 2015/8/5.
 */

require.config({
    paths: {
        //jquery: '../../org/jquery-1.6.min',
        jquery: '../../org/jquery-2.1.3.min',
        //angular: 'http://apps.bdimg.com/libs/angular.js/1.1.0/angular.min.js',
        jqueryui: "../../org/jquery-ui.min",
        window: "../../module/modal/window"
    }
});

require(['jquery', 'jqueryui', 'waterFallFunction', 'window'], function($, jqu, wf, wd){

    var wfn = new wf.wf();
    //console.log()


    $(function(){


        $(".main-r-container").load("accountsTem.html");
        $(".sideBar").load("sideBarTem.html");

        /*返回顶部*/
        $(".goTop i").click(function(){
            //$(window).scrollTop(0);
            $('html,body').animate({"scrollTop": "0"}, 1000)
        })

        /*展开右边购物车*/
        $(".fixedSideBar").on("click", ".switchBar", function(){
            var storage = window.localStorage;
            var pl = storage.getItem('peopleList');
            $(".fixedSideBar").removeClass("closed");
            $(".fixedSideBar>i span").html(wfn.getObjectLen(JSON.parse(pl)));
            if(pl){
                var j = 0;
                var jsval = JSON.parse(pl);
                $(".carContainer ul").html('');
                for(var dd in jsval){
                    if(jsval[dd] != null){
                        j += 1;
                        $(".carContainer ul").append("<li><a href=''><img src='../../static/images/" + jsval[dd] + ".jpg' /></a></li>")
                    }
                }
            }


        })

        $(".fixedSideBar>i").click(function(){
            $(".fixedSideBar").addClass("closed");
        })


        /*修改昵称*/
        /*$("span.popupItem-r, .popupItem i").click(function(){
            var $this = $(this);
            $this.hide();
            $this.next("i").hide();
            $this.parents().children("input").removeClass("none").show().focus();
        })
        $("input.popupItem-r").on("changde, blur", function(){
            var $this = $(this);
            console.log($this.attr("value"));
            $this.parent().children("span.popupItem-r").html($this.attr("value")).css({display: "inlineBlock"});
            $this.prev("i").show();
            $this.hide();
            });*/
        $(".carContainer").on("click", "li", function(){
            /*动画结束之后开始设定身份*/
            $(".bgdmask").show();
            $(".popup").addClass("show");
            $(".popup").attr("data-item", $(this).children("img").attr("src"));
        })
        $(".save").on("click", function(){
            $(".bgdmask").hide();
            $(".popup").removeClass("show");
            var pl = window.localStorage.peopleList;
            (JSON.parse(pl))
        })
        $(".bgdmask").click(function(){
            $(".bgdmask").hide();
            $(".popup").removeClass("show");
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


function myKeyPress(event){
    var that = this;
    eventUtil.enterKeyPress(event, function(){
        alert(that.value);
        //$(this).hide();
    })
}