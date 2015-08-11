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

    autoSlide();

    $(function(){
        var slideTime;
        $(".slideTrigger li").mouseenter(function(){
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
        })


        $(".ListItem").mouseenter(
            function(){
                var $this = $(this);
                /*检测鼠标移动*/
                /*$this.bind("mousemove", function(){
                    showSlidePage(event, $this);
                })*/

                $this.mousemove(function(){
                    showSlidePage(event, $this);
                })
            }
        )

        $(".ListItem").mouseleave(function(){
            //var $this = $(this);
            /*$this.unbind("mousemove", function(){
                showSlidePage(event, $this);
            });*/

            $(".slider-next").hide(100);
            $(".slider-prev").hide(100);
        })
    })



    var globalSlide;
    function autoSlide(){
        globalSlide = window.setInterval(function(){
            var curIndex = $(".ListItem.curr").index();
            var nextIndex = curIndex + 1;
            if(nextIndex > $(".ListItem").length - 1){
                nextIndex = 0;
            }
            $(".slideTrigger a").removeClass("curr");
            $(".slideTrigger a").eq(nextIndex).addClass("curr");
            $(".ListItem").removeClass("curr");
            $(".ListItem").eq(nextIndex).addClass("curr");

        }, 5000)
    }

    function showSlidePage(event, $obj){
        /*获取鼠标相对于浏览器的偏移*/
        var posX = event.pageX;
        var posY = event.pageY;

        /*获取ListItem img相对于浏览器偏移*/

        /*元素相对于absolute父元素的偏移*/
        //console.log("$this.position().top: ", $this.position().top)
        //console.log("$this.position().left: ", $this.position().left)

        /**/
        //console.log("$this.clientX: ", $this.clientX)
        //console.log("$this.clientY: ", $this.clientY)

        /*元素相对于浏览器的偏移*/
        var eleOffTop = $obj.offset().top;
        var eleOffLeft = $obj.offset().left;
        //console.log("$this.offset().top: ", $obj.offset().top)
        //console.log("$this.offset().left: ", $obj.offset().left)

        /*鼠标相对于浏览器的偏移量（posX, posY）= 元素相对于浏览器的偏移量（eleOffLeft, eleOffTop） + 鼠标相对于元素左边和顶边的偏移*/
        /*故 (posX, posY) - (eleOffLeft, eleOffTop)= 鼠标相对于元素左边和顶边的偏移 (offX, offY)*/
        var offX = posX - eleOffLeft;
        var offY = posY - eleOffTop;
        /*获取元素的宽高*/
        var eleW = $obj.width();
        var eleH = $obj.height();

        if(offX > eleW/2){
            /*$(".slider-next").css({
                "opacity": "1"
            })
            $(".slider-prev").css({
                "opacity": "0"
            })*/
            $(".slider-next").show(100);
            $(".slider-prev").hide(100);
        } else {
            /*$(".slider-next").css({
                "opacity": "0"
            })
            $(".slider-prev").css({
                "opacity": "1"
            })*/
            $(".slider-next").hide(100);
            $(".slider-prev").show(100);
        }
    }
})

