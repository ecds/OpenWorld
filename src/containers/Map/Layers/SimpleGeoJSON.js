import L from 'leaflet';
import { OVERLAYS } from '../../../constants';

export function addSimpleGeoJSONToMap(ind, layer) {
    var options = OVERLAYS[ind].OPTIONS;

    fetch(OVERLAYS[ind].URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        new L.GeoJSON(data, {
            color: options.COLOR,
            opactiy: 1,
            weight: options.WEIGHT,
            fillOpacity: options.FILL_OPACITY, 
            fillColor: options.FILL_COLOR,
            interactive: false,
        }).addTo(layer);
    });
}