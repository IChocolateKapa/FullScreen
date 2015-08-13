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
            //$(window).scrollTop(0);
            $('html,body').animate({"scrollTop": "0"}, 1000)
        })

        $(".switchBar").click(function(){
            $(".fixedSideBar").removeClass("closed")
        })

        $(".fixedSideBar>i").click(function(){
            $(".fixedSideBar").addClass("closed");
        })

        /*点击小人时，把当前图片加入购物车*/
        $(".section-before").on("click", function(){
            var $this = $(this);
            var $pic = $this.next("div");

            $flyImg = $("<div class='flyImg'></div>");
            var imgsrc = $pic.find("img").attr("src");
            var $newImg = $("<img src='" + imgsrc + "' />");
            $newImg.appendTo($flyImg);

            $parentItem = $this.parent();
            $flyImg.appendTo($parentItem);

            /*获取鼠标相对于浏览器的偏移*/
            var posX = event.pageX;
            var posY = event.pageY;
            /*右下购物车元素相对于浏览器的偏移*/
            var eleOffTop = $(".tip").offset().top;
            var eleOffLeft = $(".tip").offset().left;

            var disY = Math.abs(eleOffTop - posY); //+ $(".switchBar").height()/2
            var disX = Math.abs(eleOffLeft - posX) + $(".switchBar").width();

            /*这样可以避免多个动画同时进行时，一个完成后所有动画都消失*/
            var $thisFlyImg = $parentItem.find(".flyImg");

            $thisFlyImg.css({"z-index": 1000})
                    .animate({"top": "-15px"}, 300)
                    .animate({"top": "15px"}, 200)
                    .animate({"top": "-5px"}, 100)
                    .animate({"top": "5px"}, 70)
                    .animate({"top": "0"}, 100)
                    .animate({"left": disX + "px", "top":  disY + "px"}, 1000, function(){
                        $thisFlyImg.css({display:'none'}).remove();
                    })

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
