/**
 * Created by Administrator on 2015/8/5.
 */

window.onload = waterFall;

function waterFall(){
    var $imgSection = $(".section");
    /*��������ҳ����ʾ������*/
    //var imgW = imgSection.eq(0).width();//���������ͱ߿� ����������
    var imgW = $imgSection.eq(0).outerWidth();//�������ͱ߿�

    console.log(imgW)
    //ҳ����
    var bodyW = $(window).width();
    console.log(bodyW)
    var cols = Math.floor(bodyW / imgW);
    $(".container").width(cols*imgW).css({"margin": "0 auto"});
    //$(".container").css({"margin": "0 auto"});
    console.log(cols)

    var hArr = new Array();
    $imgSection.each(function(index, value){
        var imgH = $imgSection.eq(index).outerHeight();
        if(index < cols){//��һ��
            hArr.push(imgH);
        } else{
            var minH = Math.min.apply(null, hArr);/*����������Сֵ*/
            var minHIndex = $.inArray(minH, hArr);/*��������ĳ��ֵ������*/

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