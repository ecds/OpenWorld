import L from 'leaflet';
import {} from 'leaflet.vectorgrid';
import { MAP_MAX_ZOOM } from '../../../constants';

const data = require('../../../data/Buildings.json');

var curr = null;
var highlight;

// TODO: extract highlight / select to Utils
export function addBuildingsToMap(layer, map) {
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
                return 'darkbrown';
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
            fillOpacity: 0.3,
            opacity: 0.5,
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
            fillOpacity: 0.4,
            weight: 2,
            opacity: 0.7,
            fill: true,
        }
    }

    var vectorGrid = new L.vectorGrid.slicer(data, {
        rendererFactory: L.svg.tile,
        vectorTileLayerStyles: {
            sliced: style,
        },
        interactive: true,
        maxZoom: MAP_MAX_ZOOM,
        getFeatureId: function(f) {
            return f.properties.BLDG_ID;
        }
    })		
    .on('mouseover', function(e) {
        var properties = e.layer.properties;
        

        clearHighlight();
        highlight = properties.BLDG_ID;

        vectorGrid.setFeatureStyle(properties.BLDG_ID, strongStyle(properties.use));
    })
    .on('mouseout', function(e) {
        clearHighlight();
    }) //TODO: ADD SELECT FUNCTION
    .on('click', function(e) {
    // console.log(e.layer.properties)
    // var properties = e.layer.properties;
    // if (highlight !== properties.BLDG_ID) 
    //     clearHighlight();
    
    // var bounds = vectorGrid.getBounds();
    
    // map.fitBounds(bounds);
    // //console.log(e.layer._pxBounds)
    // vectorGrid.setFeatureStyle(properties.BLDG_ID, strongStyle(properties.use));
    })
    .addTo(layer);
    return;
}