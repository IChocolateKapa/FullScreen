/**
 * Created by Echo on 2015/8/11.
 */

require.config({
    paths: {
        jquery: '../../org/jquery-2.1.3.min'
    }
});


require(['jquery'], function($){

    //autoSlide();


    $(function(){

        $(".selDiv").mousemove(function(){
            //console.log($(".selDiv").position().top)
            //console.log($(".selDiv").position().left)
            var posX = event.pageX;
            var posY = event.pageY;
            /*元素相对于浏览器的偏移*/
            var eleOffTop = $(".selDiv").offset().top;
            var eleOffLeft = $(".selDiv").offset().left;
            /*获取元素的宽高*/
            var eleW = $(".selDiv").width();
            var eleH = $(".selDiv").height();
            $(".selDiv").css({"left": posX-eleOffLeft-eleW/2 + "px", "top": posY-eleOffTop-eleH/2+"px"})
        })


        var slideTime;
        $(".slideTrigger li").mouseenter(function(){
            clearInterval(globalSlide);
            var $this = $(this);
            var index = $this.index();
            slideTime = setTimeout(function(){
                $(".slideTrigger a").removeClass("curr");
                $this.find("a").addClass("curr");
                $(".ListItem").removeClass("curr");
                $(".ListItem").eq(index).addClass("curr");
            }, 800)
        })

        $(".slideTrigger a").mouseleave(function(){
            clearTimeout(slideTime);
            autoSlide();
        })


      $(".ListItem").each(function(index, ele){
           $(ele).css({
               "left": index*960 + "px"
           })
       })


        $(".slider-next").click(function(){
            clearInterval(globalSlide);
            slideAnimate(true);
            //autoSlide();
        })
        $(".slider-prev").click(function(){
            clearInterval(globalSlide);
            slideAnimate(false);
            //autoSlide();
        })
    })



    var globalSlide;
    function autoSlide(){
        globalSlide = window.setInterval(function(){
            slideAnimate(true);
        }, 1000)
    }

    function slideAnimate(flag){

        var curIndex = $(".slideTrigger li.curr").index();
        //var curIndex = $(".ListItem.curr").index();

        if(flag){
            var nextIndex = curIndex + 1;
            if(nextIndex > $(".ListItem").length - 1){
                nextIndex = 0;
            }
        } else {
            var nextIndex = curIndex - 1;
            if(nextIndex < 0){
                nextIndex = 5;
            }
        }
        console.log(curIndex)

        //$(".ListItem").eq(curIndex).animate({"left": "-960px"}, 500);
        //$(".ListItem").eq(curIndex).css({"left": "-960px"});

        $(".List").css({"left": "-" + 960*nextIndex + "px"});

        /*$(".ListItem").eq(curIndex).css({
            "transform": "translate(-" + 960*nextIndex + "px)",
            "-webkit-transform": "translate(-" + 960*nextIndex + "px)"
        })*/

        $(".ListItem").removeClass("curr");
        $(".ListItem").eq(nextIndex).addClass("curr");
       /* $(".ListItem").eq(nextIndex).css({
            "transform": "translate(0)",
            "-webkit-transform": "translate(0)"
        })*/

        $(".slideTrigger li").removeClass("curr");
        $(".slideTrigger li").eq(nextIndex).addClass("curr");

        //console.log($(".ListItem").eq(curIndex-1).css("left"))

        //$(".ListItem").eq(curIndex).css({"left": 960*($(".ListItem").length-curIndex-1) + "px"});

        //console.log($(".ListItem").eq(curIndex-1).css("left"))

        //var cloCurEle = $(".ListItem").eq(curIndex).clone();
        //$(".ListItem").eq(curIndex).remove();
        //console.log(cloCurEle);
        //cloCurEle.appendTo($(".List"))
        //cloCurEle.insertAfter($(".ListItem").eq($(".ListItem").length - 1));


    }
})

