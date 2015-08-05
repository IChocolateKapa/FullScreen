/**
 * Created by Administrator on 2015/8/5.
 */

window.onload = waterFall;

function waterFall(){
    var $imgSection = $(".section");
    /*计算整个页面显示的列数*/
    //var imgW = imgSection.eq(0).width();//不包含填充和边框， 不能这样求
    var imgW = $imgSection.eq(0).outerWidth();//包括填充和边框

    console.log(imgW)
    //页面宽度
    var bodyW = $(window).width();
    console.log(bodyW)
    var cols = Math.floor(bodyW / imgW);
    $(".container").width(cols*imgW).css({"margin": "0 auto"});
    //$(".container").css({"margin": "0 auto"});
    console.log(cols)

    var hArr = new Array();
    $imgSection.each(function(index, value){
        var imgH = $imgSection.eq(index).outerHeight();
        if(index < cols){//第一行
            hArr.push(imgH);
        } else{
            var minH = Math.min.apply(null, hArr);/*求数组中最小值*/
            var minHIndex = $.inArray(minH, hArr);/*求数组中某数值的索引*/

            $(value).css({
                "position": "absolute",
                "top": minH+"px",
                "left": imgW*minHIndex + "px"
            })

            hArr[minHIndex] += imgH;
        }
    })

    console.log(hArr);
}