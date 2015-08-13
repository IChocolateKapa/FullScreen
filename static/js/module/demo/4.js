/**
 * Created by Echo on 2015/8/11.
 */

require.config({
    paths: {
        jquery: '../../org/jquery-2.1.3.min'
    }
});


require(['jquery', '../../common/foreSeeImage/foreSeeImage'], function($, fm){

    var fm = new fm.foreSeeImage();

    $(function(){
        $(".ListItem.curr").hover(
            function(){
                /*初始化一个预览容器，可以自定义样式*/
                var $selObj = fm.initZoomDiv($(".ListItem"), {"pos": "right", "wh": 600});
                var $thisList = $(this);
                $thisList.mousemove(function(){
                    /*根据鼠标滚动来预览图片*/
                    fm.showForeImage($thisList, $selObj);
                })
            },
            function(){
                /*清除预览图片的容器*/
                fm.deleteZoomDiv();

            }
        )

    })

})

