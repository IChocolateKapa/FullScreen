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

        console.log(center)
        var mapOptions = {
            zoom: mapzoom,
            center: center,
            mapTypId: maptype
        }

        GLOBAL_MapParams.map = MAP.initMap(GLOBAL_MapParams.addrId, mapOptions);
//            MAP.setMapType(GLOBAL_MapParams.map, maptype);

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
                fillColor: 'pink',
                fillOpacity: 0.5,
                strokeColor: 'red',
                strokeWeight: 2,
                draggable: true
            },
            circleOptions: {

            },
            polylineOptions:{
                strokeColor: 'red',
                strokeWeight: 2
            },
            markerOptions : {
                //icon: 'static/image/1.jpg',
                draggable:true
            }
        });

        GLOBAL_MapParams.drawingManager.setMap(GLOBAL_MapParams.map);

        google.maps.event.addListener(GLOBAL_MapParams.drawingManager, 'rectanglecomplete', function showNewRect(rectangle) {
            GLOBAL_MapParams.rectArray.push(rectangle);
            GLOBAL_MapParams.drawingManager.setDrawingMode(null);
        });

    }

    google.maps.event.addDomListener(window, 'load', function(){
        initialize(true);
    });
})
