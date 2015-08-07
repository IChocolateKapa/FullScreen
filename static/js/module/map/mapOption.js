/**
 * Created by Administrator on 2015/8/7.
 */

var GLOBAL_MapParams = {};
GLOBAL_MapParams.centerLat = 39.90403;
GLOBAL_MapParams.centerLng = 116.407526;
GLOBAL_MapParams.marker = null;
GLOBAL_MapParams.markerLat = GLOBAL_MapParams.centerLat;
GLOBAL_MapParams.markerLng = GLOBAL_MapParams.centerLng;
GLOBAL_MapParams.markerAddr = "北京";
GLOBAL_MapParams.mapZoom = 12.0;
GLOBAL_MapParams.mapType = google.maps.MapTypeId.ROADMAP;
GLOBAL_MapParams.rectArray = new Array();
GLOBAL_MapParams.circleArray = new Array();
GLOBAL_MapParams.polylineArray = new Array();
GLOBAL_MapParams.markerArray = new Array();



var MAP = {

    /*初始地图定位对象*/
    initGeocoder: function(){
        var geo = new google.maps.Geocoder();
        return geo;
    },

    /*初始创建地图*/
    initMap: function(mapContainerId, mapOption){
        var map = new google.maps.Map(document.getElementById(mapContainerId), mapOption);
        return map;
    },

    /*通过经纬度设置地图点对象*/
    getMapLocation: function(lat, lng)
    {
        var latlng = new google.maps.LatLng(lat, lng);
        return latlng;
    },

    /*通过输入的地址将地图转到相应地点*/
    codeAddress: function(geocoder, map, addrId) {
        var address = this.getMarkerAddr(addrId);

        geocoder.geocode({'address': address}, function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
                    var latlng = results[0].geometry.location;
                    var w_latlng =
                    map.setCenter(latlng);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
    },
    /*获取地图缩放级别*/
    getMapZoom: function(map){
        try{
            var mapZoom = map.getZoom();
        } catch (error){
            var mapZoom = 12.0;
        }
        return mapZoom;
    },

    /*给地图设置缩放级别*/
    setMapZoom: function(map, n){
        map.setZoom(n);
    },

    /*获取地图类型的简称*/
    getMapType: function(map){
        var mapType = map.getMapTypeId(); //satellite,

        if (mapType == google.maps.MapTypeId.SATELLITE) {
            return 's';
        } else if (mapType == google.maps.MapTypeId.HYBRID){
            return 'h';
        } else if (mapType == google.maps.MapTypeId.TERRAIN){
            return 't';
        } else {
            return 'r';
        }
    },

    /*设置地图类型*/
    setMapType: function(map, mapType){
        if (mapType == 's' ||  mapType == "satellite") {
            map.setMapTypeId("satellite");
        } else if (mapType == 'h' || mapType == "hybrid"){
            map.setMapTypeId("hybrid");
        } else if (mapType == 't' || mapType == "terrain"){
            map.setMapTypeId("terrain");
        } else {
            map.setMapTypeId("roadmap");
        }
    },

    /*获取当前地图的类型ID*/
    getCurMapTypeId: function(map){
        try{
            var mapType = map.getMapTypeId(); //satellite,
        } catch (error){
            return google.maps.MapTypeId.ROADMAP;
        }

        if (mapType == "satellite") {
            return google.maps.MapTypeId.SATELLITE;
        } else if (mapType == "hybrid"){
            return google.maps.MapTypeId.HYBRID;
        } else if (mapType == "terrain"){
            return google.maps.MapTypeId.TERRAIN;
        } else {
            return google.maps.MapTypeId.ROADMAP;
        }
    },

    /*获取地图中心纬度*/
    getCenterLat: function(map) {
        try{
            var centerLat = map.getCenter().lat();
        } catch (err){
            var centerLat = GLOBAL_MapParams.centerLat;
        }
        return centerLat;
    },

    /*获取地图中心经度*/
    getCenterLng: function(map) {
        try{
            var centerLng = map.getCenter().lng();
        } catch (err){
            var centerLng = GLOBAL_MapParams.centerLng;
        }

        return centerLng;
    },

    /*获取地图中心经纬度*/
    getCenterLatLng: function(map) {
        try{
            var centerLat = map.getCenter().lat();
            var centerLng = map.getCenter().lng();

        } catch (error){
            var centerLat = GLOBAL_MapParams.centerLat;
            var centerLng = GLOBAL_MapParams.centerLng;
        }

        return [centerLat, centerLng];
    },

    /*获取地图上marker的纬度*/
    getMarkerLat: function(marker) {
        var markerLat = marker.getPosition().lat();
        var markerLng = marker.getPosition().lng();

        var WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(markerLat),parseFloat(markerLng));

        return WGS84loc[0];
    },
    /*获取地图上marker的纬度*/
    getMarkerLng: function(marker){
        var markerLat = marker.getPosition().lat();
        var markerLng = marker.getPosition().lng();

        var WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(markerLat),parseFloat(markerLng));

        return WGS84loc[1];
    },

    /*获取地图上marker的经纬度*/
    getMarkerLatLng: function(marker){
        var markerLat = marker.getPosition().lat();
        var markerLng = marker.getPosition().lng();

        var WGS84loc = new WGS84_to_GCJ02().detransform(parseFloat(markerLat),parseFloat(markerLng))

        return WGS84loc;
    },

    /*获取输入的地图地点名称*/
    getMarkerAddr: function(addrID) {
        //var markerAddr = $('#'+addrID).val();
        var markerAddr = document.getElementById(addrID).value;
        return markerAddr;
    },

    /*获取矩形的两个顶点*/
    getRectNESWLatLng: function(rect){
        var ne = rect.getBounds().getNorthEast();
        var sw = rect.getBounds().getSouthWest();

        /*矩形的对角顶点*/
        northeastlng = ne.lng();
        northeastlat  = ne.lat();
        southwestlng = sw.lng();
        southwestlat  = sw.lat();
        return [northeastlat, northeastlng, southwestlat, southwestlng];
    }


}


