/**
 * Created by Administrator on 2015/8/7.
 */

/*为谷歌地图添加了labelMarker的组件*/
google.maps.LabelMarker = function(latlng, options){
    this.latlng = latlng;
    //this.labelText = options.labelText || '';
    this.labelClass = options.labelClass || 'writeb';
    this.labelOffset = options.labelOffset || new google.maps.Size(8, -33);
    options.icon = options.icon || null;/*getTextIcon()*/
    google.maps.Marker.apply(this, arguments);
}

google.maps.LabelMarker.prototype = new google.maps.Marker(new google.maps.LatLng(0, 0));

google.maps.LabelMarker.prototype.initialize = function(map){
    google.maps.Marker.prototype.initialize.call(this, map);

    var label = document.createElement('div');
    label.className = this.labelClass;
    label.innerHTML = this.labelText;
    label.style.position = 'absolute';
    label.style.minWidth = '30px';
    map.getPane(G_MAP_MARKER_PANE).appendChild(label);

    this.map = map;
    this.label = label;
}

google.maps.LabelMarker.prototype.redraw = function(force){
    google.maps.Marker.prototype.redraw.call(this, map);

    if(!force) {
        return;
    }

    var point = this.map.fromLatLngToDivPixel(this.latlng);
    var z = google.maps.Overlay.getZIndex(this.latlng.lat());

    this.label.style.left = (point.x + this.labelOffset.width) + 'px';
    this.label.style.top = (point.y + this.labelOffset.height) + 'px';
    this.label.style.zIndex = z + 1;
}

google.maps.LabelMarker.prototype.remove = function(){
    this.label.parentNode.removeChild(this.label);
    this.label = null;
    google.maps.Marker.prototype.remove.call(this);
}

function getTextIcon(){
    var icon = new google.maps.Icon();
    icon.image = "/js/map/img/mapts.gif";
    icon.iconSize = new GSize(48, 40);
    icon.iconAnchor = new GPoint(0, 40);
    icon.infoWindowAnchor = new GPoint(5, 1);
    return icon;
}
