import React from 'react';
import { FaCity, FaRoad, FaTrain } from 'react-icons/fa';

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
    {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
    },
    // 1000-SCALE
    {
        url: 'https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png',
        bounds: [[33.93379544, -84.21603335], [33.63298531, -84.51696580]],
        minZoom: 11,
        maxNativeZoom: 16,
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

export const Boundaries = () => {
    const layerTitles = ['Annex_1847_whole', 'Annex_1854_whole', 'Annex_1863_whole', 'Annex_1866_whole', 'Annex_1889_whole', 'Annex_1894_whole', 'Annex_1895_whole', 'Annex_1909_whole', 'Annex_1910_whole', 'Annex_1913_whole', 'Annex_1914_whole', 'Annex_1915_whole', 'Annex_1916_whole', 'Annex_1922_whole', 'Annex_1923_whole', 'Annex_1925_whole', 'Annex_1926_whole', 'Annex_1928_whole', 'Annex_1930_whole', 'Annex_1932_whole', 'Annex_1934_whole', 'Annex_1940_whole', 'Annex_1943_whole', 'Annex_1945_whole'];
    const layers = []
    layerTitles.forEach((layer, index) => {
        const year = layer.split('_')[1];
        layers.push(
            {
                desc: `Area annexed by the City of Atlanta in ${year}`,
                attr: 'Source TBA',
                id: `annexation${year}`,
                icon: null,
                label: `Annexation of ${year}`,
                type: 'polygon',
                activeColor: '#0D47A1',
                url: `https://geoserver.ecds.emory.edu/AtlantaAnnexations/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AtlantaAnnexations:${layer}&maxFeatures=500&outputFormat=application%2Fjson`,
                zIndex: 400 + (layerTitles.length - index),
                clickable: true,
                displayProperty: 'YEAR',
                year: year,
                onMap: false,
                options: {
                    color: '#0D47A1',
                    weight: 4,
                    fillColor: '#0D47A1',
                    fillOpacity: 0,
                    opacity: 1
                }
            }
        );
    });
    return layers;
}


export const AnnexLayers = function() {
    const layerTitles = ['Annex_1847_part', 'Annex_1854_part', 'Annex_1863_part', 'Annex_1866_part', 'Annex_1889_part', 'Annex_1894_part', 'Annex_1895_part', 'Annex_1909_part', 'Annex_1910_part', 'Annex_1913_part', 'Annex_1914_part', 'Annex_1915_part', 'Annex_1916_part', 'Annex_1922_part', 'Annex_1923_part', 'Annex_1925_part', 'Annex_1926_part', 'Annex_1928_part', 'Annex_1930_part', 'Annex_1932_part', 'Annex_1934_part', 'Annex_1940_part', 'Annex_1943_part', 'Annex_1945_part']
    // const colors = chroma.scale(['#D32F2F','#D81B60', '#8E24AA', '#0288D1', '#00ACC1', '#3949AB', '#7CB342']).mode('lab').colors(layerTitles.length)
    // const colors = chroma.brewer.Paired.concat(chroma.brewer.Set3);
    const colors = [
        '#E53935',
        '#7CB342',
        '#FB8C00',
        '#1E88E5',
        '#FFFF00',
        '#8E24AA',
        '#43A047',
        '#D81B60',
        '#3949AB',
        '#FFEB3B',
        '#EA80FC',
        '#76FF03',
        '#FF1744',
        '#448AFF',
        '#F57C00',
        '#76FF03',
        '#7C4DFF',
        '#F57F17',
        '#00E5FF',
        '#E91E63',
        '#2962FF',
        '#B71C1C',
        '#33691E',
        '#4A148C'
    ]
    const layers = []
    layerTitles.forEach((layer, index) => {
        const year = layer.split('_')[1];
        const color = colors[index];
        layers.push(
            {
                desc: `Area annexed by the City of Atlanta in ${year}`,
                attr: 'Source TBA',
                id: `annexation${year}`,
                icon: null,
                label: `Annexation of ${year}`,
                type: 'polygon',
                activeColor: color,
                url: `https://geoserver.ecds.emory.edu/AtlantaAnnexations/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AtlantaAnnexations:${layer}&maxFeatures=500&outputFormat=application%2Fjson`,
                zIndex: 400 + (layerTitles.length - index),
                clickable: true,
                displayProperty: 'YEAR',
                year: year,
                onMap: false,
                options: {
                    color: '#0D47A1',
                    weight: 4,
                    fillColor: '#E65100',
                    fillOpacity: 0.7,
                    opacity: 1
                }
            }
        );
    });
    return layers;
}

export const OVERLAY_GROUPS = [
    {
        desc: 'City Annexations 1847-1945',
        attr: 'Source TBA',
        id: 'annexations',
        icon: null,
        label: 'Annexations',
        type: 'annexations',
        activeColor: THEME.MAIN,
        layers: AnnexLayers()
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

export const AnnexDetails = {
    "1847": {
      year: 1847,
      acreage: "2,010.60",
      areas: "City was incorporated at a 1 mile radius of the zero mile marker of the Western & Atlantic Railroad."
    },
    "1854": {
      year: 1854,
      acreage: 69,
      areas: "Atlanta was divived into five wards."
    },
    "1863": {
      year: 1863,
      acreage: 286,
      areas: ""
    },
    "1866": {
      year: 1866,
      acreage: "2,476",
      areas: "City was expanded one-and-a-half mile radius from the Union Depot."
    },
    "1889": {
      year: 1889,
      acreage: "1,547",
      areas: "City was expanded one-and-three-quarter mile radius from the Union Depot."
    },
    "1894": {
      year: 1894,
      acreage: 665,
      areas: "West End annexed and became the seventh ward of the city."
    },
    "1895": {
      year: 1895,
      acreage: 143,
      areas: ""
    },
    "1904": {
      year: 1904,
      acreage: 822,
      areas: "Northern expansion of the city to include the area that is now all of Midtown."
    },
    "1909": {
      year: 1909,
      acreage: "2,612",
      areas: "A ninth ward was formed out of Copenhill, Durid Hills, East Atlanta, Edgewood, and Reynoldstown."
    },
    "1910": {
      year: 1910,
      acreage: "5,606",
      areas: "Expansion to the North and West including Ansley Park, up Peachtree Street to Southern Buckhead, Georgia Tech, Washington Park, Westview,  and others."
    },
    "1913": {
      year: 1913,
      acreage: 197,
      areas: ""
    },
    "1914": {
      year: 1914,
      acreage: 9,
      areas: ""
    },
    "1915": {
      year: 1915,
      acreage: 75,
      areas: ""
    },
    "1916": {
      year: 1916,
      acreage: 103,
      areas: ""
    },
    "1922": {
      year: 1922,
      acreage: "2,481",
      areas: "Kirkwood, Ormewood Park"
    },
    "1923": {
      year: 1923,
      acreage: 411,
      areas: ""
    },
    "1925": {
      year: 1925,
      acreage: "1,164",
      areas: ""
    },
    "1926": {
      year: 1926,
      acreage: 408,
      areas: ""
    },
    "1928": {
      year: 1928,
      acreage: "1,429",
      areas: "East Lake, Chosewood Park"
    },
    "1930": {
      year: 1930,
      acreage: 31,
      areas: ""
    },
    "1932": {
      year: 1932,
      acreage: 110,
      areas: ""
    },
    "1934": {
      year: 1934,
      acreage: 24,
      areas: ""
    },
    "1940": {
      year: 1940,
      acreage: 150,
      areas: ""
    },
    "1943": {
      year: 1943,
      acreage: 13,
      areas: ""
    },
    "1945": {
      year: 1945,
      acreage: 355,
      areas: ""
    }
  }

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
