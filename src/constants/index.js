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
    const layerTitles = ['Annex_1847_whole', 'Annex_1854_whole', 'Annex_1863_whole', 'Annex_1866_whole', 'Annex_1889_whole', 'Annex_1894_whole', 'Annex_1895_whole', 'Annex_1904_whole', 'Annex_1909_whole', 'Annex_1910_whole', 'Annex_1913_whole', 'Annex_1914_whole', 'Annex_1915_whole', 'Annex_1916_whole', 'Annex_1922_whole', 'Annex_1923_whole', 'Annex_1925_whole', 'Annex_1926_whole', 'Annex_1928_whole', 'Annex_1930_whole', 'Annex_1932_whole', 'Annex_1934_whole', 'Annex_1940_whole', 'Annex_1943_whole', 'Annex_1945_whole'];
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
    const layerTitles = ['Annex_1847_part', 'Annex_1854_part', 'Annex_1863_part', 'Annex_1866_part', 'Annex_1889_part', 'Annex_1894_part', 'Annex_1895_part', 'Annex_1904_part', 'Annex_1909_part', 'Annex_1910_part', 'Annex_1913_part', 'Annex_1914_part', 'Annex_1915_part', 'Annex_1916_part', 'Annex_1922_part', 'Annex_1923_part', 'Annex_1925_part', 'Annex_1926_part', 'Annex_1928_part', 'Annex_1930_part', 'Annex_1932_part', 'Annex_1934_part', 'Annex_1940_part', 'Annex_1943_part', 'Annex_1945_part']
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
      areas: "Atlanta was founded at the end of the Western & Atlantic railroad line in 1837 and was then called Terminus. In 1843, it was named Marthasville after Georgia Governor Wilson Lumpkin’s daughter. Then in 1847 in became incorporated as City of Atlanta and delineated at a 1-mile (1.6 km) radius from the zero mile marker that was located at what is now Five Points. The city encompassed just over 2,000 acres."
    },
    "1854": {
      year: 1854,
      acreage: 69,
      areas: "The  first official city hall was built at the current site of the Georgia State Capitol. The city was divided into five wards. The First Ward was all of the land west of the Western & Atlantic Railroad and Whitehall Street. The Second Ward included the land south of the Georgia Railroad between McDonough and Whitehall Streets. The Third Ward included the new city hall and occupied the land south of the Georgia Railroad and east of McDonough Street. The Fourth Ward was the land north of the Georgia Railroad and east of Ivy Street and the Fifth Ward was west of Ivy Street and North of the Western & Atlantic Railroad. An area of 64 acres was expanded to the southwest following Whitehall Street."
    },
    "1863": {
      year: 1863,
      acreage: 286,
      areas: "To the southeast 286 acres were annexed in an area south of the Georgia Railroad in a wedge between what is now Oakland Cemetery and Grant Park. The area includes portions of present day Glenwood Park, Grant Park, and Ormewood Park."
    },
    "1866": {
      year: 1866,
      acreage: "2,476",
      areas: "The city limits were expanded to a one and a half mile radius from the Union Depot. This added 2,476 acres to the city."
    },
    "1889": {
      year: 1889,
      acreage: "1,547",
      areas: "The city limits were expanded 1,547 acres at a one and three quarter mile from the Union Depot."
    },
    "1894": {
      year: 1894,
      acreage: 665,
      areas: "The West End was originally a crossroads of Newnan and Sandtown Roads that grew into a frontier outpost.  In the late 1800s, it increasing improved its connectivity of rail and roads to Atlanta and it grew to become one of Atlanta’s wealthy suburban areas. In 1894, its 665 acres were annexed and it became the seventh ward of the city."
    },
    "1895": {
      year: 1895,
      acreage: 143,
      areas: "The city gained 143 acres to the northeast extending beyond Old Fourth Ward and north of the Georgia Railroad Line. This area includes present day Freedom Parkway, Inman Park, and ended its expansion at what is now Moreland Avenue in Little Five Points."
    },
    "1904": {
      year: 1904,
      acreage: 822,
      areas: "Northern expansion of the city to include the area that is now all of Midtown."
    },
    "1909": {
      year: 1909,
      acreage: "2,612",
      areas: "A large expansion of 2,612 acres was made to the east of city and was designated a ninth ward. It included the areas of Copenhill, Druid Hills, East Atlanta, Edgewood, and Reynoldstown."
    },
    "1910": {
      year: 1910,
      acreage: "5,606",
      areas: "Another large expansion of 3,150 acres occurred to the north and the western parts of the city. To the north up Peachtree from 15th Street to include the areas of Ansley Park and Sherwood Forest and the northern section of what is now the Georgia Tech campus up to 14th Street. Then the Bankhead area east of the Louisville and Nashville Railroad Line. To the West the area between Washington Park and Westview Cemetery and down to the Cascade Heights area. To the south and southwest another 2,011 acres were annexed including Adair Park, Oakland City, and the area that became Pittsburgh and up to the southern edge of Grant Park. Also added was the area of Brownwood Park just south of East Atlanta Village."
    },
    "1913": {
      year: 1913,
      acreage: 197,
      areas: "The area that is now Capitol View was annexed adding 197 acres."
    },
    "1914": {
      year: 1914,
      acreage: 9,
      areas: "A small sliver, 9 acres, to the east of the city was annexed that is just to the west of Lake Claire and north of the Georgia Railroad Line. "
    },
    "1915": {
      year: 1915,
      acreage: 75,
      areas: "Between Piedmont and Orme Park following Monroe Drive 75 acres was annexed to the north-northeast of the city."
    },
    "1916": {
      year: 1916,
      acreage: 103,
      areas: "To the east of Orme Park in the northeastern part of the city 103 acres was added in the area that is the commercial district of present day Virginia Highlands."
    },
    "1922": {
      year: 1922,
      acreage: "2,481",
      areas: "Another large annexation of 2,481 acres occurred primarily to the eastern section of the city including the rest of the Virginia Highlands, the southern part of the Morningside-Lenox Park area, the remaining portions of Lake Claire, Kirkwood, and Ormewood Park. To the southeast a small area just north of the Federal Penitentiary called Chosewood Park and on the west side of the city a small area to the southeast of Westview Cemetery was added."
    },
    "1923": {
      year: 1923,
      acreage: 411,
      areas: "On the southwest part of the city 411 acres were annexed in the areas of Utoy Creek and along Cascade Road just to the east of Greenwood Cemetery."
    },
    "1925": {
      year: 1925,
      acreage: "1,164",
      areas: "Several sections around the perimeter of the city were annexed totaling 1,164 acres. To the northeast a large section of what is now Druid Hills to the northwest Grove Park and the area that is now the Westside Reservoir Park was added. Three small sections to the west of the city were also added, two sections were added to expanding residential neighborhoods, and a long tract following Avon Avenue."
    },
    "1926": {
      year: 1926,
      acreage: 408,
      areas: "There were several smaller additions totaling to 408 acres around the perimeter of the city. To the north four tracts including a strip near directly to the east of the City of Atlanta Water Works, a strip just north of Piedmont Park and along Rock Springs Road, and a strip along Rosedale Road near Callanwolde Fine Arts Center. To the west three areas to the east of Westview and Greenwood Cemeteries were added and to the south three tracks including Chosewood Park, and other residential expansions."
    },
    "1928": {
      year: 1928,
      acreage: "1,429",
      areas: "This added a large tract southeast of the city, East Lake except for the golf course and a residential area directly to the east of Ansley Park was added totaling to 1,429 acres."
    },
    "1930": {
      year: 1930,
      acreage: 31,
      areas: "A 31 acre residential tract was added adjacent to Westview Cemetery’s eastside."
    },
    "1932": {
      year: 1932,
      acreage: 110,
      areas: "A tract of 110 acres was added to the city in the area north of Rock Springs Road in the Morningside-Lenox Park area."
    },
    "1934": {
      year: 1934,
      acreage: 24,
      areas: "A small tract of 24 acres was added to city which is located to the southeast of the intersections of Rock Springs Road and North Highland Avenue."
    },
    "1940": {
      year: 1940,
      acreage: 150,
      areas: "The southern portion of the area annexed in 1934 was added to city which is located to the southeast of the intersections of Rock Springs Road and North Highland Avenue. To the west a large tract of what is now John A. White Park was added. Both tracts added 150 acres to the city."
    },
    "1943": {
      year: 1943,
      acreage: 13,
      areas: "A small tract of 13 acres was added to the south of Olmsted Linear Park in the Lake Claire area of the city."
    },
    "1945": {
      year: 1945,
      acreage: 355,
      areas: "To the east of Ansley Park the city was expanded further north in the Morningside-Lenox Park area and an area along Sugar Creek was added just north of Glenwood Avenue. Both tracts added 355 acres to the city."
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
    const colors = chroma.bezier(['orange', 'darkblue', 'deeppink']).scale().colors(StreetcarLines[year].length);
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
                    weight: 4
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