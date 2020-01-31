import L from 'leaflet';
import {} from 'leaflet.vectorgrid';
import { OVERLAYS, DIV_ICONS } from '../../../constants';

import { populatePopup } from '../Utils/Popups.js';

export function addClusterToMap(ind, layer) {
    var options = OVERLAYS[ind].OPTIONS;
    var cluster = L.markerClusterGroup();

    var divIcon = L.divIcon({
        className: DIV_ICONS[options.DIV_ICON].CLASS_NAME,
        html: 	   DIV_ICONS[options.DIV_ICON].HTML,
        iconSize:  DIV_ICONS[options.DIV_ICON].ICON_SIZE,
    });

    fetch(OVERLAYS[ind].URL)
    .then((response) => { return response.json() })
    .then((data) => {
        for (var i = 0; i < data.features.length; i++) {
            var m = L.marker(new L.latLng(data.features[i].geometry.coordinates[1], 
                                          data.features[i].geometry.coordinates[0]),
                                          {icon: divIcon}); // WILL CAUSE PROBLEMS IF OVERLAYS NOT PROPERLY DEFINED

            if (options.POPUP_CONTENT) {
                let popupContent = populatePopup(data.features[i], ind);
                m.bindTooltip(popupContent, {offset: new L.Point(-15, 0), direction: 'left'});
                m.on('mouseover', function() { this.openTooltip() }); // DO NOT USE ARROW FUNCTIONS HERE
                m.on('mouseout', function() { this.closeTooltip() });
            }
            
            cluster.addLayer(m);
        }
        cluster.addTo(layer);
    });
}