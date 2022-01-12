import React from 'react';
import { FaCity, FaRoad, FaTrain } from 'react-icons/fa';
import chroma from 'chroma-js';

export const THEME = {
    MAIN:   '#DB504B',
    SECOND: '#FFFFFF',
    THIRD:  '#E47975',
    TEXT:   '#515151',
}

/* map constants */
export const MAP_OPTIONS = {
    center:      [33.75432, -84.38979],
    minZoom:     11,
    zoom:        13,
    maxZoom:     20,
    zoomControl: true,
    maxBounds:   [[33.53, -84.61], [34.03, -84.11]],
};

export const MAP_TILE_LAYERS = [
    {
        urls: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
            'https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png'
        ],
        year: 0,
        opacity: 1,
        title: 'Modern Topography'
    },
    {
        urls: [
            'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        ],
        year: 2022,
        opacity: 0,
        title: 'Modern Street Map'
    },
    {
        urls: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            'https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png'
        ],
        year: 2022,
        opacity: 0,
        title: 'Modern Satellite Image'
    },
    ,
    {
        urls: ['https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true'],
        type: 'WMS',
        year: 1840,
        opacity: 0,
        title: '1878 City Atlas'
    },
    {
        urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:Atlanta1906&format=image/png&transparant=true'],
        type: 'WMS',
        year: 1906,
        opacity: 0,
        title: '1906 City Map'
    },
    {
        urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:sq4pd&format=image/png&transparant=true'],
        type: 'WMS',
        year: 1911,
        opacity: 0,
        title: '1911 Street Map'
    },
    // 1000-SCALE
    {
        urls: [
            'https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png',
            'https://s3.amazonaws.com/tilemaps/ATL28_200tiles/{z}/{x}/{y}.png'
        ],
        bounds: [[33.93379544, -84.21603335], [33.63298531, -84.51696580]],
        minZoom: 11,
        maxNativeZoom: 16,
        year: 1928,
        opacity: 0,
        title: '1928 City Atlas'
    }
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
        desc: 'Atlanta Road Network, 1928.',
        attr: 'Source TBA',
        id: 'roads',
        icon: <FaRoad />,
        label: 'Roads',
        type: 'roads',
        activeColor: THEME.MAIN,
        url: 'https://geoserver.ecds.emory.edu/OpenWorldAtlanta/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenWorldAtlanta:Atlanta1928_RoadSystem&outputFormat=application%2Fjson',
        options: {
            color: 'black',
            fill: false,
            opacity: 1,
            weight: 3,
        }
    },
    {
        desc: 'Railways in Atlanta, Today',
        attr: '',
        id: 'railways',
        icon: <FaTrain />,
        label: 'Railways Today',
        type: 'railways',
        activeColor: THEME.MAIN,
        url: 'https://geoserver.ecds.emory.edu/ATLMaps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ATLMaps:railways-today&maxFeatures=5000&outputFormat=application%2Fjson',
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
        activeColor: THEME.MAIN,
        url: 'https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:buildings_1928@EPSG:900913@pbf/{z}/{x}/{-y}.pbf',
        options: {
            interactive: true,
            unique: 'BLDG_ID'
        }
    }
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

const StreetcarLines = {
    1924: [
        '1924_Route_1',
        '1924_Route_2',
        '1924_Route_3',
        '1924_Route_4',
        '1924_Route_5',
        '1924_Route_6',
        '1924_Route_7',
        '1924_Route_8',
        '1924_Route_9',
        '1924_Route_10',
        '1924_Route_11',
        '1924_Route_12',
        '1924_Route_13',
        '1924_Route_14',
        '1924_Route_15',
        '1924_Route_16',
        '1924_Route_17',
        '1924_Route_18',
        '1924_Route_19',
        '1924_Route_20',
        '1924_Route_21',
        '1924_Route_22',
        '1924_Route_23',
        '1924_Route_24',
        '1924_Sidings',
        '1924_SupportBuildings'
    ]
};

export const StreetcarLayers = function(year) {
    const layers = [];
    const colors = chroma.scale('Set1').correctLightness().colors(StreetcarLines[year].length).sort((a, b) => 0.5 - Math.random());
    StreetcarLines[year].forEach((line, index) => {
        layers.push(
            {
                id: line,
                icon: null,
                label: line.split('_').slice(1).join(' '),
                type: 'line',
                url: `https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:${line}&maxFeatures=500&outputFormat=application%2Fjson`,
                clickable: true,
                onMap: false,
                activeColor: colors[index],
                options: {
                    color: colors[index],
                    weight: 4,
                    dashArray: '20 20',
                    dashOffset: index % 2 == 0 ? '1' : '2'
                }
            }
        );
    });

    return {
        desc: `Streetcar Lines in ${year}`,
        attr: 'Source TBA',
        id: `streetcar${year}`,
        icon: null,
        label: `Streetcar Lines in ${year}`,
        type: 'annexations',
        activeColor: THEME.MAIN,
        layers
    }
}

export const StreetcarLines1924 = StreetcarLayers(1924)