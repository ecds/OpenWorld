import { modernLabels, modernLand, modernRoads, satellite } from "~/mapStyles";
import type { THistoricLayer } from "~/types";

export const historicMaps: THistoricLayer[] = [
  {
    year: 1847,
    title: "1853 City Atlas",
    description:
      'Originally produced in 1853 for the City Council by civil engineer Edward Vincent. Includes index and circle marking the extended city limits. "These numbers are city numbers, and deeds refer to them--whether subdivisions or not. N.B. The City Line has been extended."',
    researchLinks: [
      "https://scholarblogs.emory.edu/woodruff/news/explore-marbls-digital-historic-map-collection",
      "http://www.digitalgallery.emory.edu/luna/servlet/detail/EMORYUL~3~3~1000~100068:Old-Map-of-Atlanta?sort=Publication_Title%2CTitle%2CPage_No_%2CPages&qvq=sort:Publication_Title%2CTitle%2CPage_No_%2CPages;lc:EMORYUL%7E3%7E3&mi=0&trs=24",
      "https://muse.jhu.edu/article/430839/pdf",
      "https://en.wikipedia.org/wiki/Edward_A._Vincent",
      "https://www.loc.gov/resource/g3924a.ct001134/",
    ],
    id: "atl1840",
  },
  {
    year: 1870,
    title: "1870 City Map",
    description:
      "The Hanlieter's Directory Map was published as part of the 1870 Atlanta City Directory. William R. Hanleiter of 1 South Broad Street was the publisher and the directory sold for two dollars. The document was a full alphabetical record of names of persons, firms, companies, orders, and associations in Atlanta and the West End.",
    researchLinks: [
      "https://dlg.usg.edu/record/gsu_afpl_26?canvas=0&x=1948&y=2577&w=5795",
      "https://archive.org/details/emory1870/page/n1/mode/2up",
    ],
    id: "atl1870",
  },
  {
    year: 1895,
    title: "1895 City Map",
    id: "atl1895",
  },
  {
    year: 1906,
    title: "1906 City Map",
    id: "atl1906",
  },
  {
    year: 1911,
    title: "1911 Street Map",
    id: "atl1911",
  },
  {
    year: 1928,
    title: "1928 Atlas",
    id: "atl1928",
  },
  {
    year: 1934,
    title: "1934 Street Map",
    id: "atl1934",
  },
];

export const YEARS = historicMaps.map((layer) => layer.year);

export const modernLandLayers = [
  // {
  //   id: "land",
  //   layers: modernLand.layers,
  // },
  {
    id: "road",
    layers: [...modernRoads.layers, ...modernLabels.layers],
  },
  { id: "satellite", layers: [...satellite.layers, ...modernLabels.layers] },
];
