/**
 * Created by Echo on 2015/8/11.
 */

require.config({
    //baseUrl: "",
    paths: {
        jquery: '../../org/jquery-2.1.3.min'//,
        /*千万注意不能后面加.js后缀*/
        //staticJS: "../.."
        //dmap: '../map'
    }
});


require(['jquery'], function($){

    //autoSlide();


    $(function(){
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

        //var curIndex = $(".slideTrigger a.curr").index();
        var curIndex = $(".ListItem.curr").index();

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

        $(".ListItem").removeClass("curr");
        $(".ListItem").eq(nextIndex).addClass("curr");

        $(".slideTrigger a").removeClass("curr");
        $(".slideTrigger a").eq(nextIndex).addClass("curr");

        console.log($(".ListItem").eq(curIndex-1).css("left"))

        //$(".ListItem").eq(curIndex).css({"left": 960*($(".ListItem").length-curIndex-1) + "px"});

        console.log($(".ListItem").eq(curIndex-1).css("left"))


    }
})

