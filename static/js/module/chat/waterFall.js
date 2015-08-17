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
                        var index1 = jsval[dd].indexOf("+");
                        if(index1 == -1){
                            index1 = jsval[dd].length;
                        }
                        j += 1;
                        $(".carContainer ul").append("<li><a href=''><img src='../../static/images/"
                            + jsval[dd].substring(0, index1) + ".jpg' /></a></li>")
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
            var $this = $(this);
            $(".bgdmask").show();
            $(".popup").addClass("show");

            var dsrc = $(this).find("img").attr("src");
            $(".popup").attr("data-item", dsrc);
            var dsrc_s = dsrc.substring(20, dsrc.indexOf(".jpg"));

            var pl = window.localStorage.peopleList;
            var valjson = JSON.parse(pl);
            var valstr = valjson[dsrc_s];
            var index1 = valjson[dsrc_s].indexOf('+');
            if(index1 != -1){
                valstr = valstr.replace("+", "@");
                var index2 = valstr.indexOf('+');
                if(index2 != -1){
                    var nick = valjson[dsrc_s].substring(index1+1,  index2);
                    var desc = valjson[dsrc_s].substring(index2+1, valjson[dsrc_s].length);
                } else {
                    var nick = valjson[dsrc_s].substring(index1+1, valjson[dsrc_s].length);
                    var desc = "";
                }


            } else{
                var nick = "";
                var desc = "";
            }


            $("input[name=nickname]").val(nick);
            $("textarea").val(desc);
            /*阻止默认行为*/
            eventUtil.preventDefault(event);
        })
        $(".save").on("click", function(){
            var dsrc = $(".popup").attr("data-item");
            var dsrc_s = dsrc.substring(20, dsrc.indexOf(".jpg"));

            var pl = window.localStorage.peopleList;
            var nick = $("input[name=nickname]").val();
            var desc = $("textarea").val();
            if(!nick){
                alert("请设置昵称哦!");
                eventUtil.preventDefault(event);
            } else {
                var valjson = JSON.parse(pl);
                var lastIndex = valjson[dsrc_s].indexOf("+") > 0 ? valjson[dsrc_s].indexOf("+") : valjson[dsrc_s].length;
                valjson[dsrc_s] = valjson[dsrc_s].substring(0, lastIndex) + "+" + nick + "+" + desc;
                window.localStorage.setItem("peopleList", JSON.stringify(valjson));
                $(".bgdmask").hide();
                $(".popup").removeClass("show");
            }

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