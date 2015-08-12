/**
 * Created by Echo on 2015/8/12.
 */


define(['jquery'], function($){

    var wf = function(){};

    wf.prototype = {
        waterFall: function(){
            var $imgSection = $(".section");
            /*计算整个页面显示的列数*/
            //var imgW = imgSection.eq(0).width();//不包含填充和边框， 不能这样求
            var imgW = $imgSection.eq(0).outerWidth();//包括填充和边框

            //console.log(imgW)
            //页面宽度
            var bodyW = $(".main-r").width();
            //console.log(bodyW)
            var cols = Math.floor(bodyW / imgW);
            $(".main-r-container").width(cols*imgW).css({"margin": "60px auto 0 auto"});

            console.log("cols: ", cols)

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

            console.log(hArr)
        },
        getMoreImg: function(){
            var imgObj = {};
            imgObj.imgList = new Array();
            for(var i = 0; i < 23; i++){
                var ranInt = Math.floor(Math.random()*38);
                imgObj.imgList.push({
                    "src": ranInt + ".jpg"
                });
            }

            $(imgObj.imgList).each(function(index, ele){
                //console.log("src: ", ele)
                var sectionStr = "<div class=\"section fl\">"
                    + "<div class=\"section-before\"><i class=\"fa fa-user\"></i></div>"
                    + "<div class=\"pic\">"
                    + "<img src=\"../../static/images/" + ele.src + "\"/>"
                    + "</div>"
                    + "</div>";

                $(".main-r-container").append(sectionStr);
            })
        },
        checkScrollSlide: function(){
            var $lastSection = $(".section:last-of-type");
            //console.log("$lastSection.offset().top: ", $lastSection.offset().top)
            var lastDis = $lastSection.offset().top + Math.floor($lastSection.height());///2
            //console.log("lastDis: ", lastDis)
            var scrollTop = $(window).scrollTop();
            //console.log("scrollTop: ", scrollTop)
            var targetTop = $(window).height();
            //console.log("targetTop: ", targetTop)
            if(lastDis < scrollTop + targetTop){
                return true;
            } else{
                return false;
            }
        }
    }

    return {wf: wf}

})