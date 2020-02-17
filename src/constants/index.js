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
/*
export const MAP_CENTER        = [33.749038, -84.388466]; // currently the state capitol building
export const MAP_MIN_ZOOM      = 11;
export const DEFAULT_ZOOM      = 16;
export const MAP_MAX_ZOOM      = 20;
export const MAP_SW_MAX        = [33.53, -84.61];
export const MAP_NE_MAX        = [34.03, -84.11];
*/
export const MAP_TILE_LAYERS = [
    // 1000-SCALE
    {
        TILE_URL: 'http://tilemaps.s3-website-us-east-1.amazonaws.com/ATL28_200-1000mosaic/{z}/{x}/{y}.png',
        SW_BOUND: [33.63298531, -84.51696580],
        NE_BOUND: [33.93379544, -84.21603335],
        MIN_ZOOM: 11,
        MAX_NATV: 16, // MAX NATIVE ZOOM
    },
    // 200-SCALE
    {
        TILE_URL: 'http://tilemaps.s3-website-us-east-1.amazonaws.com/ATL1928_200mosaic3/{z}/{x}/{y}.png',
        SW_BOUND: [33.73327062, -84.41714544],
        NE_BOUND: [33.78337253, -84.31633406],
        MIN_ZOOM: 14, 
        MAX_NATV: 19, // MAX NATIVE ZOOM
    },
];

// div icons for the map
export const DIV_ICONS = [
    {
        CLASS_NAME: 'divIcons',
        HTML:       '<i class="icon-radio-checked"/>',
        ICON_SIZE:  [16, 16],
    },
];

// overlay layers
export const OVERLAYS = [
    {
        DESC: 'Overlay the utility holes present in Atlanta in 1928.<br /><p class="italics">Source: Atlanta Atlas, 1928.</p>',
        ID: 'manholes',
        ICON: 'icon-radio-checked',
        LABEL: 'Utility Holes',
        TAB: 'layers',
        TYPE: 'cluster',
        URL: 'https://geoserver.ecds.emory.edu/ATLMaps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ATLMaps:ATL28_Utility_Holes&outputFormat=application%2Fjson',
        OPTIONS: {
            DIV_ICON: 0,
            POPUP_CONTENT: [
                {
                    CONTENT: '<b>Utility Hole</b>',
                    TYPE: 'text',
                    CONDITIONAL: false,
                }, 
                {
                    CONTENT: '<br />Located on ',
                    SUFFIX: '',
                    TYPE: 'text',
                    CONDITIONAL: true,
                    PROPERTY: 'name_st',
                },
                {
                    CONTENT: '<br />Elevation: ',
                    SUFFIX: 'ft',
                    TYPE: 'text',
                    CONDITIONAL: true,
                    PROPERTY: 'man_elev',
                },
            ],
        }
    },
    {
        DESC: 'City Boundaries of Atlanta, 1928.<br /><p class="italics">Source: Atlanta Atlas, 1928.</p>',
        ID: 'boundary',
        ICON: 'icon-border_all',
        LABEL: 'City Boundary',
        TAB: 'layers',
        TYPE: 'polygon',
        URL: 'https://geoserver.ecds.emory.edu/ATLMaps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ATLMaps:Atlanta%20City%20Limits&outputFormat=application%2Fjson',
        OPTIONS: {
            COLOR: 'black',
            WEIGHT: 5,
            FILL_COLOR: THEME.THIRD,
            FILL_OPACITY: 0.2,
        }
    },
    {
        DESC: 'Atlanta Road Network, 1928.<br /><p class="italics">Source: Undetermined.</p>',
        ID: 'roads',
        ICON: 'icon-road',
        LABEL: 'Roads',
        TAB: 'layers',
        TYPE: 'sliced',
        URL: 'https://geoserver.ecds.emory.edu/OpenWorldAtlanta/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenWorldAtlanta:Atlanta1928_RoadSystem&outputFormat=application%2Fjson',
        OPTIONS: {
            COLOR: 'black',
            FILL: false,
            OPACITY: 1,
            WEIGHT: 3,
        }
    },
    {
        DESC: 'Atlanta Streetcar Network, 1928.<br /><p class="italics">Source: Undetermined.</p>',
        ID: 'streetcars',
        ICON: 'icon-tram',
        LABEL: 'Streetcars',
        TAB: 'layers',
        TYPE: 'paths',
        URL: '',
        OPTIONS: {
            COLOR: 'green',
            FILL: false,
            OPACITY: 1,
            WEIGHT: 2,
        }
    },
    {
        DESC: 'Buildings in Atlanta, 1928.<br /><p class="italics">Source: Undetermined.</p>',
        ID: 'buildings',
        ICON: 'icon-office',
        LABEL: 'Buildings',
        TAB: 'features',
        TYPE: 'buildings',
        URL: '',
        OPTIONS: {
            COLOR: 'cyan',
            FILL: true,
            OPACITY: 1,
            WEIGHT: 1,
        }
    }
]

export const TEXT = [

]

export const COLORS = [
    '#000000','#00FF00','#0000FF','#FF0000','#01FFFE','#FFA6FE','#FFDB66','#006401',
    '#010067','#95003A','#007DB5','#FF00F6','#FFEEE8','#774D00','#90FB92','#0076FF',
    '#D5FF00','#FF937E','#6A826C','#FF029D','#FE8900','#7A4782','#7E2DD2','#85A900',
    '#FF0056','#A42400','#00AE7E','#683D3B','#BDC6FF','#263400','#BDD393','#00B917',
    '#9E008E','#001544','#C28C9F','#FF74A3','#01D0FF','#004754','#E56FFE','#788231',
    '#0E4CA1','#91D0CB','#BE9970','#968AE8','#BB8800','#43002C','#DEFF74','#00FFC6',
    '#FFE502','#620E00','#008F9C','#98FF52','#7544B1','#B500FF','#00FF78','#FF6E41',
    '#005F39','#6B6882','#5FAD4E','#A75740','#A5FFD2','#FFB167','#009BFF','#E85EBE'
]
