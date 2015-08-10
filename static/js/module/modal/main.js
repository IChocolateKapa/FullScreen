/**
 * Created by Echo on 2015/8/10.
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


require(["jquery", 'window'], function($, w){
    $("#phone").click(function(){
        new w.window().alert("手机号", "18612552963", {
                "width": 400,
                "height": 120,
                "x": '50%',
                //"margin-left": "-" + this.cfg.width/2 + "px",
                "y": '20%'
            }
        );
    })
})

require(['jquery'], function($){
    $(window).resize(function(){
        var h = $(window).height()-$(".header").height() - 5;
        $(".content").height(h);
    })
})

require(["../map/mapController"]);



require(['jquery'], function($){
    //动态调整地图高度
    var h = $(window).height() - $(".header").height() - 3;
    $(".content").height(h);

    /*预览toggle*/
    $(".staylogin").click(function () {
        $("._chbx").toggleClass("_nologin");

        if($("._chbx").hasClass("._nologin")){

        } else{

        }

    })

    /*输入地址转到相应位置*/
    $("#search").click(function () {
        MAP.codeAddress(GLOBAL_MapParams.geocoder, GLOBAL_MapParams.map, GLOBAL_MapParams.addrId);
    })

})