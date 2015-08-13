/**
 * Created by Echo on 2015/8/11.
 */

require.config({
    paths: {
        jquery: '../../org/jquery-2.1.3.min'
    }
});


require(['jquery', '../../common/foreSeeImage/foreSeeImage'], function($, fm){
    console.log(fm)
    var fm = new fm.foreSeeImage();
    $(function(){


        $(".ListItem").hover(

            function(){
                $(".selDiv").show();

                /*初始化一个预览容器，可以自定义样式*/
                var $zoomDiv = fm.initZoomDiv($(".ListItem"), {"pos": "right", "wh": 600});

                $(".ListItem").mousemove(function(){

                    /*根据鼠标滚动来预览图片*/
                    fm.showForeImage($(".ListItem"), $(".selDiv"));

                })
            },
            function(){
                $(".selDiv").hide();

                /*清除预览图片的容器*/
                fm.deleteZoomDiv();

            }
        )

    })



    /*元素跟随鼠标移动*/
    function moveWithMouse($parentObj, $obj){
        /*获取鼠标相对于浏览器的偏移*/
        var posX = event.pageX;
        var posY = event.pageY;

        /*父元素相对于浏览器的偏移*/
        var eleOffLeft = $parentObj.offset().left;
        var eleOffTop = $parentObj.offset().top;

        /*获取元父元素的宽高*/
        var eleW = $parentObj.width();
        var eleH = $parentObj.height();

        /*获取移动半透框（元素）的宽高*/
        var jpW = $obj.width();
        var jpH = $obj.height();

        /*鼠标相对于父元素的偏移*/
        var mouseElex = posX-eleOffLeft;
        var mouseEleY = posY-eleOffTop;

        $obj.css({"left": + mouseElex-jpW/2 + "px", "top": mouseEleY-jpH/2 + "px"});

        if(mouseElex < jpW/2){
            $obj.css({"left": + "0"})
        } else if((eleW-mouseElex) < jpW/2){
            $obj.css({"left": + eleW-jpW + "px"})
        }

        if(mouseEleY < jpH/2){
            $obj.css({"top": + "0"})
        } else if((eleH-mouseEleY) < jpH/2){
            $obj.css({"top": + eleH-jpH + "px"})
        }

    }

})

