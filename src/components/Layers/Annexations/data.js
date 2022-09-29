import L from "leaflet";

export const YEARS = [
  1847,
  1854,
  1863,
  1866,
  1889,
  1894,
  1895,
  1904,
  1909,
  1910,
  1913,
  1914,
  1915,
  1916,
  1922,
  1923,
  1925,
  1926,
  1928,
  1930,
  1932,
  1934,
  1940,
  1943,
  1945
]

export const Boundaries = () => {
  const options = {
    color: '#0D47A1',
    weight: 4,
    fillColor: '#0D47A1',
    fillOpacity: 0,
    opacity: 1,
    interactive: false
  };

  return YEARS.map((year, index) => {
      return (
          {
              desc: `Area annexed by the City of Atlanta in ${year}`,
              year,
              onMap: false,
              leafletLayer: leafletLayer(year, options, 'whole'),
              details: AnnexDetails[year.toString()].areas
          }
      );
  });
}

export const AnnexLayers = () => {
  // const layerTitles = ['Annex_1847_part', 'Annex_1854_part', 'Annex_1863_part', 'Annex_1866_part', 'Annex_1889_part', 'Annex_1894_part', 'Annex_1895_part', 'Annex_1904_part', 'Annex_1909_part', 'Annex_1910_part', 'Annex_1913_part', 'Annex_1914_part', 'Annex_1915_part', 'Annex_1916_part', 'Annex_1922_part', 'Annex_1923_part', 'Annex_1925_part', 'Annex_1926_part', 'Annex_1928_part', 'Annex_1930_part', 'Annex_1932_part', 'Annex_1934_part', 'Annex_1940_part', 'Annex_1943_part', 'Annex_1945_part']
  // const colors = chroma.scale(['#D32F2F','#D81B60', '#8E24AA', '#0288D1', '#00ACC1', '#3949AB', '#7CB342']).mode('lab').colors(layerTitles.length)
  // const colors = chroma.brewer.Paired.concat(chroma.brewer.Set3);

  const options = {
    weight: 0,
    fillColor: '#E65100',
    fillOpacity: 0.7
  };

  return YEARS.map((year, index) => {
      return(
          {
              desc: `Area annexed by the City of Atlanta in ${year}`,
              year,
              onMap: false,
              leafletLayer: leafletLayer(year, options, 'part')
          }
      );
  });
}

const leafletLayer = async (year, options, type) => {
  const response = await fetch(`https://geoserver.ecds.emory.edu/AtlantaAnnexations/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AtlantaAnnexations:Annex_${year}_${type}&maxFeatures=500&outputFormat=application%2Fjson`);
  const data = await response.json();
  return new L.GeoJSON(
    data,
    {
      ...options,
      zIndex: 400 + (YEARS.length - YEARS.indexOf(year)),
      onEachFeature,
      pane: type
    }
  );
}

const onEachFeature = (feature, layer) => {
  layer.bindPopup(`<h3>${feature.properties.YEAR}</h3><p>${AnnexDetails[feature.properties.YEAR].areas}</p>`);
  layer.on('popupopen', () => layer.setStyle({ fillOpacity: 1, fillColor: '#0D47A1' }));
  layer.on('popupclose', () => layer.setStyle({ fillOpacity: 0 }));
}

export const Intro = {
  title: 'City Growth Through the Years',
  body: 'Use the form field or slider above to select a year to see how Atlanta grew over time.'
}

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
