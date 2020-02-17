
import L from 'leaflet';
import { OVERLAYS, COLORS } from '../../../constants';
import { highlightGeoJSON, dehighlightGeoJSON, selectGeoJSON } from '../Utils/Selection';

const streetcars = require('../../../data/Streetcars.json');

export function addStreetcarsToMap(ind, layer, map) {
    var options = OVERLAYS[ind].OPTIONS;
    var curr = null;
    var colorIndex = Math.floor(Math.random() * 64);

    function getColor(feature, colorOptions, featureID) {
        //console.log(feature);
        colorIndex = colorIndex % 64;
        if (typeof(colorOptions) === 'string' && feature.geometry.type === 'MultiLineString') {
            return COLORS[colorIndex++];
        } else if (featureID !== null){
            return colorOptions[featureID];
        } else {
            return colorOptions;
        }
    }

    var data = L.geoJSON(streetcars, {
        style: function(feature) {
            return {
                color: getColor(feature, options.COLOR, null),
                fill: options.FILL,
                opacity: options.OPACITY,
                weight: options.WEIGHT,
            }
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                'mouseover': function (e) {
                    highlightGeoJSON(e.target);
                },
                'mouseout': function (e) {
                    dehighlightGeoJSON(data, e.target, curr);
                },
                'click': function(e) {
                    curr = selectGeoJSON(data, e.target, map, curr);
                }
            })
        }
    }).addTo(layer);
}