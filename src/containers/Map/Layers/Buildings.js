import L from 'leaflet';
import {} from 'leaflet.vectorgrid';

import { MAP_OPTIONS, OVERLAYS } from '../../../constants';

import store from '../../../redux/store';
import { updateInfo } from '../../../redux/actions';

// // const data = require('../../../data/Buildings.json');
// const data = require('../../../data/buildings_1928.json');

var highlight;
var selected;

// TODO: extract highlight / select to Utils
export function addBuildingsToMap(ind, layer, map) {
    function clearHighlight() {
        if (highlight) {
            vectorGrid.resetFeatureStyle(highlight);
        }
        highlight = null;
    }

    function getColor(type) {
        switch(type) {
            case 'A':
                return 'olive';
            case 'C':
                return 'red';
            case 'F':
                return 'orange';
            case 'FILM':
                return 'pink';
            case 'I':
            case 'MFG':
                return 'purple';
            case 'M':
                return 'brown';
            case 'O':
                return 'black';
            case 'P':
            case 'FD':
                return 'blue';
            case 'R':
                return 'yellow';
            case 'T':
                return 'lightgray';
            case 'U':
                return 'gray';
            case 'W':
                return 'violet';
            default:
                return 'cyan';
        }
    }

    function style(building) {
        return {
            fillOpacity: 0.15,
            opacity: 0.3,
            fillColor: getColor(building.use),
            color: getColor(building.use),
            fill: true,
            weight: 1,
        };
    }

    function strongStyle(use) {
        return {
            fillColor: getColor(use),
            color: getColor(use),
            fillOpacity: 0.3,
            weight: 2,
            opacity: 0.5,
            fill: true,
        }
    }

    var vectorGrid;

    fetch(OVERLAYS[ind].URL)
    .then((response) => { return response.json(); })
    .then((data) => {
        vectorGrid = new L.vectorGrid.slicer(data, {
            rendererFactory: L.canvas.tile,
            vectorTileLayerStyles: {
                sliced: style,
            },
            interactive: true,
            maxZoom: MAP_OPTIONS.maxZoom,
            getFeatureId: function(f) {
                return f.properties.BLDG_ID;
            }
        })		
        .on('mouseover', function(e) {
            var properties = e.layer.properties;

            clearHighlight();

            if (properties.BLDG_ID !== selected)
                highlight = properties.BLDG_ID;
        
            vectorGrid.setFeatureStyle(properties.BLDG_ID, strongStyle(properties.use));
        })
        .on('mouseout', function(e) {
            if (highlight !== selected)
                clearHighlight();
        }) 
        .on('click', function(e) {
            store.dispatch(updateInfo({type: 'building', properties: e.layer.properties}));
            var properties = e.layer.properties;

            clearHighlight();
            vectorGrid.resetFeatureStyle(selected);

            selected = properties.BLDG_ID;
            vectorGrid.setFeatureStyle(properties.BLDG_ID, strongStyle(properties.use));
        })
        .addTo(layer);
    });

    map.on('click', clearHighlight);
    return;
}