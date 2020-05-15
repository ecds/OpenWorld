import React from 'react';
import { MdRadioButtonChecked, MdTram } from 'react-icons/md';
import { FaCity, FaBorderAll, FaRoad, FaTrain } from 'react-icons/fa';

export const THEME = {
    MAIN:   '#DB504B',
    SECOND: '#FFFFFF',
    THIRD:  '#E47975',
    TEXT:   '#515151',
}

/* map constants */
export const MAP_OPTIONS = {
    center:      [33.749038, -84.388466],
    minZoom:     11,
    zoom:        16,
    maxZoom:     20,
    zoomControl: true,
    maxBounds:   [[33.53, -84.61], [34.03, -84.11]],
};

export const MAP_TILE_LAYERS = [
    // 1000-SCALE
    {
        url: 'https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png',
        bounds: [[33.93379544, -84.21603335], [33.63298531, -84.51696580]], 
        minZoom: 11,
        maxNativeZoom: 16, // MAX NATIVE ZOOM
    },
    // 200-SCALE
    {
        url: 'https://s3.amazonaws.com/tilemaps/ATL28_200tiles/{z}/{x}/{y}.png',
        bounds: [[33.78337253, -84.31633406], [33.73327062, -84.41714544]],
        minZoom: 11, 
        maxNativeZoom: 19, // MAX NATIVE ZOOM
    },
];

// div icons for the map
export const DIV_ICONS = [
    {
        HTML:       '<i class="icon-radio-checked"/>',
        ICON_SIZE:  [16, 16],
    },
];

// overlay layers
export const OVERLAYS = [
    {
        desc: 'Overlay the utility holes present in Atlanta in 1928.',
        attr: 'Source: Atlanta Atlas, 1928.',
        id: 'manholes',
        icon: <MdRadioButtonChecked />,
        label: 'Utility Holes',
        type: 'cluster',
        url: 'https://geoserver.ecds.emory.edu/ATLMaps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ATLMaps:ATL28_Utility_Holes&outputFormat=application%2Fjson',
        options: {
            div_icon: <MdRadioButtonChecked />,
            popup_content: [
                {
                    content: '<b>Utility Hole</b>',
                    type: 'text',
                    CONDITIONAL: false,
                }, 
                {
                    content: '<br />Located on ',
                    suffix: '',
                    type: 'text',
                    conditional: true,
                    property: 'name_st',
                    falsyValue: '',
                },
                {
                    content: '<br />Elevation: ',
                    suffix: 'ft',
                    type: 'text',
                    conditional: true,
                    property: 'man_elev',
                    falsyValue: 0,
                },
            ],
        }
    },
    {
        desc: 'City Boundaries of Atlanta, 1928.',
        attr: 'Source TBA',
        id: 'boundary',
        icon: <FaBorderAll />,
        label: 'City Boundary',
        type: 'polygon',
        url: 'https://geoserver.ecds.emory.edu/ATLMaps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ATLMaps:Atlanta%20City%20Limits&outputFormat=application%2Fjson',
        options: {
            color: 'black',
            weight: 5,
            fillColor: THEME.THIRD,
            fillOpacity: 0.2,
            opacity: 1,
        }
    },
    {
        desc: 'Atlanta Road Network, 1928.',
        attr: 'Source TBA',
        id: 'roads',
        icon: <FaRoad />,
        label: 'Roads',
        type: 'roads',
        url: 'https://geoserver.ecds.emory.edu/OpenWorldAtlanta/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenWorldAtlanta:Atlanta1928_RoadSystem&outputFormat=application%2Fjson',
        options: {
            color: 'black',
            fill: false,
            opacity: 1,
            weight: 3,
        }
    },
    {
        desc: 'Atlanta Streetcar Network, 1928.',
        attr: 'Source TBA',
        id: 'streetcars',
        icon: <MdTram />,
        label: 'Streetcars',
        type: 'paths',
        url: 'https://atlanta.urbanspatialhistory.org/resources/layers/Streetcars.json',
        options: {
            color: 'green',
            fill: false,
            opacity: 1,
            weight: 2 
        }
    },
    {
        desc: 'Buildings in Atlanta, 1928',
        attr: 'Source TBA',
        id: 'buildings',
        icon: <FaCity />,
        label: 'Buildings',
        type: 'buildings',
        url: 'https://atlanta.urbanspatialhistory.org/resources/layers/buildings_1928.json',
        options: {
            interactive: true,
            unique: 'BLDG_ID'
        }
    },
    {
        desc: 'Railways in Atlanta, 1928',
        attr: '',
        id: 'railways',
        icon: <FaTrain />,
        label: 'Railways',
        type: 'railways',
        url: 'https://atlanta.urbanspatialhistory.org/resources/layers/Railways.json',
        options: {
            color: 'green',
            fill: false,
            opacity: 1,
            weight: 2 
        }
    }
];

export const TEXT = [

];

export const TAGS = {
    buildings: {
        BLDG_ID: {
            tag: 'Building ID',
            falsyValue: '',
            tooltip: 'A unique identifier assigned to each building in the OpenWorld Atlanta database.',
        },
        Removed: {
            tag: 'Removed',
            falsyValue: '',
            tooltip: 'Indicates whether a building has been removed.',
        },
        bldg_ht: {
            tag: 'Height (ft)',
            fallback: 'calc_ht',
            falsyValue: 0,
            tooltip: 'The calculated (or known) height of the building in meters.',
        },
        use: {
            tag: 'Use',
            falsyValue: '',
            tooltip: 'The building\'s zoning code. Legend to come.',
        },
        y_coord: {
            tag: 'Latitude',
            falsyValue: '',
            tooltip: '',
        },
        x_coord: {
            tag: 'Longitude',
            falsyValue: '',
            tooltip: '',
        }
    }
};

export const COLORS = [
    '#000000','#00FF00','#0000FF','#FF0000','#01FFFE','#FFA6FE','#FFDB66','#006401',
    '#010067','#95003A','#007DB5','#FF00F6','#FFEEE8','#774D00','#90FB92','#0076FF',
    '#D5FF00','#FF937E','#6A826C','#FF029D','#FE8900','#7A4782','#7E2DD2','#85A900',
    '#FF0056','#A42400','#00AE7E','#683D3B','#BDC6FF','#263400','#BDD393','#00B917',
    '#9E008E','#001544','#C28C9F','#FF74A3','#01D0FF','#004754','#E56FFE','#788231',
    '#0E4CA1','#91D0CB','#BE9970','#968AE8','#BB8800','#43002C','#DEFF74','#00FFC6',
    '#FFE502','#620E00','#008F9C','#98FF52','#7544B1','#B500FF','#00FF78','#FF6E41',
    '#005F39','#6B6882','#5FAD4E','#A75740','#A5FFD2','#FFB167','#009BFF','#E85EBE'
];
