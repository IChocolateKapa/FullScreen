/**
 * Created by Administrator on 2015/8/7.
 */
$(function () {

    GLOBAL_MapParams.addrId  = "mapCanvas";

    function initialize(flag){
        GLOBAL_MapParams.geocoder = MAP.initGeocoder();

        /*获取MapCenter*/
        var center = MAP.getMapLocation(MAP.getCenterLat(GLOBAL_MapParams.map), MAP.getCenterLng(GLOBAL_MapParams.map));


        try{
            var mapzoom = MAP.getMapZoom(GLOBAL_MapParams.map);
            throw "没有获得mzoom";
        } catch (error) {
            var mapzoom = GLOBAL_MapParams.mapZoom;
        }

        try{
            var maptype = MAP.getCurMapTypeId(GLOBAL_MapParams.map);
            throw "没有获得mtype";
        } catch (error) {
            var maptype = GLOBAL_MapParams.mapType;
        }

        var mapOptions = {
            zoom: mapzoom,
            center: center,
            mapTypId: maptype
        }

        GLOBAL_MapParams.map = MAP.initMap(GLOBAL_MapParams.addrId, mapOptions);

        /*drawingMode: google.maps.drawing.OverlayType.RECTANGLE,the following is how to set hand to be selected by default*/
        GLOBAL_MapParams.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.RECTANGLE,
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYLINE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.MARKER
                ]
            },
            rectangleOptions: {
                fillColor: 'blue',
                fillOpacity: 0.3,
                strokeColor: 'red',
                strokeWeight: 2,
                draggable: true,
                editable:　false
            },
            circleOptions: {
                fillColor: "rgba(234, 45, 134, .6)",
                strokeColor: "rgba(167, 200, 4, .9)",
                draggable: true,
                editable:　false
            },
            polylineOptions:{
                strokeColor: 'red',
                strokeWeight: 2,
                draggable: true,
                editable:　false
            },
            markerOptions : {
                //icon: 'static/image/1.jpg',
                draggable:true
            }
        });

        GLOBAL_MapParams.drawingManager.setMap(GLOBAL_MapParams.map);

        google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'rectanglecomplete', function s(rectangle) {
            GLOBAL_MapParams.rectArray.push(rectangle);
            GLOBAL_MapParams.drawingManager.setDrawingMode(null);
        });
        google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'circlecomplete', function s(circle) {
            GLOBAL_MapParams.circleArray.push(circle);
            GLOBAL_MapParams.drawingManager.setDrawingMode(null);
        });
        google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'markercomplete', function s(marker) {
            GLOBAL_MapParams.markerArray.push(marker);
            GLOBAL_MapParams.drawingManager.setDrawingMode(null);
        });
        google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'polylinecomplete', function s(poly) {
            GLOBAL_MapParams.polylineArray.push(poly.getPath().getArray());
            google.maps.event.addListener(poly, 'dblclick', GLOBAL_MapParams.polylineArray.removeEle(this));
            GLOBAL_MapParams.drawingManager.setDrawingMode(null);
        });


    }

    google.maps.event.addDomListener(window, 'load', function(){
        initialize(true);
    });
})


function doubleClickRemoveCallback(event, arr){
    for(var i = 0; i < arguments.length; i++){
        console.log("arguments["+i+"] = ", arguments[i]);
    }

    console.log(event.target);
    //this.setMap(null);
    //arr.pop(this);
    //if(arr.length == 0){
    //    alert("length=0")
    //}
}