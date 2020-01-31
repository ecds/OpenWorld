import L from 'leaflet';
import { OVERLAYS, MAP_MAX_ZOOM } from '../../../constants';

export function addRoadsToMap(ind, layer) {
    var options = OVERLAYS[ind].OPTIONS;

    fetch(OVERLAYS[ind].URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        new L.vectorGrid.slicer(myJson, {
            rendererFactory: L.svg.tile,
            vectorTileLayerStyles: {
                sliced: {
                    color: options.COLOR,
                    opacity: options.OPACITY,
                    weight: options.WEIGHT,
                    fill: options.FILL,
                }
            },
            interactive: false,
            maxZoom: MAP_MAX_ZOOM,
            getFeatureId: function(f) {
                return f.properties.OBJECTID;
            }
        })/*
        .on('mouseover', function(e) { 
            console.log(e);
            //document.getElementById('object-info').innerHTML = e.layer.properties.ROAD_NAME;
        //	vectorGrid.setFeatureStyle(e.layer.properties.OBJECTID, { opacity: 1, color: 'black' });
        })
        //.on('mouseout', function(e) { 
        //	vectorGrid.setFeatureStyle(e.layer.properties.OBJECTID, { opacity: 0 });
        //})			*/
        .addTo(layer);
    });
}